import React from 'react';
import './menuUser.css';
import { Menu } from 'antd';
import { ArrowLeftOutlined, ClusterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MenuUser(): JSX.Element {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/setting");
    }
    return (
        <div>
            <Menu mode="horizontal" className='organizational-menu-user'>
                <Menu.Item key="viewchart" icon={<ClusterOutlined />}>
                    {t('View orgchart')}
                </Menu.Item>
                <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                    {t('return')}
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuUser;