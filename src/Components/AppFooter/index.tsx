import { useState } from 'react';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { Layout, Menu, Dropdown } from 'antd';
import united_states from "../../assets/united_states.svg";
import vietnam from "../../assets/vietnam.svg";
import "./AppFooter.css";
import i18next from 'i18next';

const { Footer } = Layout

const AppFooter = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [selectedKey, setSelectedKey] = useState('en');
    const handleMenuClick: MenuClickEventHandler = (e) => {
        i18next.changeLanguage(e.key)
        setCurrentLanguage(e.key);
        setSelectedKey(e.key);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="en" className={selectedKey === 'en' ? 'selected' : ''}>
                <img src={united_states} alt="img-en-flat" width={20} />
                <span> EN</span>
            </Menu.Item>
            <Menu.Item key="vn" className={selectedKey === 'vn' ? 'selected' : ''}>
                <img src={vietnam} alt="img-vn-flat" width={20} />
                <span> VN</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <Footer className='mcs-footer'>
            <div>
                <div className='footer-left'>
                    <span ><b>Tasken @ Opus Solution</b></span>
                </div>
                <div className='footer-right'>
                    <Dropdown overlay={menu} trigger={['click']} className='dropdown-language'>
                        <span>
                            <img src={currentLanguage === 'en' ? united_states : vietnam} alt="img-flat" width={20} />
                            <span>{currentLanguage.toUpperCase()}</span>
                        </span>
                    </Dropdown>
                    <span>Website</span>
                    <span>Terms</span>
                    <span>About</span>
                </div>
            </div>

        </Footer>)
}

export default AppFooter;
