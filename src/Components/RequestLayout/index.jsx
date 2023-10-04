import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import AppHeader from '../../Components/AppHeader';
import AppSider from '../../Components/AppSider';
import AppFooter from '../../Components/AppFooter';

import "./RequestLayout.scss";

const { Content } = Layout;

const RequestLayout = ({ profile, children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className='manage-request'>
            <AppHeader />
            <Content>
                <Layout style={{ backgroundColor: colorBgContainer }}>
                    <AppSider profile={profile} />
                    <Layout style={{ backgroundColor: colorBgContainer }}>
                        <Content style={{ minHeight: 280 }}>
                            {children()}
                        </Content>
                    </Layout>
                </Layout>
            </Content>
            <AppFooter />
        </div>


    );
};

export default RequestLayout;