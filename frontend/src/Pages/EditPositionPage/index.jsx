import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  InputNumber,
} from "antd";
import tagRender from "../../Components/Tag/index";
import { cities } from "../../Data/cities";
import { interviewRounds } from "../../Data/interviewRounds";
import { educationStreams } from "../../Data/educationStreams";
import { degrees } from "../../Data/degrees";
import { domicileLocation } from "../../Data/domicileLocation";
import { jobRole } from "../../Data/jobRole";
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

const selectAfter = (
  <Select defaultValue="Percentage">
    <Option value="Percentage">Percentage</Option>
    <Option value="CGPA">CGPA</Option>
  </Select>
);

const EditPositionPage = ({ handleOk, handleCancel, loding, id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const formRef = React.useRef(null);

  const onFinish = (values) => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    let token = authDetails?.token;
    let payload = { ...values };
    setLoading(true);
    fetch(`https://test-production-e6c2.up.railway.app/updatePosition/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res, "pratik");
        setLoading(false);

        message.success("Data successfully Upadeted");
        navigate("/positions");
      })
      .catch((error) => {
        setLoading(false);
        message.error("Something went wrong", error);
      });
  };

  useEffect(() => {
    if (id) {
      let authDetails = JSON.parse(localStorage.getItem("authDetails"));
      let token = authDetails?.token;
      setLoading(true);
      fetch(`https://test-production-e6c2.up.railway.app/position/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          setData(res.ParticularPositionEligible);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <center>
        <img
          style={{ width: "100%", height: "50vh" }}
          src="https://cdn.dribbble.com/users/77121/screenshots/15191750/media/0ce749e630ca31ffd76e105b09340b45.gif"
          alt="loder"
        />
      </center>
    );
  }
  return (
    <div>
      <Form
        name="nest-messages"
        onFinish={onFinish}
        layout="vertical"
        ref={formRef}
        initialValues={data}
        validateMessages={validateMessages}
      >
        <div style={{ height: "400px", overflow: "auto" }}>
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

          <Form.Item
            name="category"
            label="Category"
            initialvalue={data.category}
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
              <Option value="Immediate Relocation">Immediate Relocation</Option>
              <Option value="Permanent Remote">Permanent Remote</Option>
              <Option value="Remote for Now">Remote for Now</Option>
              <Option value="Others">Others</Option>
            </Select>
          </Form.Item>

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

          <Form.Item name="graduationsYear" label="Graduation Year">
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

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

          <Form.Item
            name="twelvePer"
            label="Twelve"
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

          <Form.Item name="graduationPer" label="Graduation">
            <InputNumber
              addonAfter={selectAfter}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

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

          <div
            style={{
              justifyContent: "right",
              display: "flex",
              flexWrap: "wrap",
              margin: "2%",
              gap: "1%",
            }}
          >
            <div>
              <Form.Item>
                <Button key="back" onClick={handleCancel}>
                  Cancle
                </Button>
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <Button
                  key="submit"
                  type="primary"
                  loading={loding}
                  onClick={handleOk}
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditPositionPage;
