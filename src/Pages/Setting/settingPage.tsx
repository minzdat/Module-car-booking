import React from 'react';
import RequestLayout from '../../Components/RequestLayout';
import { Button, Col, Row } from 'antd';
import './settingPage.css'
import { AppleFilled, AppstoreAddOutlined, ContactsFilled, FieldTimeOutlined, ProfileFilled, RadarChartOutlined, SafetyCertificateFilled, ShareAltOutlined, TeamOutlined, ToolFilled, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const profile = true;
function SettingPage(): JSX.Element {
    const { t } = useTranslation();
    const userID = localStorage.getItem("Id");
    const navigate = useNavigate();

    const handleOrganizationStructure = () => {
        navigate("/setting/structure");
    }
    const handleProflie = () => {
        navigate("/setting/profile/" + userID);
    }

    const handleAdmin = () => {
        navigate("/setting/admin");
    }
    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='setting-page-content'>
                    <b className='responsive-after-titile-intergration'>{t('System')} & {t('Integration')}</b>
                    <div className='responsive-before-titile-integration'>
                        <b>{t('System')}</b>
                        <b className='titile-integration'> {t('Integration')}</b>
                    </div>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button onClick={handleOrganizationStructure}>{t('Organizational structure')}<br /><TeamOutlined /></Button>
                        </Col>
                        <Col className='setting-page-col' xxl={3}>
                            <Button onClick={handleProflie}>{t('Personnal')}<br /><UserOutlined /></Button>
                        </Col>
                        <Col className='integration-office-365' span={13}></Col>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>Office 365<br /><AppstoreAddOutlined /></Button>
                        </Col>
                    </Row>
                    <b>{t('requests')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Remind')}<br /><FieldTimeOutlined /></Button>
                        </Col>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Procedure')}<br /><ShareAltOutlined /></Button>
                        </Col>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Category')}<br /><AppleFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Setting')}<br /><ToolFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Business processs')}<br /><RadarChartOutlined /></Button>
                        </Col>
                    </Row>
                    <b>{t('Payment')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Car Booking')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button onClick={handleAdmin}>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Document approval')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Employee Offboarding')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Checklist')}<br /><ProfileFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Promotion')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Contract')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Contract Template')}<br /><ContactsFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Asset In/Out gate')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Capex Disposal')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Capital Expenditure')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Scheme')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>SMOS</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Prepayment')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Asset Transfer')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Partner')}</b>
                    <Row gutter={5} wrap={true} align='middle' className='setting-page-row'>
                        <Col className='setting-page-col' xxl={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                </div>
            )
            }
        </RequestLayout >
    );

}
export default SettingPage;