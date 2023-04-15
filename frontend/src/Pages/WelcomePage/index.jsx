import { Button, Drawer, Collapse, Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Welcome.css";
import {
  MenuOutlined,
  CheckCircleFilled,
  CaretRightOutlined,
} from "@ant-design/icons";
import Footer from "../../Components/Footer/index";

const WelcomePage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const panelStyle = {
    marginBottom: 10,
    background: "white",
    borderRadius: "10px",
    border: "none",
    fontSize: 15,
    fontWeight: 600,
    color: "#1f2937",
  };

  return (
    <div className="welcomePageMainContainer">
      <div className="navbar">
        <div className="navbarContainer">
          <div className="MasailogoContainer">
            <Link to="/">
              <img src="/Masailogo.svg" alt="Logo" />
            </Link>
          </div>
          <div className="NavItemsMenuContainer">
            <div className="NavMenuIcon">
              <MenuOutlined
                style={{ fontSize: 20 }}
                onClick={() => setOpenMenu(true)}
              />
            </div>
            <div className="navHorizontalMenu">
              <div>
                <a href="#WelcomeHomeWrapper">Home</a>
              </div>
              <div>
                <a href="#WelcomeAboutWrapper">About</a>
              </div>
              <div>
                <a href="#WelcomeCompanyWrapper">Recruiters</a>
              </div>
              <div>
                <a href="#welcomeObjectiveWrapper">Objectives</a>
              </div>
            </div>
          </div>
          <div className="navAvatarContainer">
            <a href="#welcomeFAQWrapper">
              <Button
                type="primary"
                style={{ width: 80, background: "#4E46DC", color: "white" }}
              >
                FAQ
              </Button>
            </a>
          </div>
        </div>
        <Drawer
          title=""
          placement="left"
          closable={false}
          onClose={() => setOpenMenu(false)}
          open={openMenu}
          width="70%"
          bodyStyle={{
            padding: 0,
            paddingTop: 40,
          }}
        >
          <div className="drawerMenu">
            <a href="#WelcomeHomeWrapper" onClick={() => setOpenMenu(false)}>
              Home
            </a>
            <a href="#WelcomeAboutWrapper" onClick={() => setOpenMenu(false)}>
              About
            </a>
            <a href="#WelcomeCompanyWrapper" onClick={() => setOpenMenu(false)}>
              Recruiters
            </a>
            <a
              href="#welcomeObjectiveWrapper"
              onClick={() => setOpenMenu(false)}
            >
              Objectives
            </a>
          </div>
        </Drawer>
      </div>
      <div className="welcomeMainContainer">
        <div>
          <div className="WelcomeHomeWrapper" id="WelcomeHomeWrapper">
            <div className="WelcomeHomeContainer">
              <div>
                <img src="/MasaiWelcomPageImage.svg" width={"80%"} alt="" />
              </div>
              <h1>
                Welcome to{" "}
                <span style={{ color: "#4e46dc" }}>
                  {" "}
                  Masai Placement Portal
                </span>
              </h1>
              <p>We Will Support You In Your Entire Placement Journey.</p>
              <div className="signuploginButtonDiv">
                <Button
                  type="primary"
                  block
                  style={{ background: "#1F2937", marginBottom: 10 }}
                  onClick={() => navigate("/signup")}
                >
                  I am new here... Signup
                </Button>
                <Button
                  type="primary"
                  style={{ background: "#1F2937" }}
                  block
                  onClick={() => navigate("/login")}
                >
                  Already have account... Login
                </Button>
              </div>
            </div>
          </div>
          <div className="WelcomeAboutWrapper" id="WelcomeAboutWrapper">
            <div className="WelcomeAboutContainer">
              <div className="AboutLeftContainer">
                <h1>Masai Placement Portal</h1>
                <p>
                  The Masai Placement Portal plays a crucial role in locating
                  job opportunities for under graduates and post graduates
                  passing out from the college by keeping in touch with reputed
                  firms and industrial establishments.
                </p>
                <p className="AboutContainerPTag">
                  The Masai Placement Portal operates round the year to
                  facilitate contacts between companies and graduates. The
                  number of students placed through our portal is continuously
                  rising.
                </p>
                <Button
                  type="primary"
                  style={{ background: "#4e46dc" }}
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
              </div>
              <div className="aboutImageDiv">
                <img src="/WelcomeAboutImage.png" alt="" />
              </div>
            </div>
          </div>
          <div className="WelcomeCompanyWrapper" id="WelcomeCompanyWrapper">
            <div className="WelcomeCompanyContainer">
              <div>
                <img
                  src="/recruitersLogo/client-1.png"
                  width="100%"
                  alt="client-1"
                />
              </div>
              <div>
                <img
                  src="/recruitersLogo/client-2.png"
                  width="100%"
                  alt="client-2"
                />
              </div>
              <div>
                <img
                  src="/recruitersLogo/client-3.png"
                  width="100%"
                  alt="client-3"
                />
              </div>
              <div>
                <img
                  src="/recruitersLogo/client-4.png"
                  width="100%"
                  alt="client-4"
                />
              </div>
              <div>
                <img
                  src="/recruitersLogo/client-5.png"
                  width="100%"
                  alt="client-5"
                />
              </div>
              <div>
                <img
                  src="/recruitersLogo/client-6.png"
                  width="100%"
                  alt="client-6"
                />
              </div>
              <div>
                <img
                  src="/recruitersLogo/client-7.png"
                  width="100%"
                  alt="client-7"
                />
              </div>
              <div>
                <img
                  src="/recruitersLogo/client-8.png"
                  width="100%"
                  alt="client-8"
                />
              </div>
            </div>
          </div>
          <div className="welcomeObjectiveWrapper" id="welcomeObjectiveWrapper">
            <div className="WelcomeObjectiveContainer">
              <div className="ObjectiveLeftContainer">
                <h1>Objectives</h1>
                <p>
                  <CheckCircleFilled
                    style={{ fontSize: 20, color: "#4e46dc" }}
                  />{" "}
                  Developing the students to meet the Industries recruitment
                  process.
                </p>
                <p>
                  <CheckCircleFilled
                    style={{ fontSize: 20, color: "#4e46dc" }}
                  />{" "}
                  To motivate students to develop Technical knowledge and soft
                  skills in terms of career planning, goal setting.
                </p>
                <p>
                  <CheckCircleFilled
                    style={{ fontSize: 20, color: "#4e46dc" }}
                  />{" "}
                  To produce world-class professionals who have excellent
                  analytical skills, communication skills, team building spirit
                  and ability to work in cross cultural environment.
                </p>
              </div>
              <div className="ObjectiveImageDiv">
                <img src="/objectives.svg" width="100%" alt="objectives" />
              </div>
            </div>
          </div>
          <div className="welcomeFAQWrapper" id="welcomeFAQWrapper">
            <div className="WelcomeFAQContainer">
              <div className="FAQLeftContainer">
                <h1>Frequently Asked Questions</h1>
                <p className="AboutContainerPTag">
                  Any queries or doubts regarding the Masai Placement Portal
                  will be addressed over here.
                </p>
                <Collapse
                  accordion={true}
                  bordered={false}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined
                      rotate={isActive ? 90 : 0}
                      style={{ color: "#4e46dc", fontSize: 15 }}
                    />
                  )}
                >
                  <Collapse.Panel
                    key={"1"}
                    header="Q: What is the Masai Placement Portal?"
                    style={panelStyle}
                  >
                    <Typography.Text>
                      The Masai Placement Portal is an online platform that
                      connects job seekers with employers. It is designed to
                      simplify the job search process and provide resources to
                      support candidates in their career development.
                    </Typography.Text>
                  </Collapse.Panel>
                  <Collapse.Panel
                    style={panelStyle}
                    key={"2"}
                    header="Q: Who can use the Masai Placement Portal?"
                  >
                    <Typography.Text>
                      The Masai Placement Portal is primarily designed for
                      current Masai School students and alumni, but it may also
                      be available to other job seekers based on the discretion
                      of Masai School.
                    </Typography.Text>
                  </Collapse.Panel>
                  <Collapse.Panel
                    style={panelStyle}
                    key={"3"}
                    header="Q: How do I create an account on the Masai Placement Portal?"
                  >
                    <Typography.Text>
                      If you are a current student or alumni of Masai School,
                      you will automatically have access to the portal. If you
                      are a job seeker who is not affiliated with Masai School,
                      you can create your account{" "}
                      <span>
                        <Link to="/signup">here</Link>
                      </span>
                      .
                    </Typography.Text>
                  </Collapse.Panel>
                  <Collapse.Panel
                    style={panelStyle}
                    key={"4"}
                    header="Q: How do I apply for a job on the Masai Placement Portal?"
                  >
                    <Typography.Text>
                      To apply for a job on the Masai Placement Portal, you will
                      need to create a profile and upload your resume and other
                      relevant documents. You can then apply to job postings
                      directly through the portal.
                    </Typography.Text>
                  </Collapse.Panel>
                  <Collapse.Panel
                    style={panelStyle}
                    key={"5"}
                    header="Q: How do I access resources to support my job search on the Masai Placement Portal?"
                  >
                    <Typography.Text>
                      The Masai Placement Portal offers a range of resources to
                      support job seekers, including resume templates, interview
                      tips, and career advice. These resources can be accessed
                      through the portal's resource center.
                    </Typography.Text>
                  </Collapse.Panel>
                </Collapse>
              </div>
              <div className="FAQImageDiv">
                <img src="/FAQs.png" width="100%" alt="objectives" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
