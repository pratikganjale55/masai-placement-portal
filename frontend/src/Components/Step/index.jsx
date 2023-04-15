import { Steps, theme } from "antd";
import { useState } from "react";
import Footer from "../Footer/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { addPosition } from "../../Redux/Position/Post/action.js";
import HamburgerNavbar from "../HamburgerNavbar/index.jsx";

const Step = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [companyId, setCompanyId] = useState({});
  const [positionDetail, setPositionDetail] = useState({});
  const [eligibility, setEligibility] = useState({});
  const [id, setId] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onFinishFirstStep = (value) => {
    var _id = Object.keys(value)[1];
    console.log(_id, "first step");
    setId(_id);
    setCompanyId(value);
    setCurrent(1);
    navigate(`detail/${_id}`);
  };

  const onFinishSecondStep = (value) => {
    setCurrent(2);
    setPositionDetail(value);
    navigate(`eligibility/${id}`);
  };

  const onFinishThirdStep = (value) => {
    let payload = {
      id: id,
      navigate:navigate,
      data: { ...value, ...positionDetail },
    };
    console.log(positionDetail, "pay");
    console.log(payload, "paylod");
    dispatch(addPosition(payload));
  };

  const prev1 = () => {
    setCurrent(1);
    navigate(`detail/${id}`);
  };

  const prev2 = () => {
    setCurrent(0);
    navigate(`/createPosition`);
  };

  const steps = [
    {
      title: "Company",
    },
    {
      title: "Position",
    },
    {
      title: "Eligibility",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: `3%`,
  };

  return (
    <>
      <HamburgerNavbar />
      <div style={{ marginTop: 60 }}>
        <h2 className="head">Create Positions</h2>
      </div>
      <div className="step_form-div">
        <Steps current={current} items={items} />
        <div style={contentStyle}>
          <Outlet
            context={{
              prev1: prev1,
              prev2: prev2,
              FirstStep: onFinishFirstStep,
              FirstInitial: companyId.companyName,
              SecondStep: onFinishSecondStep,
              SecondInitial: positionDetail,
              ThirdStep: onFinishThirdStep,
              ThirdInitial: eligibility,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 24,
            marginBottom: 20,
            gap: "1%",
          }}
        ></div>
      </div>
      <Footer />
    </>
  );
};
export default Step;
