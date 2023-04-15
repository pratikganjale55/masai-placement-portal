import { Button, Form, Input, message } from "antd";
import "../../Styles/signupSignin.css";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const ChangePassword = () => {
  const [changePasswordFormLoading, setChangePasswordFormLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleResetPasswordForm(values) {

    setChangePasswordFormLoading(true);
    axios
      .patch(
        `https://test-production-e6c2.up.railway.app/auth/resetPassword/${id}`,
        values
      )
      .then((response) => {
        console.log("Data", response.data);
        if (response.data.message === "Password updated successfully") {
          message.success(
            "Password updated successfully, Please login with your new password",
            5
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        setChangePasswordFormLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.status || error.status;
        console.error("Error", errorMessage);
        if (errorMessage === "User Not Exists!!") {
          message.error("User Not Exists!!");
        } else if (errorMessage === "Something Went Wrong") {
          message.error("Error while updating the password");
        }
        setChangePasswordFormLoading(false);
      });
  }

  return (
    <>
      <div className="signupContainer" id="changePasswordContainer">
        <div>
          <div id="loginImageDiv">
            <img
              width={"100%"}
              src="/ForgotPasswordimage.png"
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
              <h1>Change Password</h1>
              <p>
                Ready to create new password? Please type something you'll
                remember.
              </p>
            </div>
            <div className="innerSignupFormContainer">
              <Form
                labelAlign=""
                layout="vertical"
                autoComplete="off"
                onFinish={handleResetPasswordForm}
                onFinishFailed={(error) => {
                  console.log({ error });
                }}
              >
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your current password",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Current password"
                  />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
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
                    placeholder="New password"
                  />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="rePassword"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please comfirm the password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Password doesn't matched");
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm your password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={changePasswordFormLoading}
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

export default ChangePassword;
