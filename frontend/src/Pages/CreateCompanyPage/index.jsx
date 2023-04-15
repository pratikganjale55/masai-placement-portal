import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../Redux/Company/Post/action";
import { Button, Form, Input, Select} from "antd";
import CkEditor from "../../Components/Editor";
import { useNavigate } from "react-router-dom";
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

function CreateCompanyPage({ handleOk, handleCancel, loding }) {
  const dispatch = useDispatch();
  const { loading, msg, error } = useSelector((store) => store.postCompany);
  const [description, setDescription] = useState("N/A");
  const [whyApply, setWhyApply] = useState("N/A");
  const [form] = Form.useForm();
  const formRef = React.useRef(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    let payload = {
      ...values,
      description: description,
      whyApply: whyApply,
      navigate: navigate,
    };
    dispatch(addData(payload));
  };

  const handleAutofill = () => {
    form.setFieldsValue({
      companyName: "Cognizant",
      websiteUrl: "www.cognizant.com",
      companySegment: "Mid size SBS/ IT/ ITeS",
      industry: "Service Based",
      linkdinUrl:
        "https://www.linkedin.com/company/cognizant/?originalSubdomain=in",
      glassdoorUrl:
        "https://www.glassdoor.co.in/Overview/Working-at-cognizant-EI_IE4138.11…",
      ambitionBox: "https://www.ambitionbox.com/overview/cognizant-overview",
      leadSource: "Repeat Hiring Partner",
    });
  };

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
        form={form}
        ref={formRef}
        validateMessages={validateMessages}
      >
        <div style={{ height: "400px", overflow: "auto" }}>
          <Form.Item
            name="companyName"
            label="Company Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="websiteUrl"
            label="Website URL"
            rules={[
              {
                required: true,
              },
              {
                type: "url",
                warningOnly: true,
              },
              {
                type: "string",
                min: 6,
              },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            name="companySegment"
            label="Company Segment"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Company Segment" allowClear>
              <Option value="Large Service Based Companies">
                Large Service Based Companies
              </Option>
              <Option value="Mid size SBS/ IT/ ITeS">
                Mid size SBS/ IT/ ITeS
              </Option>
              <Option value="Small/ Boutique IT/ ITeS firms">
                Small/ Boutique IT/ ITeS firms
              </Option>
              <Option value="Large Enterprises (MNSc/ Indian/ GCCs)">
                Large Enterprises (MNSc/ Indian/ GCCs)
              </Option>
              <Option value="Mid size Enterprises">Mid size Enterprises</Option>
              <Option value="Classic companies Digital Division">
                Classic companies Digital Division
              </Option>
              <Option value="Unicorn/ Sonnicorns">Unicorn/ Sonnicorns</Option>
              <Option value="Series B+">Series B+</Option>
              <Option value="Seed to Series A">Seed to Series A</Option>
              <Option value="Pre Seed">Pre Seed</Option>
              <Option value="Unfunded">Unfunded</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="industry"
            label="Industry"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Industry" allowClear>
              <Option value="Consumer Digital">Consumer Digital</Option>
              <Option value="Enterprise Tech">Enterprise Tech</Option>
              <Option value="SaaS">SaaS</Option>
              <Option value="Retail Tech">Retail Tech</Option>
              <Option value="EdTech">EdTech</Option>
              <Option value="ealthTech">ealthTech</Option>
              <Option value="FinTech">FinTech</Option>
              <Option value="Artificial Intelligence">
                Artificial Intelligence
              </Option>
              <Option value="HiTech">HiTech</Option>
              <Option value="Food Tech">Food Tech</Option>
              <Option value="Auto Tech">Auto Tech</Option>
              <Option value="Internet First Brands">
                Internet First Brands
              </Option>
              <Option value="Logistics Tech">Logistics Tech</Option>
              <Option value="Life Sciences">Life Sciences</Option>
              <Option value="IoT">IoT</Option>
              <Option value="Blockchain">Blockchain</Option>
              <Option value="Agri Tech">Agri Tech</Option>
              <Option value="Energy Tech">Energy Tech</Option>
              <Option value="Real Estate Tech">Real Estate Tech</Option>
              <Option value="Global SaaS">Global SaaS</Option>
              <Option value="Gaming Tech">Gaming Tech</Option>
              <Option value="Cross Border">Cross Border</Option>
              <Option value="Beauty Tech">Beauty Tech</Option>
              <Option value="Cybersecurity">Cybersecurity</Option>
              <Option value="Electric Vehicles">Electric Vehicles</Option>
              <Option value="Cryptocurrencies">Cryptocurrencies</Option>
              <Option value="Banking Tech">Banking Tech</Option>
              <Option value="InsurTech">InsurTech</Option>
              <Option value="Social Commerce">Social Commerce</Option>
              <Option value="Service Based">Service Based</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <CkEditor setData={setDescription} />
          </Form.Item>

          <Form.Item name="whyApply" label="Why Apply">
            <CkEditor setData={setWhyApply} />
          </Form.Item>

          <Form.Item
            name="linkdinUrl"
            label="Linkdin URL"
            rules={[
              {
                type: "url",
                warningOnly: true,
              },
              {
                type: "string",
                min: 6,
              },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            name="glassdoorUrl"
            label="Glassdoor URL"
            rules={[
              {
                type: "url",
                warningOnly: true,
              },
              {
                type: "string",
                min: 6,
              },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            name="ambitionBox"
            label="Ambition Box"
            rules={[
              {
                type: "url",
                warningOnly: true,
              },
              {
                type: "string",
                min: 6,
              },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            name="leadSource"
            label="Lead Source"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Industry" allowClear>
              <Option value="Inbound Leads">Inbound Leads</Option>
              <Option value="Cold Outreach">Cold Outreach</Option>
              <Option value="Masai Employee Referral">
                Masai Employee Referral
              </Option>
              <Option value="Masai Student Referral">
                Masai Student Referral
              </Option>
              <Option value="Repeat Hiring Partner">
                Repeat Hiring Partner
              </Option>
              <Option value="Investor/ Prateek Connect">
                Investor/ Prateek Connect
              </Option>
              <Option value="Hiring Partner Referral">
                Hiring Partner Referral
              </Option>
              <Option value="Student Referral">Student Referral</Option>
            </Select>
          </Form.Item>
        </div>
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
              <Button key="auto" htmlType="button" onClick={handleAutofill}>
                Autofill Form
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
      </Form>
    </div>
  );
}

export default CreateCompanyPage;
