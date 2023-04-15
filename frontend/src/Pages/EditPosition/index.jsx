import { Modal } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import EditPositionPage from "../EditPositionPage";

function EditPosition() {
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    setOpen(false);
    navigate(`/positions`);
  };

  return (
    <div>
      <Modal
        open={open}
        title="Edit Position"
        onCancel={handleCancel}
        footer={[]}
      >
        <EditPositionPage handleCancel={handleCancel} id={id} />
      </Modal>
    </div>
  );
}

export default EditPosition;
