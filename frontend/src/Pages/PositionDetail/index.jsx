import React from "react";
import "../../Styles/PositionDetail.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "antd/es/radio";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import HamburgerNavbar from "../../Components/HamburgerNavbar";
import Footer from "../../Components/Footer";

const PositionDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(id);
  useEffect(() => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    let token = authDetails?.token;
    if (id) {
      setLoading(true);

      fetch(`https://test-production-e6c2.up.railway.app/position/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          setData(res.ParticularPositionEligible);
          console.log(
            "res.ParticularPositionEligible",
            res.ParticularPositionEligible
          );
        });
    }
  }, [id]);

  console.log(data.additionalCriteria, "POsition table");
  console.log(data?.rounds);

  return (
    <>
      <HamburgerNavbar />
      {loading ? (
        <Spin tip="Loading" size="large">
          <div className="content" style={{ marginTop: "30%" }} />
        </Spin>
      ) : (
        <>
          <div className="navDiv">
            <div>
              <h2>{data.companyName + "" + "-" + "" + data.title}</h2>
            </div>
            <div>
              {/* <Button style={{ background: "#1F2937", color: "white" }}>
            EDIT POSITION
          </Button> */}
            </div>
          </div>

          <div id="Container_of_page">
            <div>
              <div className="container_inner_div">
                <div>
                  <h5>TITLE:</h5>
                </div>
                <div>
                  <span>{data.title}</span>
                </div>
              </div>
              <div className="container_inner_div">
                <div>
                  <h5>COMPANY:</h5>
                </div>
                <div>
                  <span>{data.companyName}</span>
                </div>
              </div>
              <div className="container_inner_div">
                <div>
                  <h5>CATEGORY:</h5>
                </div>
                <div>
                  <span>{data.category}</span>
                </div>
              </div>
              <div className="container_inner_div">
                <div>
                  <h5>APPLICATION PROCESS:</h5>
                </div>
                <div>
                  <span>{data.applicationProcess}</span>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div className="container_inner_div">
                  <div>
                    <h5>OPENINGS(per company):</h5>
                  </div>
                  <div>
                    <span>{data.openings}</span>
                  </div>
                </div>
                <div className="container_inner_div">
                  <div>
                    <h5>OPENINGS(per BD POC):</h5>
                  </div>
                  <div>
                    <span>{data.openingsPOC}</span>
                  </div>
                </div>
                <div className="container_inner_div">
                  <div>
                    <h5>MIN_MAX SALARY:</h5>
                  </div>
                  <div>
                    <span>
                      {data.minSalary + "" + "-" + "" + data.maxSalary}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div className="container_inner_div">
                  <div>
                    <h5>ROUNDS</h5>
                  </div>
                  <div>
                    <div style={{ lineHeight: "30px", marginTop: "-5px" }}>
                      {data.rounds &&
                        data.rounds.map((e, i) => (
                          <p key={i} style={{ fontSize: "14px" }}>
                            {e}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="container_inner_div">
                  <div>
                    <h5>ADDITIONAL CRITERIA</h5>
                  </div>
                  <div>
                    <span>
                      {data.additionalCriteria
                        ? data.additionalCriteria
                        : "No additional criteria specified"}
                    </span>
                  </div>
                </div>
                <div className="container_inner_div">
                  <div>
                    <h5>BOND</h5>
                  </div>
                  <div>
                    <span>No </span>
                  </div>
                </div>
                <div className="container_inner_div">
                  <div>
                    <h5>EXPECTED CLOSURE</h5>
                  </div>
                  <div>
                    <span>-</span>
                  </div>
                </div>
                <div className="container_inner_div">
                  <div>
                    <h5>EXPECTED CLOSURE DATE</h5>
                  </div>
                  <div>
                    <span>-</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div className="container_inner_div">
                  <div>
                    <h5>LOCATION</h5>
                  </div>
                  <div>
                    <span>Remote</span>
                  </div>
                </div>
                <div className="container_inner_div">
                  <div>
                    <h5>ELIGIBLITY</h5>
                  </div>
                  <div style={{ fontSize: "11px" }}>
                    <li>
                      Degree :{" "}
                      {data.degrees &&
                        data.degrees.map((e, i) => <span key={i}>{e} </span>)}
                    </li>
                    <li>
                      Stream :
                      {data.streams &&
                        data.streams.map((e, i) => <span key={i}>{e}</span>)}
                    </li>
                    <li>Graduation Year :{data.graduationsYear}</li>
                    <li>Tenth percentage :{data.tenthPer}</li>
                    <li>Twelth percentage :{data.twelvePer}</li>
                    <li>
                      Graduation percentage :
                      {data?.graduationPer ? data?.graduationPer : "N/A"}
                    </li>
                    <li>Gender :{data.gender}</li>
                  </div>
                </div>
                <div className="container_inner_div">
                  <div>
                    <h5>DIFFICULTY LEVEL(Technical)</h5>
                  </div>
                  <div>
                    <span>- </span>
                  </div>
                </div>
                <div className="container_inner_div">
                  <div>
                    <h5>INTENT</h5>
                  </div>
                  <div>
                    <span>-</span>
                  </div>
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

export default PositionDetail;
