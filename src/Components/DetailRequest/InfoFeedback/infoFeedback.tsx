import { Alert, Col, Radio, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import './infoFeedback.css'
import request from "../../../Utils/request";
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';


function InfoFeedback() {

    const { t } = useTranslation();

    const [loading, setLoading] = useState<boolean>(true);
    const [vehicleData, setVehicleData] = useState<any>({})
    const [checkValue, setCheckValue] = useState();
    const { requestId } = useParams();



    useEffect(() => {
        const getVehicleData = async () => {
            setLoading(true);
            const endpoint = "/request/vehicle/requestId=" + requestId;
            await request.get(endpoint).then((res) => {
                setVehicleData(res.data.Data);
                setCheckValue(res.data.Data.Type)
            }
            );
        }
        getVehicleData();
        setLoading(false);
    }, [])

    console.log('vehicleData', vehicleData);

    return (
        <div>
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
                    <div>
                        <p>{t('Infomation feedback vehicle type')}</p>
                        {checkValue === true ? (
                            <div><Radio checked>{t('Company vehicle')}</Radio></div>
                        ) : (
                            <div><Radio checked>{t('Rented car, taxi')}</Radio></div>
                        )}
                        <Row gutter={15} className='info-feadback-row'>
                            {checkValue ? (
                                <>
                                    <Col className='info-feadback-col' xs={24} sm={12} lg={6} >
                                        <div className='info-feadback-col-title'>{t('Driver')}</div>
                                        <p className='info-feadback-col-content'>{vehicleData.User.FullName}</p>
                                    </Col>
                                    <Col className='info-feadback-col' xs={24} sm={12} lg={6} >
                                        <div className='info-feadback-col-title'>{t('Mobile')}</div>
                                        <p className='info-feadback-col-content'>{vehicleData.DriverMobile}</p>
                                    </Col>
                                    <Col className='info-feadback-col' xs={24} sm={12} lg={6} >
                                        <div className='info-feadback-col-title'>{t('Car plate')}</div>
                                        <p className='info-feadback-col-content'>{vehicleData.DriverCarplate}</p>
                                    </Col>
                                    <Col className='info-feadback-col' xs={24} sm={12} lg={6} >
                                        <div className='info-feadback-col-title'>{t('Rotation')}</div>
                                        <p className='info-feadback-col-content'>{vehicleData.Rotation.Type}</p>
                                    </Col>
                                </>
                            ) : (
                                <>
                                    <Col className='info-feadback-col' span={24} >
                                        <div className='info-feadback-col-title'>{t('reason')}</div>
                                        <p className='info-feadback-col-content'>{vehicleData.Reason}</p>
                                    </Col>
                                </>
                            )
                            }
                            {vehicleData.Note ? (
                                <>
                                    <Col className='info-feadback-col' span={24}>
                                        <div className='info-feadback-col-title'>{t('Note')}</div>
                                        <p className='info-feadback-col-content'>{vehicleData.Note}</p>
                                    </Col>
                                </>) :
                                (null)
                            }
                        </Row>
                    </div>
                )}
        </div>
    );
}

export default InfoFeedback;