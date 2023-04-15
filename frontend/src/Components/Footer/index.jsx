import { Typography } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "../../Styles/Welcome.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="MasaiFooter">
      <div className="FooterLeftDiv">
        <p>© {new Date().getFullYear()} Masai School. All Rights Reserved.</p>
      </div>
      <div className="FooterRightDiv">
        <Typography.Title level={5} style={{ color: "white" }}>
          Follow us on social media
        </Typography.Title>
        <div className="footerSocialMedia">
          <div>
            <Link to="https://www.facebook.com/" target="blank">
              <FacebookOutlined style={{ fontSize: "24px", color: "white" }} />
            </Link>
          </div>
          <div>
            <Link to="https://twitter.com/" target="blank">
              <TwitterOutlined style={{ fontSize: "24px", color: "white" }} />
            </Link>
          </div>
          <div>
            <Link to="https://www.instagram.com/" target="blank">
              <InstagramOutlined style={{ fontSize: "24px", color: "white" }} />
            </Link>
          </div>
          <div>
            <Link to="https://www.linkedin.com/" target="blank">
              <LinkedinOutlined style={{ fontSize: "24px", color: "white" }} />
            </Link>
          </div>
          <div>
            <Link to="https://www.youtube.com/" target="blank">
              <YoutubeOutlined style={{ fontSize: "24px", color: "white" }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
