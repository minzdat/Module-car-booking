import { Col, Layout, Row, Button, Drawer, message, Badge, Menu, Avatar } from "antd";
import "./AppHeader.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuestionOutlined, BellOutlined, SettingOutlined, UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import request from "../../Utils/request";
import opus_logo from "../../assets/opus_logo.png";
import { connect } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer';
import { setTab, setStatus, setUserInfo } from "../../Actions/requestAction";
import Feedback from "../Feedback/Feedback";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

interface LogoutValues {
    username: string;
    password: string;
}

const AppHeader = (props: any) => {
    const userID = localStorage.getItem("Id");
    const { setTab, setStatus, userInfo, setUserInfo } = props;
    const avatarDefault = require('../../public/images/avatarDefault.png');
    const [pathName, setPathName] = useState(window.location.pathname);
    const [openHelp, setOpenHelp] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    // const [userLoginInfo, setUserLoginInfo] = useState({
    //     FullName: "",
    //     AvatarPath: "",
    //     Email: ""
    // });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handlePathName = () => {
        setPathName(window.location.pathname);
        window.location.reload();
    }

    const handleClickHelp = () => {
        console.log("hi");
        setOpenHelp(!openHelp);
        setOpenProfile(false);
    }

    const handleClickSetting = () => {
        navigate('/setting');
    }

    const handleClickProfile = () => {
        setOpenProfile(!openProfile);
        setOpenHelp(false);
    }

    const handleClickMyProfile = () => {
        navigate('/setting/profile/' + userID);
    }

    const onClose = () => {
        console.log("123");
        setOpenHelp(false);
        setOpenProfile(false);
    };

    console.log("help: ", openHelp);

    useEffect(() => {
        if (userID !== null) {
            request.get("/user/profile/" + userID)
                .then((res) => {
                    setUserInfo({
                        Id: res.data.Data.Id,
                        FullName: res.data.Data.FirstName + " " + res.data.Data.LastName,
                        AvatarPath: res.data.Data.AvatarPath,
                        Email: res.data.Data.Email,
                        UserRoles: res.data.Data.UserRoles
                    })
                })
                .catch((e) => {
                    console.log(e.response.Data);
                })
        }
    }, [userID, setUserInfo])

    const handleLogout =
        (values: LogoutValues) => {
            request
                .get("/user/logout")
                .then((response) => {
                    const data = response.data;
                    if (data) {
                        if (data.Success === false) {
                            message.error(data.Message);
                        } else {
                            localStorage.clear();
                            setStatus('');
                            setTab('get-all');
                            navigate('/login');
                            window.location.reload();
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };

    return (
        <Header className="mcs-header">
            <Row className="row-header" gutter={[24, 24]}>
                <Col xs={22}
                    sm={20}
                    md={16}
                    lg={16}
                    xl={16}
                    xxl={16}
                    className="col-logo">
                    <div className="col-logo-menu">
                        <Button className="btn-menu">
                            <MenuOutlined />
                        </Button>
                    </div>
                    <div onClick={handlePathName} className="col-logo-img">
                        <NavLink to="/">
                            <img src={opus_logo} alt="img-opus" />
                        </NavLink>
                    </div>
                    <div className="col-logo-label">
                        <p>eOffice</p>
                    </div>
                </Col>

                <Col xs={2}
                    sm={4}
                    md={8}
                    lg={8}
                    xl={8}
                    xxl={8}
                    className="col-function">
                    <Menu
                        className="group-btn"
                        mode="horizontal"
                        triggerSubMenuAction="click"
                        overflowedIndicatorPopupClassName="popup-menu"
                    // overflowedIndicator={<MenuOutlined />}
                    >
                        <Menu.Item className="function-menu-item" >
                            <Button className="btn-item" onClick={handleClickHelp}><QuestionOutlined /></Button>
                        </Menu.Item>

                        <Menu.Item className="function-menu-item">
                            <Badge count={3000} style={{ zIndex: '9999' }}>
                                <Button className="btn-item"><BellOutlined /></Button>
                            </Badge>
                        </Menu.Item>

                        <Menu.Item className="function-menu-item">
                            <Button className="btn-item" onClick={handleClickSetting}><SettingOutlined /></Button>
                        </Menu.Item>

                        <Menu.Item className="function-menu-item">
                            <Button onClick={handleClickProfile} className="btn-item">
                                {userInfo.AvatarPath
                                    ? <Avatar
                                        shape='circle'
                                        size={32}
                                        src={`http://localhost:63642/${userInfo.AvatarPath}`}
                                        alt="avatar"></Avatar>
                                    : <Avatar
                                        shape='circle'
                                        size={32}
                                        src={String(avatarDefault)}
                                        alt="avatar"></Avatar>
                                }
                            </Button>
                        </Menu.Item>

                    </Menu>
                    <Drawer
                        className="dropdown-help"
                        placement="right"
                        rootClassName="root-dropdown-help"
                        // onClose={onClose}
                        open={openHelp}
                        mask={false}
                        closable={false}
                    >
                        <div className="title-dropdown">
                            <span>{t('help')}</span>
                            <Button className="header-btn-close" onClick={onClose}><CloseOutlined /></Button>
                        </div>
                        <div className="content-dropdown">
                            <h4 style={{ fontSize: '18px', fontFamily: 'Segoe UI', marginLeft: '10px' }}>Opus Helpdesk</h4>
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                <p>{t('introduction')}</p>
                            </NavLink>
                            <Feedback />
                            <NavLink to="https://tasken.io/issue/new" style={{ textDecoration: 'none' }}>
                                <p>{t('openticket')}</p>
                            </NavLink>
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                <p>{t('help')}</p>
                            </NavLink>
                        </div>
                    </Drawer>
                    <Drawer
                        className="dropdown-help"
                        placement="right" onClose={onClose}
                        open={openProfile}
                        mask={false}
                        closable={false}
                    >
                        <div className="title-dropdown">
                            <span>{t('myaccount')}</span>
                            <Button className="header-btn-close" onClick={handleClickProfile}><CloseOutlined /></Button>
                        </div>
                        <div className="content-dropdown">
                            <div className="account-info">
                                {userInfo.AvatarPath
                                    ? <img
                                        src={`http://localhost:63642/${userInfo.AvatarPath}`}
                                        alt="avatar"></img>
                                    : <img
                                        src={String(avatarDefault)}
                                        alt="avatar"></img>
                                }
                                <span className="info-name">{userInfo.FullName}</span>
                                <br />
                                <span className="info-email">{userInfo.Email}</span>
                            </div>
                            <div className="content-info">
                                <div className='my-profile' style={{ textDecoration: 'none' }} onClick={handleClickMyProfile}>
                                    <p>{t('myprofile')}</p>
                                </div>
                                <div className='my-profile' style={{ textDecoration: 'none' }}>
                                    <p>{t('myaccount')}</p>
                                </div>
                                <NavLink to="/" onClick={() => handleLogout({ username: "", password: "" })} style={{ textDecoration: 'none' }}>
                                    <p>{t('signout')}</p>
                                </NavLink>
                            </div>
                        </div>
                    </Drawer>

                    {/* <div className="group-btn">
                        <Button className="btn-item" onClick={handleClickHelp}><QuestionOutlined /></Button>
                        <Drawer
                            className="dropdown-help"
                            placement="right"
                            onClose={onClose}
                            open={openHelp}
                            mask={false}
                            closable={false}
                        >
                            <div className="title-dropdown">
                                <span>{t('help')}</span>
                                <Button className="header-btn-close" onClick={handleClickHelp}><CloseOutlined /></Button>
                            </div>
                            <div className="content-dropdown">
                                <h4 style={{ fontSize: '18px', fontFamily: 'Segoe UI' }}>Opus Helpdesk</h4>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                    <p>{t('introduction')}</p>
                                </NavLink>
                                <Feedback />
                                <NavLink to="https://tasken.io/issue/new" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                    <p>{t('openticket')}</p>
                                </NavLink>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                    <p>{t('help')}</p>
                                </NavLink>
                            </div>
                        </Drawer>

                        <Badge count={3000} style={{ zIndex: '9999' }}>
                            <Button className="btn-item"><BellOutlined style={{ fontSize: '24px', color: 'white' }} /></Button>
                        </Badge>
                        <NavLink to="/setting" className={`${pathName === "/setting" && "select-page"}`}>
                            <Button className="btn-item"><SettingOutlined /></Button>
                        </NavLink>

                        <Button onClick={handleClickProfile} className="btn-item"><UserOutlined /></Button>
                        <Drawer
                            className="dropdown-help"
                            placement="right" onClose={onClose}
                            open={openProfile}
                            mask={false}
                            closable={false}
                        >
                            <div className="title-dropdown">
                                <span>{t('myaccount')}</span>
                                <Button className="header-btn-close" onClick={handleClickProfile}><CloseOutlined /></Button>
                            </div>
                            <div className="content-dropdown">
                                <div className="account-info">
                                    {userInfo.AvatarPath
                                        ? <img
                                            src={`http://localhost:63642/${userInfo.AvatarPath}`}
                                            alt="avatar"></img>
                                        : <img
                                            src={String(avatarDefault)}
                                            alt="avatar"></img>
                                    }
                                    <span className="info-name">{userInfo.FullName}</span>
                                    <br />
                                    <span className="info-email">{userInfo.Email}</span>
                                </div>
                                <div className="content-info">
                                    <div className='my-profile' style={{ textDecoration: 'none' }} onClick={handleClickMyProfile}>
                                        <p>{t('myprofile')}</p>
                                    </div>
                                    <div className='my-profile' style={{ textDecoration: 'none' }}>
                                        <p>{t('myaccount')}</p>
                                    </div>
                                    <NavLink to="/" onClick={() => handleLogout({ username: "", password: "" })} className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                        <p>{t('signout')}</p>
                                    </NavLink>
                                </div>
                            </div>
                        </Drawer>
                    </div> */}
                </Col>
            </Row >
        </Header >
    )
}
const mapStateToProps = (state: RootState) => ({
    tab: state.request.tab,
    status: state.request.status,
    userInfo: state.request.userInfo
});

const mapDispatchToProps = { setTab, setStatus, setUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);