import { Upload, Col, Input, Row, Form, Select, DatePicker, Spin, Alert, Radio, Button, RadioChangeEvent } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { changeFormatDatePostRequest } from '../../../Utils/formatDate.js';
import request from "../../../Utils/request";
import { RcFile, UploadFile } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import EditSendApprover from '../EditSendApprover/editSendApprover';
import MenuEdit from '../MenuEdit/menuEdit';
import RequestLayout from '../../RequestLayout/index.jsx';
import { useTranslation } from 'react-i18next';

interface Department {
    Name: string;
    Id: string;
}
interface DepartmentMember {
    Id: string;
    User: {
        Id: string;
        FullName: string;
        Email: string;
        JobTitle: string;
    };
}


function EditRequest() {

    const { t } = useTranslation();

    const { Option } = Select;
    const profile = false;

    const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [applyNote, setApplyNote] = useState<boolean>(false);
    const [listOfUserId, setListOfUserId] = useState<string[]>([]);
    const { requestId } = useParams();
    const [status, setStatus] = useState<string>("")
    const [detailData, setDetailData] = useState<any>({});

    const usageFrom = changeFormatDatePostRequest(detailData.UsageFrom);
    const usageTo = changeFormatDatePostRequest(detailData.UsageTo);
    const pickTime = changeFormatDatePostRequest(detailData.PickTime);

    const [formData, setFormData] = useState({
        SenderId: "" as string | null,
        DepartmentId: "",
        ReceiverId: "",
        Mobile: null as string | null,
        CostCenter: null as string | null,
        TotalPassengers: null as string | null,
        PickLocation: "",
        Destination: "",
        Reason: "",
        ApplyNote: false,
        UsageFrom: "",
        UsageTo: "",
        PickTime: "",
        ListOfUserId: listOfUserId,
        Status: "",
        files: fileList,
    });


    const initiValueDepartment = dataDepartment.find((value) => value.Id === formData.DepartmentId)?.Name;
    const initiValueReceiver = detailData.ReceiverUser && (formData.ReceiverId === detailData.ReceiverUser.Id) ? detailData.ReceiverUser.FullName + ' ' + detailData.ReceiverUser.Email + ' ' + detailData.ReceiverUser.JobTitle : (dataDepartmentMember.length > 0 ? dataDepartmentMember[0].User.FullName + ' ' + dataDepartmentMember[0].User.Email + ' ' + dataDepartmentMember[0].User.JobTitle : 'No Data');
    const initiValueMoblie = formData.Mobile ? formData.Mobile : (detailData.Mobile ? detailData.Mobile : undefined);
    const initiValueCostCenter = formData.CostCenter ? formData.CostCenter : (detailData.CostCenter ? detailData.CostCenter : undefined);
    const initiValueTotalpassengers = formData.TotalPassengers ? formData.TotalPassengers : (detailData.TotalPassengers ? detailData.TotalPassengers : undefined);
    const initiValueReason = formData.Reason ? formData.Reason : (detailData.Reason ? detailData.Reason : undefined);
    const initiValueDestination = formData.Destination ? formData.Destination : (detailData.Destination ? detailData.Destination : undefined);
    const initiValuePicklocation = formData.PickLocation ? formData.PickLocation : (detailData.PickLocation ? detailData.PickLocation : undefined);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const departmentEndpoint = "department/all?page=1&limit=100";
                const departmentRes = await request.get(departmentEndpoint);
                setDataDepartment(departmentRes.data.Data.ListData);

                const detailsDataEndpoint = "/request/Id=" + requestId;
                const detailsDataRes = await request.get(detailsDataEndpoint);
                setDetailData(detailsDataRes.data.Data);
                setApplyNote(detailsDataRes.data.Data.ApplyNote);
                setStatus(detailsDataRes.data.Data.Status);

                // const attachmentsDataEndpoint = "/request/attachment/requestId=" + requestId;
                // const attachmentsDataRes = await request.get(attachmentsDataEndpoint);
                // console.log(attachmentsDataRes);
                // setFileList([...fileList, attachmentsDataRes.data.Data.Path]);

                console.log(detailsDataRes.data.Data);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    DepartmentId: detailsDataRes.data.Data.Department.Id,
                    ReceiverId: detailsDataRes.data.Data.ReceiverUser.Id,
                }));

            } catch (error) {
                setLoading(true);
            }
            setLoading(false);
        };
        fetchData();
    }, [requestId]);


    useEffect(() => {
        const number: number = detailData.TotalPassengers ? detailData.TotalPassengers : "";
        const stringNumber = number.toString();

        // console.log('setformdata');

        setFormData((prevFormData) => ({
            ...prevFormData,
            files: fileList,
            ApplyNote: applyNote,
            Mobile: detailData.Mobile,
            CostCenter: detailData.CostCenter,
            TotalPassengers: stringNumber,
            PickLocation: detailData.PickLocation,
            Destination: detailData.Destination,
            Reason: detailData.Reason,
            SenderId: detailData.SenderUser ? detailData.SenderUser.Id : undefined,
            UsageFrom: usageFrom,
            UsageTo: usageTo,
            PickTime: pickTime,
            Status: status,
        }));
    }, [status, usageFrom, usageTo, pickTime, fileList, applyNote, detailData]);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ListOfUserId: listOfUserId,
        }));
    }, [listOfUserId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const departmentMemberEndpoint = "departmentMember/position?departmentId=" + formData.DepartmentId;
                const departmentMemberRes = await request.get(departmentMemberEndpoint);
                setDataDepartmentMember(departmentMemberRes.data.Data);

                const ReceiverUserId = departmentMemberRes.data.Data.find((value: any) => value.User.Id === detailData.ReceiverUser.Id);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    ReceiverId: ReceiverUserId ? ReceiverUserId.User.Id : (departmentMemberRes.data.Data.length > 0 ? departmentMemberRes.data.Data[0].User.Id : ''),
                }));

            } catch (error) {
                setLoading(true);
            }
            setLoading(false);
        };
        fetchData();
    }, [formData.DepartmentId]);


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSelectChange = (value: any, field: string) => {
        if (field === 'ReceiverId') {
            const valueReceiverId = value.value;
            setFormData((prevFormData) => ({
                ...prevFormData,
                ReceiverId: valueReceiverId,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [field]: value,
            }));
        }
    };

    const handleDatePicker = (value: Dayjs | null, field: string) => {
        if (value) {
            const formattedValue = value.format('YYYY-MM-DD HH:mm:ss');
            setFormData((prevFormData) => ({
                ...prevFormData,
                [field]: formattedValue,
            }));
        }
    };

    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearch = (inputValue: string) => {
        setSearchValue(inputValue);
    };

    const filteredData = () => {
        if (dataDepartmentMember.length > 0) {
            return dataDepartmentMember.filter(
                (departmentMember) =>
                    departmentMember.User.Id !== formData.ReceiverId && (
                        departmentMember.User.FullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                        departmentMember.User.Email?.toLowerCase().includes(searchValue.toLowerCase()) ||
                        departmentMember.User.JobTitle?.toLowerCase().includes(searchValue.toLowerCase())
                    ))
        }
        else return [];
    };

    const onChange = (e: RadioChangeEvent) => {
        setApplyNote(e.target.value);
    };

    const handleBeforeUpload = (file: RcFile) => {
        setFileList([...fileList, file]);
        return false;
    };
    const handleRemoveFile = (file: UploadFile<any>) => {
        const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedFileList);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.which ? event.which : event.keyCode;
        if ((charCode < 48 || charCode > 57) && charCode !== 8) {
            event.preventDefault();
        }
    };

    // console.log('formData', detailData);

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-request'>
                    <MenuEdit formData={formData} setFormData={setFormData} senderId={detailData.senderId} />
                    {loading
                        ?
                        (<Spin style={{ height: '100vh' }} tip="Loading..." size="large">
                            <Alert
                                style={{ width: '100%', textAlign: 'center' }}
                                message="Loading..."
                                description={t('There are some issues happening, please wait a moment or you can try reloading the page')}
                                type="info"
                            />
                        </Spin>)
                        :
                        (<div className='page-content'>
                            <div className='table-request'>
                                <h2 className='title-request'>{t('CAR BOOKING REQUEST')}</h2>
                                <div className='table-content'>
                                    <Form
                                        className='form-add-request'
                                    >
                                        <Row className='row-request'>
                                            {/*Request Applicant*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('Applicant')}
                                                    name="SenderId"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Applicant is require')
                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={detailData.SenderUser ? detailData.SenderUser.FullName : undefined}
                                                >
                                                    <Input type='text' value={formData.SenderId ?? ''} name='SenderId' readOnly onChange={handleInputChange} className='cursor-notallow-applicant' />
                                                </Form.Item>
                                            </Col>
                                            {/*Request Department*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('department')}
                                                    name="DepartmentId"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Select something!'),
                                                        },
                                                    ]}
                                                    initialValue={initiValueDepartment}
                                                    labelCol={{ span: 24 }}
                                                >
                                                    <Select
                                                        virtual={false}
                                                        value={formData.DepartmentId}
                                                        onChange={(value) => handleSelectChange(value, 'DepartmentId')}
                                                        showSearch
                                                        optionFilterProp="children"
                                                        filterOption={(inputValue, option) =>
                                                            option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                        }
                                                        className='responsive-select-option'
                                                    >
                                                        {dataDepartment
                                                            .filter((department) => !formData.DepartmentId.includes(department.Id))
                                                            .map((filteredDepartment) => (
                                                                <Option key={filteredDepartment.Id} value={filteredDepartment.Id} className='responsive-select-option'>
                                                                    {filteredDepartment.Name}
                                                                </Option>
                                                            ))}
                                                        {/* {dataDepartment.map((department) => (
                                                            <Option key={department.Id} value={department.Id} >
                                                                {department.Name}
                                                            </Option>
                                                        ))} */}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            {/*Request User*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('user')}
                                                    name="ReceiverId"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Select something!'),
                                                        },
                                                    ]}
                                                    initialValue={initiValueReceiver}
                                                    labelCol={{ span: 24 }}
                                                    className={initiValueReceiver === 'No Data' ? 'no-data' : ''}
                                                >
                                                    <Select
                                                        labelInValue
                                                        virtual={false}
                                                        value={formData.ReceiverId}
                                                        onChange={(value) => handleSelectChange(value, 'ReceiverId')}
                                                        showSearch
                                                        optionFilterProp="children"
                                                        filterOption={false}
                                                        onSearch={handleSearch}
                                                        className='responsive-select-option'
                                                    >
                                                        {filteredData().map((departmentMember) => (
                                                            <Option key={departmentMember.Id} value={departmentMember.User.Id}>
                                                                <div className='responsive-limit-width-ellipsis' title={departmentMember.User.FullName + ' ' + departmentMember.User.Email + ' ' + departmentMember.User.JobTitle}>
                                                                    <span>{departmentMember.User.FullName} </span>
                                                                    <span>{departmentMember.User.Email} </span>
                                                                    <span>{departmentMember.User.JobTitle}</span>
                                                                </div>
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            {/*Request Mobile*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('mobile')}
                                                    name="Mobile"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Mobile is required'),
                                                        },
                                                        {
                                                            pattern: /^[0-9]*$/,
                                                            message: t('Mobile must be a number'),
                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={initiValueMoblie}
                                                >
                                                    <Input onKeyPress={handleKeyPress} type='text' inputMode='numeric' name='Mobile' value={formData.Mobile ?? ''} onChange={handleInputChange} />
                                                </Form.Item>
                                            </Col>
                                            {/*Request Cost Center*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label="Cost Center"
                                                    name="CostCenter"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Cost Center is required')
                                                        },
                                                        {
                                                            pattern: /^[0-9]*$/,
                                                            message: t('Cost Center must be a number'),
                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={initiValueCostCenter}
                                                >
                                                    <Input onKeyPress={handleKeyPress} type='text' inputMode='numeric' name='CostCenter' value={formData.CostCenter ?? ''} onChange={handleInputChange} />
                                                </Form.Item>
                                            </Col>
                                            {/*Request Total passengers*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('totalpassengers')}
                                                    name="Totalpassengers"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Total passengers is required')
                                                        },
                                                        {
                                                            pattern: /^[0-9]*$/,
                                                            message: t('Total passengers must be a number'),
                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={initiValueTotalpassengers}
                                                >
                                                    <Input maxLength={9} onKeyPress={handleKeyPress} type='text' inputMode='numeric' name='TotalPassengers' value={formData.TotalPassengers ?? ''} onChange={handleInputChange} />
                                                </Form.Item>
                                            </Col>
                                            {/*Request Usage time from*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('Usage time from')}
                                                    name="UsageFrom"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Usage time from is required')
                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={dayjs(usageFrom)} // Giá trị mặc định là thời gian hiện tại
                                                >
                                                    <DatePicker
                                                        className='add-request-width-formitem'
                                                        value={dayjs(formData.UsageFrom)}
                                                        onChange={(value) => handleDatePicker(value, 'UsageFrom')}
                                                        showTime
                                                        placeholder={t('from')}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            {/*Request Usage time to*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('Usage time to')}
                                                    name="UsageTo"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Usage time to is required')
                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={dayjs(usageTo)}
                                                >
                                                    <DatePicker
                                                        className='add-request-width-formitem'
                                                        value={dayjs(formData.UsageTo)}
                                                        onChange={(value) => handleDatePicker(value, 'UsageTo')}
                                                        showTime
                                                        placeholder='To date time'
                                                    />
                                                </Form.Item>
                                            </Col>
                                            {/*Request Pick time*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('Pick time')}
                                                    name="Picktime"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Pick time is required')
                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={dayjs(pickTime)}
                                                >
                                                    <DatePicker
                                                        className='.add-request-width-formitem'
                                                        value={dayjs(formData.PickTime)}
                                                        onChange={(value) => handleDatePicker(value, 'PickTime')}
                                                        showTime
                                                        placeholder={t('Pick time')}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            {/*Request Pick location*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('picklocation')}
                                                    name="Picklocation"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Pick location is required')
                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={initiValuePicklocation}
                                                >
                                                    <Input type='text' name='PickLocation' value={formData.PickLocation} onChange={handleInputChange}></Input>
                                                </Form.Item>
                                            </Col>
                                            {/*Request Destination */}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('destination')}
                                                    name="Destination"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Destination is required')

                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={initiValueDestination}
                                                >
                                                    <Input type='text' name='Destination' value={formData.Destination} onChange={handleInputChange}></Input>
                                                </Form.Item>
                                            </Col>
                                            {/*Request Reason*/}
                                            <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                <Form.Item
                                                    label={t('reason')}
                                                    name="Reason"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('Reason is required')
                                                        },
                                                    ]}
                                                    labelCol={{ span: 24 }}
                                                    initialValue={initiValueReason}
                                                >
                                                    <Input type='text' name='Reason' value={formData.Reason} onChange={handleInputChange}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
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
                                <Upload
                                    disabled
                                    beforeUpload={handleBeforeUpload}
                                    accept=".png, .jpg, .jpeg, .pdf, .csv, .doc, .docx, .pptx, .ppt, .txt, .xls, .xlsx"
                                    fileList={fileList}
                                    onRemove={handleRemoveFile}
                                >
                                    <Button icon={<UploadOutlined />} style={{ backgroundColor: 'rgb(47,133,239)', color: 'white' }}>
                                        {t('Add attachments')}
                                    </Button>
                                    <span> {t('(Maximum 20MB per file)')}</span>
                                </Upload>
                            </div>
                            <EditSendApprover departmentId={formData.DepartmentId} listOfUserId={listOfUserId} setListOfUserId={setListOfUserId} />
                        </div>
                        )}
                </div>
            )}
        </RequestLayout >
    );
}

export default EditRequest;