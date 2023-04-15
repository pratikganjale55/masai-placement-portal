import React from "react";
import { Select, Input, InputNumber, Form, Button, Checkbox } from "antd";
import tagRender from "../../../../Components/Tag/index.jsx";
import { useOutletContext } from "react-router-dom";
import { cities } from "../../../../Data/cities";
import { interviewRounds } from "../../../../Data/interviewRounds.js";
import { jobRole } from "../../../../Data/jobRole.js";
const { TextArea } = Input;
const { Option } = Select;

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

const PositionPage = () => {
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { next, prev2, SecondStep, SecondInitial } = useOutletContext();

  const handleAutofill = () => {
    form.setFieldsValue({
      title: "Frontend (other frameworks)",
      category: "Analytics",
      applicationProcess: "online",
      openings: 2,
      openingsPOC: 1,
      minSalary: 400000,
      maxSalary: 500000,
      locations: ["Delhi", "Pune"],
      rounds: ["DSA"],
      workingMode: "WFO",
      relocation: "Permanent Remote",
      bond: "Yes",
      additionalCriteria: "N/A",
    });
  };

  return (
    <div className="container">
      <Form
        name="nest-messages"
        layout="vertical"
        onFinish={SecondStep}
        form={form}
        initialValues={SecondInitial}
        validateMessages={validateMessages}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1%",
            flexBasis: "auto",
          }}
        >
          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Choose Role" allowClear options={jobRole} />
            </Form.Item>
          </div>

          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="e.g. Choose" allowClear>
                <Option value="Web">Web</Option>
                <Option value="Analytics">Analytics</Option>
              </Select>
            </Form.Item>
          </div>

          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="applicationProcess"
              label="Application Process"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="e.g. Choose" allowClear>
                <Option value="online">Online</Option>
                <Option value="offline">Offline</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1%", flexWrap: "wrap" }}>
          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="openings"
              label="Openings(per company)"
              types="number"
              rules={[
                {
                  required: true,
                },
                () => ({
                  validator(_, value) {
                    if (value > 99) {
                      return Promise.reject("Opnings Reach The Limits");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber placeholder="" style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="openingsPOC"
              label="Openings(per BD Poc)"
              type="number"
              rules={[
                {
                  required: true,
                },
                () => ({
                  validator(_, value) {
                    if (value > 99) {
                      return Promise.reject("Opnings Reach The Limits");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber placeholder="" style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="minSalary"
              label="Min Salary"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Min Salary" />
            </Form.Item>
          </div>

          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="maxSalary"
              label="Max Salary"
              dependencies={["minSalary"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("minSalary") <= value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Max salary should be greater!");
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Max Salary" />
            </Form.Item>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1%",
          }}
        >
          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="locations"
              label="Location"
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
                maxTagCount={2}
                allowClear
                options={cities}
              />
            </Form.Item>
          </div>

          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="rounds"
              label="Round"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                mode="multiple"
                tagRender={tagRender}
                showArrow
                style={{
                  width: "100%",
                }}
                maxTagCount={2}
                allowClear
                options={interviewRounds}
              />
            </Form.Item>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1%",
          }}
        >
          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="workingMode"
              label="Working Mode"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="e.g. Choose" allowClear>
                <Option value="WFH">WFH</Option>
                <Option value="WFO">WFO</Option>
                <Option value="Hybrid">Hybrid</Option>
              </Select>
            </Form.Item>
          </div>

          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="relocation"
              label="Relocation"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="e.g. Choose" allowClear>
                <Option value="Immediate Relocation">
                  Immediate Relocation
                </Option>
                <Option value="Permanent Remote">Permanent Remote</Option>
                <Option value="Remote for Now">Remote for Now</Option>
                <Option value="Others">Others</Option>
              </Select>
            </Form.Item>
          </div>

          <div style={{ flexGrow: "1" }}>
            <Form.Item
              name="bond"
              label="Bond"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="e.g. Choose"
                allowClear
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item name="additionalCriteria" label="Additional Criteria">
          <TextArea showCount maxLength={500} />
        </Form.Item>
        <Form.Item
          name="positionVerification"
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
              onClick={prev2}
              style={{
                background: "white",
                color: "#1F2937",
                width: "100px",
              }}
            >
              Previous
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                color: "White",
                width: "60px",
              }}
              onClick={next}
            >
              Next
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default PositionPage;
