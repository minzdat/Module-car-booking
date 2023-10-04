import { Input, Button, Form, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import request from "../../Utils/request";
import "./index.css";

interface LoginValues {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('Token');

  const handleLogIn = useCallback(
    (values: LoginValues) => {
      setLoading(true);
      if (token) {
        navigate('/');
      }
      request
        .post("/user/login", values)
        .then((response) => {
          const data = response.data;
          if (data) {
            localStorage.setItem("Token", data?.Data?.jwtToken);
            localStorage.setItem("Id", data?.Data?.userInfo.Id);
            if (data.Success === false) {
              console.log("Login failed:", data?.Message);
              message.error(data?.Message);
            } else {
              navigate("/");
              window.location.reload();
            }
            // setTab('get-all' + `/userId=${data.Data.userInfo.Id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate, token]
  );


  return (
    <Spin spinning={loading} size="large">
      <div className="login-page">
        <h2>Login to your account</h2>
        <br />
        <Form
          className="login-form"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={handleLogIn}
        >

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Type your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Type your password" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" id="btn-login" loading={loading}>
              Log In
            </Button>
            {/* <Link to={`/register`} style={{ textDecoration: "none" }}>
              <Button type="primary" htmlType="submit" id="btn-register">
                Register
              </Button>
            </Link> */}
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

// const mapStateToProps = (state: RootState) => ({
//   userInfo: state.request.userInfo
// })

// const mapDispatchToProps = { setUserInfo }

export default Login;
