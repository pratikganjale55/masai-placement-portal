import React, { useEffect } from "react";
import { Form, Modal, Button, Input, AutoComplete, Alert, message } from "antd";
import { useState } from "react";
import CreateCompanyPage from "../../../CreateCompanyPage/index.jsx";
import { useOutletContext } from "react-router-dom";

const CompanyPage = () => {
  const [loding, setLoding] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState({});
  const [acOptions, setAcOptions] = useState([]);
  const { next, FirstStep, FirstInitial } = useOutletContext();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoding(true);
    setTimeout(() => {
      setLoding(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  let token = authDetails?.token;

  const getData = async () => {
    let res = await fetch(
      `https://test-production-e6c2.up.railway.app/singleCompany?companyName=${currentValue}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await res.json();
    var allData = [];

    data.map((el) => {
      let singlevalue = {
        value: el.companyName,
        label: el.companyName,
        id: el._id,
      };
      allData.push(singlevalue);
    });
    setAcOptions(allData);
  };

  useEffect(() => {
    getData();
  }, [currentValue]);

  useEffect(() => {
    message.info("Please Select Any Existing Company Or Create new Company", 5);
  }, []);

  return (
    <div className="container">
      <Form
        name="nest-messages"
        layout="vertical"
        onFinish={FirstStep}
        initialValues={FirstInitial}
      >
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AutoComplete
            options={acOptions}
            onChange={(value) => {
              setCurrentValue(value);
            }}
            placeholder="Enter your company"
          />
        </Form.Item>
        <div style={{ display: "flex", gap: "5%", flexWrap: "wrap" }}>
          <Form.Item>
            <Button
              style={{ color: " #fff", backgroundColor: "#1677ff" }}
              onClick={showModal}
            >
              Create Company
            </Button>
          </Form.Item>

          {acOptions.map((el) => (
            <Form.Item
              key={el.id}
              name={el.id}
              label={el.label}
              style={{ display: "none" }}
            >
              <Input value={el.id} />
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "60px",
              }}
              onClick={next}
            >
              Next
            </Button>
          </Form.Item>
        </div>
        <Modal
          open={open}
          title="Create Company"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <CreateCompanyPage
            handleOk={handleOk}
            handleCancel={handleCancel}
            loading={loding}
          />
        </Modal>
      </Form>
    </div>
  );
};

export default CompanyPage;
