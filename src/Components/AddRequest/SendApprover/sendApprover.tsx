import { useEffect, useState } from 'react';
import { DeleteOutlined, DragOutlined, EditOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Select, Radio, RadioChangeEvent, Upload, Button, Row, Col, Input, Space, notification, message } from 'antd';
import './sendApprover.css'
import request from "../../../Utils/request";
import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { UploadFile } from 'antd/lib/upload';
import { useTranslation } from 'react-i18next';

interface DepartmentMember {
    Id: string;
    FullName: string;
    Email: string;
    JobTitle: string;
}

interface PropsDataList {
    fileList: RcFile[];
    setFileList: React.Dispatch<React.SetStateAction<RcFile[]>>;
    applyNote: boolean;
    setApplyNote: React.Dispatch<React.SetStateAction<boolean>>;
    listOfUserId: string[];
    setListOfUserId: React.Dispatch<React.SetStateAction<string[]>>;
    departmentId: string;
}


function SendApprover({ fileList, setFileList, applyNote, setApplyNote, listOfUserId, setListOfUserId, departmentId }: PropsDataList): JSX.Element {

    const { t } = useTranslation();
    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [inputs, setInputs] = useState<string[]>([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [counterApprover, setCounterApprover] = useState(1);
    const [labelApprovers, setLabelApprovers] = useState<string[]>([]);
    // const [selectedApprovers, setSelectedApprovers] = useState<{ [key: string]: string }>({});
    const [searchValue, setSearchValue] = useState<string>('');
    const [initialValueApprover, setInitialValueApprover] = useState<string[]>([]);
    // const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getDataDepartmentMember = async () => {
            const endpoint = "/userRole/all-approvers/" + departmentId;
            await request.get(endpoint).then((res) => {
                setDataDepartmentMember(res.data.Data);

                // console.log('hi', res.data.Data);
                setListOfUserId([]);

                let tempListOfUserIdSupervisor = [];
                let tempListOfUserIdManager = [];
                let tempApproverSupervisor = [];
                let tempApproverManager = [];
                let tempLableApproverSupervisor = [];
                let tempLableApproverManager = [];

                for (let i = 0; i < res.data.Data.length; i++) {
                    if (res.data.Data[i].Position === "Supervisor" && tempListOfUserIdSupervisor.length < 1) {
                        tempListOfUserIdSupervisor.push(res.data.Data[i].Id);
                        tempApproverSupervisor.push(res.data.Data[i].FullName + ' ' + res.data.Data[i].Email + ' ' + res.data.Data[i].JobTitle);
                        tempLableApproverSupervisor.push(res.data.Data[i].Position);
                        setCounterApprover(counterApprover + 2);
                    }
                    if (res.data.Data[i].Position === "Manager" && tempListOfUserIdManager.length < 1) {
                        tempListOfUserIdManager.push(res.data.Data[i].Id);
                        tempApproverManager.push(res.data.Data[i].FullName + ' ' + res.data.Data[i].Email + ' ' + res.data.Data[i].JobTitle);
                        tempLableApproverManager.push(res.data.Data[i].Position);
                        setCounterApprover(counterApprover + 2);
                    }
                }

                const tempListOfUserId = tempListOfUserIdSupervisor.concat(tempListOfUserIdManager);
                const tempApprover = tempApproverSupervisor.concat(tempApproverManager);
                const tempLableApprover = tempLableApproverSupervisor.concat(tempLableApproverManager);

                setLabelApprovers(tempLableApprover);
                setInitialValueApprover(tempApprover);
                setListOfUserId(tempListOfUserId);
                setInputs(tempListOfUserId);

            }).catch(() => {
                console.error("Error fetching data:");
            });
        }
        getDataDepartmentMember();
    }, [departmentId])

    // useEffect(() => {
    //     setLoading(false);
    // }, [listOfUserId])

    const { Option } = Select;

    const onChange = (e: RadioChangeEvent) => {
        setApplyNote(e.target.value);
    };

    const handleAddInput = () => {
        setInputs([...inputs, '' + counterApprover]);
        setLabelApprovers([...labelApprovers, "Approve " + [counterApprover]]);
        setCounterApprover(counterApprover + 1);
    };

    const handleDelete = (index: number) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);

        const newListOfUser = [...listOfUserId];
        newListOfUser.splice(index, 1);
        setListOfUserId(newListOfUser);

        const newInitiValueApprover = [...initialValueApprover];
        newInitiValueApprover.splice(index, 1);
        setInitialValueApprover(newInitiValueApprover);

    };

    const handleInputChangeApprover = (index: number, value: string) => {
        const newApprovers = [...labelApprovers];
        newApprovers[index] = value;
        setLabelApprovers(newApprovers);
    };

    const handleSave = (index: number) => {
        setEditingIndex(-1);
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
    };

    const handleSelectChange = (index: number, e: any) => {
        const value = e.value;
        if (Array.isArray(listOfUserId)) {

            if (listOfUserId.indexOf(value) !== -1) {
                openNotification('topRight');
            } else {
                // const temporaryList = { ...selectedApprovers, [index]: value };
                // const finalSelectedUserId = Object.values(temporaryList) as string[];
                // setListOfUserId(finalSelectedUserId);
                // setSelectedApprovers(temporaryList);
                const newListOfUser = [...listOfUserId];
                newListOfUser[index] = value;
                setListOfUserId(newListOfUser);
                const dataDepartmentMemberSelected: DepartmentMember[] = dataDepartmentMember.filter((departmentMember) => departmentMember.Id === value);
                const infoUserSelected = dataDepartmentMemberSelected[0].FullName + " " + dataDepartmentMemberSelected[0].Email + " " + dataDepartmentMemberSelected[0].JobTitle;
                const newInitiValueApprover = [...initialValueApprover];
                newInitiValueApprover[index] = infoUserSelected;
                setInitialValueApprover(newInitiValueApprover);
            }
        }
    }

    const openNotification = (placement: NotificationPlacement) => {
        notification.info({
            message: <strong>Approver already exists</strong>,
            description: 'Approver has been selected before, please choose another Approver',
            placement,
        });
    };

    const handleSearch = (inputValue: string) => {
        setSearchValue(inputValue);
    };

    // useEffect(() => {
    //     const newDataDepartmentMember = [...dataDepartmentMember];
    //     dataDepartmentMember.map((data) => {
    //         listOfUserId.map((userId) => {
    //             newDataDepartmentMember.filter(userId)
    //         })
    //     })
    // }, [listOfUserId])

    const filteredData = () => {
        if (dataDepartmentMember.length > 0) {
            return dataDepartmentMember.filter(
                (departmentMember) =>
                    listOfUserId.indexOf(departmentMember.Id) === -1 && (
                        departmentMember.FullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                        departmentMember.Email?.toLowerCase().includes(searchValue.toLowerCase()) ||
                        departmentMember.JobTitle?.toLowerCase().includes(searchValue.toLowerCase()))
            )
        }
        else return [];
    };

    const handleBeforeUpload = (file: RcFile) => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const acceptedFileExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt', 'txt', 'xls', 'xlsx'];
        if (fileExtension && !acceptedFileExtensions.includes(fileExtension)) {
            message.error(`File type not supported: ${fileExtension}`);
            return false;
        } else {
            setFileList([...fileList, file]);
            return false;
        }
    };

    const handleRemoveFile = (file: UploadFile<any>) => {
        const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedFileList);
    };

    // console.log("initialValueApprover: ", initialValueApprover);
    // console.log("labelApprovers", labelApprovers);
    // console.log("123: ", listOfUserId);
    // console.log('input', inputs);
    // console.log('dataDepartmentMember', dataDepartmentMember);

    return (
        <div>
            <div className='attention-request' style={{ marginTop: '0', }}>
                <p>Chú ý: Trường hợp Phòng Hành Chính không đủ xe để đáp ứng yêu cầu điều xe của bộ phận, Phòng Hành Chính đề nghị sắp xếp phương tiện khác thay thế (thuê xe ngoài, hoặc dùng thẻ taxi, Grab,...) và chi phí sẽ hạch toán theo bộ phận yêu cầu.</p>
                <Radio.Group onChange={onChange} value={applyNote}>
                    <Radio value={true}>{t('yes')}</Radio>
                    <Radio value={false}>{t('no')}</Radio>
                </Radio.Group>
            </div>
            <div className='Attachment'>
                <b>Attachment(s)</b>
            </div>
            <div className='reply-upload-comment' style={{ width: 'fit-content' }}>
                <Upload className='upload-attachment-addrequest'
                    beforeUpload={handleBeforeUpload}
                    accept=".png, .jpg, .jpeg, .pdf, .csv, .doc, .docx, .pptx, .ppt, .txt, .xls, .xlsx"
                    fileList={fileList}
                    onRemove={handleRemoveFile}
                    multiple={true}
                >
                    <Button icon={<UploadOutlined />} className='btn-attachment-comment'>
                        {t('Add attachments')}
                    </Button>
                    <span className='attention-upload-attachment'> {t('(Maximum 20MB per file)')}</span>
                </Upload>
            </div>
            <div className='form-approver'>
                <h6>Send to approvers</h6>
                <div className='add-approvers'>
                    <Form>
                        <Row gutter={16}>
                            {inputs.map((input, index) => (
                                <Col xs={24} sm={24} md={12} lg={12} xl={8} key={index} className='col-request '>
                                    <Form.Item
                                        label={
                                            <div className='label-approver'>
                                                {editingIndex === index ? (
                                                    <Space>
                                                        <Input value={labelApprovers[index]} onChange={(e) => handleInputChangeApprover(index, e.target.value)} />
                                                        <Button type="link" onClick={() => handleSave(index)} icon={<SaveOutlined />} />
                                                    </Space>
                                                ) : (
                                                    <Space>
                                                        <div className='responsive-lable-approver'><span title={labelApprovers[index]}>{labelApprovers[index]}</span></div>
                                                        <div className='responsive-btn-approver'>
                                                            <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(index)} />
                                                            <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(index)} />
                                                            <Button type="link" icon={<DragOutlined />} />
                                                        </div>
                                                    </Space>
                                                )}
                                            </div>
                                        }
                                        name={inputs[index]}
                                        rules={[
                                            {
                                                required: true,
                                                message: t('Select something!'),
                                            },
                                        ]}
                                        initialValue={initialValueApprover[index] === undefined ? t('--Select a Approver--') : initialValueApprover[index]}
                                        labelCol={{ span: 24 }}
                                        className='responsive-send-approver'
                                    >
                                        <Select
                                            // defaultValue={initialValueApprover[index] === undefined ? '--Select a Approver--' : initialValueApprover[index]}
                                            labelInValue
                                            virtual={false}
                                            onChange={(value) => handleSelectChange(index, value)}
                                            showSearch
                                            optionFilterProp="children"
                                            filterOption={false}
                                            onSearch={handleSearch}
                                            className='responsive-select-option'
                                        >
                                            {filteredData().map((departmentMember) => (
                                                <Option key={departmentMember.Id} value={departmentMember.Id}>
                                                    <div className='responsive-limit-width-ellipsis'>
                                                        <span>{departmentMember.FullName} </span>
                                                        <span>{departmentMember.Email} </span>
                                                        <span>{departmentMember.JobTitle} </span>
                                                    </div>
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            ))}
                            <Col xs={24} sm={24} md={12} lg={12} xl={8} className='btn-add-approver'>
                                <Button
                                    type="primary"
                                    onClick={handleAddInput}
                                    style={{
                                        backgroundColor: 'rgb(47,133,239)',
                                        color: 'white'
                                    }}>
                                    {t('Add')}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div >
    );
}

export default SendApprover;