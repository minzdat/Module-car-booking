import React, { useState } from "react";
import { Tabs } from 'antd';
import UserManage from "./User/userManage";
import DepartmentManage from "./Department/departmentManage";
import RoleManage from "./Role/roleManage";
import RequestLayout from "../RequestLayout";

const { TabPane } = Tabs;

const AdminPage: React.FC = () => {

    const [activeTab, setActiveTab] = useState<string>('user');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const profile = true;

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div style={{ padding: '48px', marginTop: '30px' }}>
                    <h1>Admin Page</h1>
                    <Tabs activeKey={activeTab} onChange={handleTabChange}>
                        <TabPane tab="User" key="user">
                            <UserManage />
                        </TabPane>
                        <TabPane tab="Department" key="department">
                            <DepartmentManage />
                        </TabPane>
                        <TabPane tab="Role" key="role">
                            <RoleManage />
                        </TabPane>
                    </Tabs>
                </div>
            )}
        </RequestLayout>

    );
};

export default AdminPage;