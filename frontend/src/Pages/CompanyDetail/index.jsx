import React from "react";
import "../../Styles/CompanyDetail.css";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import HamburgerNavbar from "../../Components/HamburgerNavbar";
import Footer from "../../Components/Footer";

const CompanyDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    let token = authDetails?.token;

    if (id) {
      setLoading(true);
      fetch(
        `https://test-production-e6c2.up.railway.app/getParticularCompany/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log(res, "resdata");
          setLoading(false);
          setData(res.getParticularCompany);
        });
    }
  }, [id]);

  return (
    <>
      <HamburgerNavbar />
      {loading ? (
        <Spin tip="Loading" size="large">
          <div className="content" style={{ marginTop: "30%" }} />
        </Spin>
      ) : (
        <>
          <div style={{ marginTop: 60 }}>
            <h2 className="head">{data.companyName}</h2>
          </div>
          <div className="Parent_Div">
            <div style={{ width: "100%" }}>
              <div className="flex_div1">
                <div className="child_flex_div">
                  <div className="img_div">
                    <span>{data.websiteUrl}</span>
                    <br />
                    <img
                      src="https://metapercept.com/img/logo/Metapercept_Cube_logo2_48.svg"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
              <div className="flex_div2">
                <div className="second_div">
                  <h3>Lead Source</h3>
                  <p>{data.leadSource}</p>
                  <br></br>
                  <h3>Status</h3>
                  <p>New</p>
                  <br />
                  <div>
                    <h3>Why should you apply ?</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: data.whyApply }}
                    ></div>
                  </div>
                  <br />
                  <div className="linkdindiv">
                    <h3>Linkdin</h3>
                    <a href={data.linkdinUrl} target="_blank">
                      {data.linkdinUrl}
                    </a>
                    <br></br>
                  </div>

                  <h3>AmbitionBox</h3>
                  <a href={data.ambitionBox} target="_blank">
                    {data.ambitionBox}
                  </a>
                </div>
                <div className="second_right_div">
                  <h3>Company Segment</h3>
                  <p>{data.companySegment}</p>
                  <br></br>
                  <h3>Industry</h3>
                  <p>{data.industry}</p>
                  <br></br>
                  <div>
                    <h3>About the company</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></div>
                  </div>
                  <h3>Glassdoor</h3>
                  <a href={data.glassdoorUrl} target="_blank">
                    {data.glassdoorUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CompanyDetail;
