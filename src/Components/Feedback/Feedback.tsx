import { Button, Modal, Select } from 'antd'
import React, { useState } from 'react'
import "./index.css";
import { useTranslation } from 'react-i18next';

const Feedback = () => {
    const [isModalOpenFeedback, setIsModalOpenFeedback] = useState(false);
    const {t} = useTranslation();

    const showModalFeedbacks = () => {
        setIsModalOpenFeedback(true);
    }

    const handleSend = () => {
        setIsModalOpenFeedback(false);
    }

    const handleCancel = () => {
        setIsModalOpenFeedback(false);
    }

    return (
        <>
            <div className='feedback-title' style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={showModalFeedbacks}>
                <p>{t('feedback')}</p>
            </div>
            <Modal className='feedback-content' closable={false} title={<h3>{t('Post an idea or report error')}</h3>} open={isModalOpenFeedback} onCancel={handleCancel} footer={
                <div >
                    <p>{t('This is Tasken of UserVoice system.When you post an idea, send a error report, or suggestions, the development team and experts will be notified directly and take actions, in case of necessity, the customer support & technical expert team I will contact you for more details.Valuable contributions will be appreciated by us, and recorded on our UserVoice system')}</p>
                    <textarea rows={8} cols={50}></textarea>
                    <Button onClick={handleSend}>{t('Send')}</Button>
                </div>
            }>
            </Modal>
        </>
    )
}


export default Feedback