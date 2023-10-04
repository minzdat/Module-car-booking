import React, { useState } from 'react';
import { Button, Menu, Modal, message, notification, Checkbox } from 'antd';
import { ArrowLeftOutlined, CheckCircleFilled, DeleteOutlined, SendOutlined, WarningOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';
import request from '../../../Utils/request';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import { checkUserRoles } from '../../../Utils/checkUserRoles';

interface MenuAddProps {
    formData: {
        SenderId: string | null,
        DepartmentId: string,
        ReceiverId: string,
        Mobile: string | null,
        CostCenter: string | null,
        TotalPassengers: string | null,
        PickLocation: string,
        Destination: string,
        Reason: string,
        ApplyNote: boolean,
        UsageFrom: string,
        UsageTo: string,
        PickTime: string,
        ListOfUserId: string[],
        Status: string,
        files: RcFile[],
    },
    setFormData: React.Dispatch<React.SetStateAction<{
        SenderId: string | null;
        DepartmentId: string;
        ReceiverId: string;
        Mobile: string | null;
        CostCenter: string | null;
        TotalPassengers: string | null;
        PickLocation: string;
        Destination: string;
        Reason: string,
        ApplyNote: boolean,
        UsageFrom: string,
        UsageTo: string,
        PickTime: string,
        ListOfUserId: string[],
        Status: string,
        files: RcFile[];
    }>>,
    userInfo: any,
    senderId: any
}


function MenuEdit({ formData, setFormData, userInfo, senderId }: MenuAddProps) {

    const { t } = useTranslation();

    const navigate = useNavigate();
    const { requestId } = useParams();
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [checkBoxDelete, SetCheckBoxDelete] = useState(false);

    const handleReSubmit = () => {
        if (formData.ReceiverId && formData.Mobile && formData.CostCenter && formData.TotalPassengers && formData.PickTime && formData.PickLocation && formData.Destination && formData.Reason && formData.ListOfUserId !== null && formData.ListOfUserId.length !== 0) {
            request.putForm("/request/Id=" + requestId, formData)
                .then((response) => {
                    const data = response.data;
                    if (data) {
                        openNotification('topRight', 'Create Request successfull', true);
                        const comment = t('Submit the request ') + data.Data.RequestCode + t(' for approval');
                        request.postForm("/request/comment/requestId=" + data.Data.Id, { comment });
                        localStorage.setItem("Data", data?.Data);
                        if (data.Success === false) {
                            message.error(data.Message);
                        } else {
                            navigate("/request/carbooking/detail/" + requestId);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    openNotification('topRight', error.response.data.Message, false);
                });
            setFormData((prevFormData) => ({
                ...prevFormData,
                SenderId: "",
                DepartmentId: "",
                ReceiverId: "",
                Mobile: "",
                CostCenter: "",
                TotalPassengers: "",
                PickLocation: '',
                Destination: '',
                Reason: '',
                ApplyNote: false,
                UsageFrom: "",
                UsageTo: "",
                PickTime: "",
                ListOfUserId: [],
                Status: "",
                files: [],
            }));
        } else {
            openNotification('topRight', 'Failed', false);
        }
    }

    const handleReturn = () => {
        navigate("/request/carbooking");
    }
    const openNotification = (placement: NotificationPlacement, msg: string, success: boolean) => {
        if (success === false) {
            notification.info({
                message: <strong>{t('Failed action')}</strong>,
                description: msg,
                placement,
                icon: <WarningOutlined style={{ color: '#FF0000' }} />,
            });
        } else {
            notification.info({
                message: <strong>Successful</strong>,
                description: msg,
                placement,
                icon: <CheckCircleFilled style={{ color: 'green' }} />,

            });

        };
    }


    const showModalDelete = () => {
        setIsModalOpenDelete(true);
        // console.log('succes');
    }
    const handleClose = () => {
        setIsModalOpenDelete(false);
    };


    const handleDelete = () => {
        request.delete("/request/" + requestId)
            .then(() => {
                navigate("/request/carbooking");
                // console.log('sucess');
                openNotification('topRight', 'Delete successful', true);
            })
            .catch((e) => {
                openNotification('topRight', e.response.data.Message, false);
            })
        setIsModalOpenDelete(false);
    }

    const onChangeCheckBoxDelete = () => {
        SetCheckBoxDelete(!checkBoxDelete);
    };

    console.log('formData', formData);

    // const checkUserRoles = (roles: number[]) => {
    //     if (userInfo.UserRoles) {
    //         let checkRole = [];
    //         // ADMIN OR ADMINSTRATIVE
    //         if (roles.includes(1) || roles.includes(2)) {
    //             checkRole = userInfo.UserRoles.filter((role: any) => role.RoleId === 1 || role.RoleId === 2);
    //         }
    //         // APPROVER
    //         else if (roles.includes(3)) {
    //             checkRole = userInfo.UserRoles.filter((role: any) => role.RoleId === 3);
    //         }
    //         if (checkRole.length === 0) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     }
    //     else {
    //         return false;
    //     }
    // }


    return (

        <div className='menu-detail-request'>
            <Menu mode="horizontal" className='fixed-menu '>
                <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                    {t('return')}
                </Menu.Item>
                {(senderId === userInfo.Id || checkUserRoles([1, 2], userInfo)) && (
                    <Menu.Item onClick={showModalDelete} key="delete" icon={<DeleteOutlined />}>
                        {t('delete')}
                    </Menu.Item>
                )}

                <Modal className='custom-menu' closable={false} title={<h4 className='menu-title-alert'>{t('Are you sure ?')}</h4>} open={isModalOpenDelete} footer={
                    <div className='menu-btn-delete'>
                        <Button type="primary" onClick={handleDelete}>OK</Button>
                        <Button onClick={handleClose}>{t('cancel')}</Button>
                    </div>
                }>
                    <Checkbox className='menu-btn-delete-checkbox' onChange={onChangeCheckBoxDelete}>{t('Delete approval tasks related to this request.')}</Checkbox>
                </Modal>
                {/* <Menu.Item onClick={handleSaveDraft} key="savedraft" icon={<SaveOutlined />}>
                    Save draft
                </Menu.Item> */}
                <Menu.Item onClick={handleReSubmit} key="submit" icon={<SendOutlined />}>
                    {t('Re-Submit')}
                </Menu.Item>
            </Menu>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    userInfo: state.request.userInfo
});


export default connect(mapStateToProps, null)(MenuEdit);