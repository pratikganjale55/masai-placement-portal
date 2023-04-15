import React from "react";
import { Select, Form, Button, InputNumber, Checkbox } from "antd";
import tagRender from "../../../../Components/Tag/index.jsx";
import { useOutletContext } from "react-router-dom";
import { educationStreams } from "../../../../Data/educationStreams.js";
import { degrees } from "../../../../Data/degrees.js";
import { domicileLocation } from "../../../../Data/domicileLocation.js";
const { Option } = Select;

const EligibilityPage = () => {
  const { prev1, ThirdStep, ThirdInitial } = useOutletContext();
  const [form] = Form.useForm();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const handleAutofill = () => {
    form.setFieldsValue({
      degrees: ["12th Graduate"],
      streams: ["CS"],
      graduationsYear: 2022,
      locationDomiciles: ["Himachal Pradesh"],
      tenthPer: 60,
      twelvePer: 60,
      graduationPer: 60,
      gender: "Male",
    });
  };

  const selectAfter = (
    <Select defaultValue="Percentage">
      <Option value="Percentage">Percentage</Option>
      <Option value="CGPA">CGPA</Option>
    </Select>
  );

  return (
    <div className="container">
      <Form
        name="nest-messages"
        layout="vertical"
        form={form}
        onFinish={ThirdStep}
        initialValues={ThirdInitial}
        validateMessages={validateMessages}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1%" }}>
          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="degrees"
              label="Degrees"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                style={{
                  width: "100%",
                }}
                options={degrees}
              />
            </Form.Item>
          </div>

          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="streams"
              label="Streams"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                style={{
                  width: "100%",
                }}
                options={educationStreams}
              />
            </Form.Item>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1%" }}>
          <div style={{ flexGrow: "1" }}>
            <Form.Item name="graduationsYear" label="Graduation Year">
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </div>
          <div style={{ flexGrow: "1" }}>
            <Form.Item name="locationDomiciles" label="Domicile Location">
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                style={{
                  width: "100%",
                }}
                options={domicileLocation}
              />
            </Form.Item>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1%", flexWrap: "wrap" }}>
          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="tenthPer"
              label="Tenth"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                addonAfter={selectAfter}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </div>
          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="twelvePer"
              label="Twelth"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                addonAfter={selectAfter}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </div>
          <div style={{ flexGrow: "1" }}>
            <Form.Item name="graduationPer" label="Graduation">
              <InputNumber
                addonAfter={selectAfter}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </div>
          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select Gender" allowClear>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name="eligibilityVerification"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) => {
                return value
                  ? Promise.resolve()
                  : Promise.reject(
                      "To proceed, you need to verify the details."
                    );
              },
            },
          ]}
        >
          <Checkbox>
            I have verified that the details mentioned above are correct for
            this position
          </Checkbox>
        </Form.Item>
        <div
          style={{
            display: "flex",
            gap: "1%",
            flexWrap: "wrap",
            justifyContent: "end",
          }}
        >
          <Form.Item>
            <Button key="auto" htmlType="button" onClick={handleAutofill}>
              Autofill Form
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              onClick={prev1}
              style={{
                width: "100px",
              }}
            >
              Previous
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              style={{
                width: "70px",
              }}
              htmlType="submit"
            >
              Done
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EligibilityPage;
