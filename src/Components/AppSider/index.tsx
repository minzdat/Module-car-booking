import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

import { FolderOpenOutlined, BarChartOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import "./AppSider.scss";
import { setTab, setStatus } from '../../Actions/requestAction';
import { RootState } from '../../Reducers/rootReducer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const AppSider = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { tab, setTab, setStatus } = props
    const items: MenuProps['items'] = [
        getItem(t('requests'), 'requests', <FolderOpenOutlined />, [
            getItem(t('allrequests'), 'get-all'),
            getItem(t('senttome'), 'sent-to-me'),
            getItem(t('senttoothers'), 'sent-to-others'),
            getItem(t('sharedwithme'), 'shared-with-me'),
        ]),

        getItem(t('status'), 'status', <BarChartOutlined />, [
            getItem(t('draft'), 'Draft'),
            getItem(t('approving'), 'Waiting for approval'),
            getItem(t('approved'), 'Approved'),
            getItem(t('rejected'), 'Rejected'),
        ]),

        getItem('Reports', 'reports', <FileTextOutlined />),

    ];

    const profileItems: MenuProps['items'] = [

        getItem(t('Setting'), 'setting', <SettingOutlined />),

    ];

    const [openItem, setOpenItem] = useState('requests');

    const handleClick: MenuProps['onClick'] = (e) => {
        if (e.key !== 'get-all' && e.keyPath[1] === 'requests') {
            setTab(e.key);
            setStatus("");
        }
        else if (e.keyPath[1] === 'status') {
            setTab('get-all');
            setStatus(e.key);
        }
        else { setTab(e.key); setStatus("") }

        if (e.keyPath[0] === 'setting') {
            navigate('/setting');
        }
    };
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className='sider-layout'>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{ background: colorBgContainer }}
                width={230}
                breakpoint='md'>
                <div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[tab]}
                        defaultOpenKeys={['requests']}
                        openKeys={[openItem]}
                        style={{ height: '100%' }}
                        items={props.profile ? profileItems : items}
                        onClick={handleClick}
                        onOpenChange={(openKey) => {
                            setOpenItem(openKey[1])
                        }}
                    />
                </div>
            </Sider>
        </div>
    )
}
const mapStateToProps = (state: RootState) => ({
    tab: state.request.tab,
    status: state.request.status
})

const mapDispatchToProps = { setTab, setStatus }

export default connect(mapStateToProps, mapDispatchToProps)(AppSider);

// export default AppSider