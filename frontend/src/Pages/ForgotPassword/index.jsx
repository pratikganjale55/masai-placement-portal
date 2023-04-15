import { Button, Col, Form, message, Input, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "../../Styles/signupSignin.css";
import { MailOutlined, RedoOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    generateRandomString(6);
  }, []);

  function generateRandomString(length) {
    setLoading(true);
    setTimeout(() => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      setCaptcha(result);
      setLoading(false);
    }, 1000);
  }

  function handleEmailSentForm(values) {
    setForgotPasswordLoading(true);
    axios
      .post(
        "https://test-production-e6c2.up.railway.app/auth/forgetpassword",
        values
      )
      .then((response) => {
        console.log("Data", response.data);
        if (response.data.message === "Password reset email sent") {
          setForgotPasswordLoading(false);
          message.success("Password reset email sent to your email", 4);
          setTimeout(() => {
            navigate("/forgotPasswordMailSent");
          }, 2000);
        }
        setForgotPasswordLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error", errorMessage);
        if (errorMessage === "No user found with this email address") {
          message.warning("No user found with this email address");
        }
        setForgotPasswordLoading(false);
      });
  }

  return (
    <>
      <div className="signupContainer" id="forgotPasswordContainer">
        <div>
          <div id="loginImageDiv">
            <img
              width={"100%"}
              src="ForgotPasswordimage.png"
              className="signupImage"
              alt="forgotPassword"
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
              <h1>Forgot Password?</h1>
              <p>
                Don't Worry! It happens. Please enter the email associated with
                your account.
              </p>
            </div>
            <div className="innerSignupFormContainer">
              <Form
                labelAlign=""
                layout="vertical"
                autoComplete="off"
                onFinish={handleEmailSentForm}
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
                <Form.Item rules={[{}]}>
                  <div className="captchaDiv">
                    <div className="captchaBox">
                      <p>{captcha}</p>
                    </div>
                    <div>
                      <Spin spinning={loading}>
                        <RedoOutlined
                          onClick={() => generateRandomString(6)}
                          style={{
                            fontSize: 30,
                            marginTop: 7,
                            color: "#444d5c",
                          }}
                        />
                      </Spin>
                    </div>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Captcha"
                  extra="We must make sure that your are a human."
                  hasFeedback
                >
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        name="captcha"
                        noStyle
                        dependencies={[captcha]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter the captcha",
                          },
                          {
                            validator: (_, value) => {
                              return value === captcha
                                ? Promise.resolve()
                                : Promise.reject("Wrong Captcha");
                            },
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={forgotPasswordLoading}
                    style={{
                      background: "#1F2937",
                      color: "White",
                      fontWeight: 600,
                    }}
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
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

export default ForgotPassword;
