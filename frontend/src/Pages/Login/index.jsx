import { Button, Form, Input, message } from "antd";
import "../../Styles/signupSignin.css";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loginFormLoading, setLoginFormLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  function handleLoginForm(values) {
    console.log("values", values);
    setLoginFormLoading(true);
    axios
      .post("https://test-production-e6c2.up.railway.app/auth/login", values)
      .then((response) => {
        console.log("Data", response.data);
        if (response.data.message === "Login successful") {
          message.success("Logged in Successfully");
          localStorage.setItem("authDetails", JSON.stringify(response.data));
          setTimeout(() => {
            navigate("/positions");
          }, 2000);
        }
        setLoginFormLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        setLoginFormLoading(false);
        console.error("Error", errorMessage);
        if (errorMessage === "Invalid Credentials") {
          message.error("Invalid Credentials");
        } else if (
          errorMessage === "Please confirm your email before logging in"
        ) {
          message.warning("Please confirm your email before logging in");
        }
      });
  }

  const autofillStudent = () => {
    form.setFieldsValue({
      email: "demoStudent@gmail.com",
      password: "Student@123",
    });
  };

  const autofillAdmin = () => {
    form.setFieldsValue({
      email: "demoAdmin@gmail.com",
      password: "Admin@123",
    });
  };

  return (
    <>
      <div className="signupContainer" id="loginFormContainer">
        <div>
          <div id="loginImageDiv">
            <img
              width={"100%"}
              src="/SignupImage.jpg"
              className="signupImage"
              alt="SignupImage"
            />
          </div>
          <div className="signupFormContainer">
            <div className="signupHeading">
              <img
                src="/Masailogo.svg"
                className="masaiLogo"
                width={"50%"}
                alt="masai logo"
              />
              <h1>Welcome Back</h1>
              <p>Go ahead and login, Get access to your incredible account!</p>
            </div>
            <div className="innerSignupFormContainer">
              <Form
                labelAlign=""
                layout="vertical"
                autoComplete="off"
                form={form}
                onFinish={handleLoginForm}
                onFinishFailed={(error) => {
                  console.log({ error });
                }}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Email",
                    },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Enter your email"
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the password",
                    },
                    { min: 8 },
                    {
                      validator: (_, value) => {
                        function checkPassword(value) {
                          var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
                          return pattern.test(value);
                        }
                        return value && checkPassword(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              "Password must contain a capital letter and a special character"
                            );
                      },
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Enter the password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={loginFormLoading}
                    style={{
                      background: "#1F2937",
                      color: "White",
                      fontWeight: 600,
                    }}
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
                <h4 style={{ color: "grey", marginTop: "-15px" }}>
                  Demo Logins
                </h4>
                <div style={{ display: "flex", gap: "4%", marginTop: "-20px" }}>
                  <div style={{ width: "48%" }}>
                    <Form.Item>
                      <Button
                        block
                        type="default"
                        htmlType="button"
                        key="auto"
                        onClick={autofillAdmin}
                      >
                        Login as Admin
                      </Button>
                    </Form.Item>
                  </div>
                  <div style={{ width: "48%" }}>
                    <Form.Item>
                      <Button
                        block
                        type="default"
                        htmlType="button"
                        key="auto"
                        onClick={autofillStudent}
                      >
                        Login as Student
                      </Button>
                    </Form.Item>
                  </div>
                </div>
                <Form.Item>
                  <Button
                    style={{
                      background: "#F94A29",
                      color: "White",
                      fontWeight: 600,
                    }}
                    block
                    type="primary"
                    onClick={() => {
                      navigate("/forgotpassword");
                    }}
                  >
                    I forgot my Password
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{
                      background: "#4E46DC",
                      color: "White",
                      fontWeight: 600,
                    }}
                    block
                    type="primary"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Don't have account, Create Here
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
