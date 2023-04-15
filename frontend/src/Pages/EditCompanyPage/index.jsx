import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CkEditor from "../../Components/Editor";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input, Select, message } from "antd";
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

const EditCompanyPage = ({ handleOk, handleCancel, loding, id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [description, setDescription] = useState("");
  const [whyApply, setWhyApply] = useState("");
  const navigate = useNavigate();
  const formRef = React.useRef(null);

  const onFinish = (values) => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    let token = authDetails?.token;
    let payload = { ...values, description: description, whyApply: whyApply };
    setLoading(true);
    fetch(`https://test-production-e6c2.up.railway.app/editCompany/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setLoading(false);
        message.success("Data successfully updated");
        navigate("/companies");
      })
      .catch((error) => {
        setLoading(false);
        message.error("Something went wrong");
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    if (id) {
      let authDetails = JSON.parse(localStorage.getItem("authDetails"));
      let token = authDetails?.token;
      setLoading(true);
      console.log(id, "gry");
      fetch(
        `https://test-production-e6c2.up.railway.app/getParticularCompany/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          console.log(res, "ffggg");
          setData(res.getParticularCompany);
          setDescription(res.description);
          setWhyApply(res.whyApply);
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
            name="companyName"
            label="Company Name"
            initialvalue={data.companyName}
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
            initialvalue={data.websiteUrl}
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
            initialvalue={data.companySegment}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select Company Segment"
              initialvalue={data.companySegment}
              allowClear
            >
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
            initialvalue={data.industry}
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
            initialvalue={data.description}
          >
            <CkEditor setData={setDescription} />
          </Form.Item>

          <Form.Item name="whyApply" label="Why Apply">
            <CkEditor setData={setWhyApply} />
          </Form.Item>

          <Form.Item
            name="linkdinUrl"
            label="Linkdin URL"
            initialvalue={data.linkdinUrl}
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
            initialvalue={data.glassdoorUrl}
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
            initialvalue={data.ambitionBox}
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
            initialvalue={data.leadSource}
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
};

export default EditCompanyPage;
