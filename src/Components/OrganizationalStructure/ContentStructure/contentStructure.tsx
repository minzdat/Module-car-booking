import React, { ChangeEvent, useEffect, useState } from 'react';
import './contentStructure.css'
import { Tabs, Input, Row, Col, List, Spin, Alert } from 'antd';
import RequestLayout from '../../RequestLayout';
import './contentStructure.css'
import request from "../../../Utils/request";
import MenuUser from '../MenuUser/menuUser';
import { TeamOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const profile = true;

interface Department {
    Name: string;
    Id: string;
    Description: string;
    UnderDepartment: string;
    ContactInfo: string;
    Code: string;
}
interface DepartmentMember {
    User: {
        FullName: string;
        Email: string;
        JobTitle: string;
    };
    Position: string;
}

const { TabPane } = Tabs;


function ContentStructure(): JSX.Element {

    const { t } = useTranslation();

    const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
    const [filteredDataDepartment, setFilteredDataDepartment] = useState<Department[]>([]);
    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [dataManager, setDataManager] = useState<DepartmentMember[]>([]);
    const [dataSupervisor, setDataSupervisor] = useState<DepartmentMember[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const senderId = localStorage.getItem("Id")
    const [activeTabKey, setActiveTabKey] = useState<string>();


    useEffect(() => {
        setFilteredDataDepartment(dataDepartment);
    }, [dataDepartment]);

    useEffect(() => {
        const getDataDepartment = async () => {
            const endpoint = "department/all?page=1&limit=100";
            await request.get(endpoint).then((res) => {
                setDataDepartment(res.data.Data.ListData);
                setActiveTabKey(!activeTabKey ? res.data.Data.ListData[0].Id : activeTabKey);
            }).catch(() => {
                setLoading(true);
            });
        }
        const getDataDepartmentMember = async () => {
            const endpoint = `departmentMember/position?departmentId=${activeTabKey}`;
            await request.get(endpoint).then((res) => {
                setDataDepartmentMember(res.data.Data);
            }).catch(() => {
                setLoading(true);
            });
        }
        // console.log('hello', activeTabKey);
        const getDataByPosition = async (position: string) => {
            const endpoint = `departmentMember/position?departmentId=${activeTabKey}`;
            await request.get(endpoint).then((res) => {
                let mData = res.data.Data
                let d = mData.filter((d: DepartmentMember) => d.Position === position);
                if (position === 'Manager') {
                    setDataManager(d);
                }
                else if (position === 'Supervisor') {
                    setDataSupervisor(d);
                }
            }).catch(() => {
                setLoading(true);
            });
        }
        setLoading(false);
        getDataDepartment();
        getDataDepartmentMember();
        getDataByPosition('Manager');
        getDataByPosition('Supervisor');
    }, [activeTabKey])

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value === '') {
            setFilteredDataDepartment(dataDepartment);
        } else {
            const filteredDepartments = dataDepartment.filter((department) =>
                department.Name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
            setFilteredDataDepartment(filteredDepartments);
        }
    };

    const handleTabClick = (key: string) => {
        // console.log('Tab clicked:', key);
        setActiveTabKey(key);
    };

    // console.log(dataDepartmentMember);

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='organizational-structure'>
                    <MenuUser />
                    <div className='organizational-structure-content'>
                        <Input
                            placeholder={t('search')}
                            style={{ marginBottom: 16, width: '25%' }}
                            onChange={handleSearch}
                        />
                        <br />
                        <h3>Department</h3>
                        {loading ? ( // Nếu đang tải dữ liệu, hiển thị spinner
                            <Spin style={{ height: '100vh' }} tip="Loading..." size="large">
                                <Alert
                                    style={{ width: '100%', textAlign: 'center' }}
                                    message="Loading..."
                                    description={t('There are some issues happening, please wait a moment or you can try reloading the page')}
                                    type="info"
                                />
                            </Spin>) : (
                            <div className='tabs-container'>
                                <Tabs
                                    tabPosition="left"
                                    className='tabs-col'
                                    onChange={handleTabClick}
                                >
                                    {filteredDataDepartment.map((department) => (
                                        <TabPane className='organizational-structure-content-department' tab={<span><TeamOutlined className='icon-tabs-col-department' />{department.Name}</span>} key={department.Id}>
                                            <div className='titile-department'>{department.Name}</div>
                                            <Tabs style={{ display: 'flex' }} className='tabs-row' tabPosition='top'>
                                                <TabPane tab={t('Information')} key="Information">
                                                    <List
                                                        dataSource={[
                                                            { title: t('Description'), content: <div>{department.Description}</div> },
                                                            { title: t('Under Department'), content: <div>{department.UnderDepartment}</div> },
                                                            { title: t('Contact Info'), content: <div>{department.ContactInfo}</div> },
                                                            { title: t('Code'), content: <div>{department.Code}</div> },
                                                        ]}
                                                        renderItem={(item) => (
                                                            <List.Item>
                                                                <Row style={{ width: '100%' }}>
                                                                    <Col span={5}>{item.title}:</Col>
                                                                    <Col span={19}>{item.content}</Col>
                                                                </Row>
                                                            </List.Item>
                                                        )}
                                                    />
                                                </TabPane>
                                                <TabPane tab={t('Manager')} key="Manager">
                                                    <List
                                                        dataSource={dataManager.map((data) => ({
                                                            fullname: <div>{data.User.FullName}</div>,
                                                            email: <div>{data.User.Email}</div>,
                                                            jobtitle: <div>{data.User.JobTitle}</div>,
                                                        }))}
                                                        renderItem={(item) => (
                                                            <List.Item>
                                                                <Row style={{ width: '100%' }}>
                                                                    <Col span={8}>{item.fullname}</Col>
                                                                    <Col span={8}>{item.email}</Col>
                                                                    <Col span={8}>{item.jobtitle}</Col>
                                                                </Row>
                                                            </List.Item>
                                                        )}
                                                    />
                                                </TabPane>

                                                <TabPane tab={t('Supervisor')} key="Supervisor">
                                                    <List
                                                        dataSource={dataSupervisor.map((data) => ({
                                                            fullname: <div>{data.User.FullName}</div>,
                                                            email: <div>{data.User.Email}</div>,
                                                            jobtitle: <div>{data.User.JobTitle}</div>,
                                                        }))}
                                                        renderItem={(item) => (
                                                            <List.Item>
                                                                <Row style={{ width: '100%' }}>
                                                                    <Col span={8}>{item.fullname}</Col>
                                                                    <Col span={8}>{item.email}</Col>
                                                                    <Col span={8}>{item.jobtitle}</Col>
                                                                </Row>
                                                            </List.Item>
                                                        )}
                                                    />
                                                </TabPane>
                                                <TabPane tab={t('Employee')} key="Employee">
                                                    <List
                                                        dataSource={dataDepartmentMember.map((departmentMember) => ({
                                                            fullname: <div>{departmentMember.User.FullName}</div>,
                                                            email: <div>{departmentMember.User.Email}</div>,
                                                            jobtitle: <div>{departmentMember.User.JobTitle}</div>,
                                                        }))}
                                                        renderItem={(item) => (
                                                            <List.Item>
                                                                <Row style={{ width: '100%' }}>
                                                                    <Col span={8}>{item.fullname}</Col>
                                                                    <Col span={8}>{item.email}</Col>
                                                                    <Col span={8}>{item.jobtitle}</Col>
                                                                </Row>
                                                            </List.Item>
                                                        )}
                                                    />
                                                </TabPane>
                                            </Tabs>
                                        </TabPane>
                                    ))}
                                </Tabs>
                            </div>
                        )}
                    </div >
                </div>
            )}
        </RequestLayout >
    );
}

export default ContentStructure;