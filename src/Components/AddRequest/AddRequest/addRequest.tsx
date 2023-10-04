import MenuAdd from '../MenuAdd/menuAdd';
import SendApprover from '../SendApprover/sendApprover';
import RequestLayout from '../../RequestLayout';
import { Col, Input, Row, Form, Select, DatePicker, Spin, Alert } from 'antd';
import './addRequest.css'
import { ChangeEvent, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import request from "../../../Utils/request";
import { RcFile } from 'antd/es/upload';
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

function AddRequest(): JSX.Element {

    const { t } = useTranslation();

    //set layout
    const profile = false;

    const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [applyNote, setApplyNote] = useState<boolean>(false);
    const [listOfUserId, setListOfUserId] = useState<string[]>([]);
    const [userLoginName, setUserLoginName] = useState("");
    const [searchValue, setSearchValue] = useState<string>('');

    //set initial formData
    const senderId = localStorage.getItem("Id")
    const futureTime = dayjs().add(24, 'hours');
    const usageMoment = dayjs();
    const updatefutureTime = futureTime.format('YYYY-MM-DD HH:mm:ss');
    const updateMoment = usageMoment.format('YYYY-MM-DD HH:mm:ss');

    //set formData post Api to server 
    const [formData, setFormData] = useState({
        SenderId: senderId as string | null,
        DepartmentId: "",
        ReceiverId: "",
        Mobile: null as string | null,
        CostCenter: null as string | null,
        TotalPassengers: null as string | null,
        PickLocation: '',
        Destination: '',
        Reason: '',
        ApplyNote: false,
        UsageFrom: updateMoment,
        UsageTo: updatefutureTime,
        PickTime: updateMoment,
        ListOfUserId: listOfUserId,
        Status: '',
        files: fileList,
    });

    //define initialValue for element input form
    const initialValueSender = userLoginName ?? '';
    const initialValueDepartment = dataDepartment.find((value) => value.Id === formData.DepartmentId)?.Name;
    const initialValueReceiver = dataDepartmentMember.length > 0 ? dataDepartmentMember[0].User.FullName + ' ' + dataDepartmentMember[0].User.Email + ' ' + dataDepartmentMember[0].User.JobTitle : 'No Data';
    const initialValueMobile = formData.Mobile ? formData.Mobile : '';
    const initialValueCostCenter = formData.CostCenter ? formData.CostCenter : '';
    const initialValueTotalPassengers = formData.TotalPassengers ? formData.TotalPassengers : '';
    const initialValueUsageFrom = formData.UsageFrom === "" ? dayjs() : dayjs(formData.UsageFrom);
    const initialValueUsageTo = formData.UsageTo === "" ? dayjs().add(24, 'hours') : dayjs(formData.UsageTo);
    const initialValuePickTime = formData.PickTime === "" ? dayjs() : dayjs(formData.PickTime);
    const initialValuePickLocation = formData.PickLocation ? formData.PickLocation : '';
    const initialValueDestination = formData.Destination ? formData.Destination : '';
    const initialvalueReason = formData.Reason ? formData.Reason : '';


    const { Option } = Select;

    useEffect(() => {
        request.get("/user/profile/" + senderId)
            .then((res) => {
                setUserLoginName(res.data.Data.FirstName + " " + res.data.Data.LastName);
            })
            .catch((e) => {
                console.log(e.response.Data);
            })
    }, [senderId])

    useEffect(() => {
        setLoading(true);
        const getAllDepartments = async () => {
            const departmentEndpoint = "department/all?page=1&limit=100";
            await request.get(departmentEndpoint)
                .then((res) => {
                    setDataDepartment(res.data.Data.ListData);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        DepartmentId: res.data.Data.ListData[0].Id,
                    }));
                })
        }

        const fetchData = async () => {
            try {
                const departmentMemberEndpoint = "departmentMember/position?departmentId=" + formData.DepartmentId;
                request.get(departmentMemberEndpoint).then((res) => {
                    setDataDepartmentMember(res.data.Data);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        ReceiverId: res.data.Data.length > 0 ? res.data.Data[0].User.Id : '',
                    }));
                    setLoading(false);
                })
            } catch (error) {
                setLoading(true);
            }
        };

        if (formData.DepartmentId === "") {
            getAllDepartments();
        } else {
            fetchData();
        }
    }, [formData.DepartmentId]);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            files: fileList,
            ApplyNote: applyNote,
            ListOfUserId: listOfUserId,
            SenderId: senderId,
        }));
    }, [fileList, applyNote, listOfUserId, senderId]);


    //set Mobile, Cost Center, Total passengers, Pick location, Destination, Reason values ​​for formdata
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    //set User values ​​for formdata
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

    //set Usage time from, Usage time to, Pick time values ​​for formdata
    const handleDatePicker = (value: Dayjs | null, field: string) => {
        if (value) {
            const formattedValue = value.format('YYYY-MM-DD HH:mm:ss');
            setFormData((prevFormData) => ({
                ...prevFormData,
                [field]: formattedValue,
            }));
        }
    };

    //search value option in 'Select' 
    const handleSearch = (inputValue: string) => {
        setSearchValue(inputValue);
    };

    //show value option after search
    const filteredData = () => {
        if (dataDepartmentMember && dataDepartmentMember.length > 0) {
            return dataDepartmentMember.filter(
                (departmentMember) =>
                    departmentMember.User.Id !== formData.ReceiverId && (
                        departmentMember.User.FullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                        departmentMember.User.Email?.toLowerCase().includes(searchValue.toLowerCase()) ||
                        departmentMember.User.JobTitle?.toLowerCase().includes(searchValue.toLowerCase())
                    )
            )
        }
        else return [];
    };

    //limit the characters entered on the input tag
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.which ? event.which : event.keyCode;
        if ((charCode < 48 || charCode > 57) && charCode !== 8) {
            event.preventDefault();
        }
    };

    // console.log('formdata', formData);

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-request'>
                    <MenuAdd formData={formData} setFormData={setFormData} />
                    <div className='page-content'>
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
                            (
                                <>
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
                                                            initialValue={initialValueSender}
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
                                                            initialValue={initialValueDepartment}
                                                            labelCol={{ span: 24 }}
                                                        >
                                                            <Select
                                                                value={formData.DepartmentId}
                                                                onChange={(value) => handleSelectChange(value, 'DepartmentId')}
                                                                showSearch
                                                                optionFilterProp="children"
                                                                filterOption={(inputValue, option) =>
                                                                    option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                                }
                                                                className='responsive-select-option'
                                                            >
                                                                {dataDepartment.map((department) => (
                                                                    <Option key={department.Id} value={department.Id} className='responsive-select-option'>
                                                                        {department.Name}
                                                                    </Option>
                                                                ))}
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
                                                            initialValue={initialValueReceiver}
                                                            labelCol={{ span: 24 }}
                                                            className={initialValueReceiver === 'No Data' ? 'no-data' : ''}
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
                                                            initialValue={initialValueMobile}
                                                        >
                                                            <Input onKeyPress={handleKeyPress} type='text' name='Mobile' value={formData.Mobile ?? ''} onChange={handleInputChange} />
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
                                                            initialValue={initialValueCostCenter}
                                                        >
                                                            <Input onKeyPress={handleKeyPress} type='text' name='CostCenter' value={formData.CostCenter ?? ''} onChange={handleInputChange} />
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
                                                                    message: t('totalpassengers')
                                                                },
                                                                {
                                                                    pattern: /^[0-9]*$/,
                                                                    message: t('Total passengers must be a number'),
                                                                },
                                                            ]}
                                                            initialValue={initialValueTotalPassengers}
                                                            labelCol={{ span: 24 }}
                                                        >
                                                            <Input maxLength={9} onKeyPress={handleKeyPress} type='text' name='TotalPassengers' value={formData.TotalPassengers ?? ''} onChange={handleInputChange} />
                                                        </Form.Item>
                                                    </Col>
                                                    {/*Request Usage time from*/}
                                                    <Col xs={24} sm={24} md={12} lg={8} xl={6} className='col-request'>
                                                        <Form.Item
                                                            label={t('from')}
                                                            name="UsageFrom"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: t('Usage time from is required')
                                                                },
                                                            ]}
                                                            labelCol={{ span: 24 }}
                                                            initialValue={initialValueUsageFrom}
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
                                                            label={t('to')}
                                                            name="UsageTo"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: t('Usage time to is required')
                                                                },
                                                            ]}
                                                            labelCol={{ span: 24 }}
                                                            initialValue={initialValueUsageTo}
                                                        >
                                                            <DatePicker
                                                                className='add-request-width-formitem'
                                                                value={dayjs(formData.UsageTo)}
                                                                onChange={(value) => handleDatePicker(value, 'UsageTo')}
                                                                showTime
                                                                placeholder={t('to')}
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
                                                            initialValue={initialValuePickTime}
                                                        >
                                                            <DatePicker
                                                                className='add-request-width-formitem'
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
                                                            initialValue={initialValuePickLocation}
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
                                                            initialValue={initialValueDestination}
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
                                                            initialValue={initialvalueReason}
                                                        >
                                                            <Input type='text' name="Reason" value={formData.Reason} onChange={handleInputChange}></Input>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </div>
                                    <SendApprover departmentId={formData.DepartmentId} fileList={fileList} setFileList={setFileList} applyNote={applyNote} setApplyNote={setApplyNote} listOfUserId={listOfUserId} setListOfUserId={setListOfUserId} />
                                </>
                            )}

                    </div>
                </div>
            )
            }
        </RequestLayout >
    );
}

export default AddRequest;