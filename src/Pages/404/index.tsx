import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");

    const handlePage = () => {
        if (token) {
            navigate("/request/carbooking");
        } else {
            navigate("/login");
        }
    }
    return (

        <Result
            status={token ? "404" : "403"}
            title={token ? "404" : "403"}
            subTitle={token ? "Sorry, Page Not Found." : "Sorry, you are not authorized to access this page."}
            extra={token ? <Button type="primary" onClick={handlePage}>Home Page</Button> : <Button type="primary" onClick={handlePage}>Login Page</Button>}
        />
    );
}

export default PageNotFound;