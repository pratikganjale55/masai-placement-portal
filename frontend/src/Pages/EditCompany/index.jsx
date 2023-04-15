import { Modal } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import EditCompanyPage from "../EditCompanyPage";

function EditCompany() {
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    setOpen(false);
    navigate(`/companies`);
  };

  return (
    <div>
      <Modal
        open={open}
        title="Edit Company"
        onCancel={handleCancel}
        footer={[]}
      >
        <EditCompanyPage handleCancel={handleCancel} id={id} />
      </Modal>
    </div>
  );
}

export default EditCompany;
