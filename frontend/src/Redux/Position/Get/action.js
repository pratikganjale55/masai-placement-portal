import axios from "axios";
//action types
export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_ERROR = "GET_DATA_ERROR";

//actions
const getDataRequest = () => ({
  type: GET_DATA_REQUEST,
});

const getDataSuccess = (payload) => ({
  type: GET_DATA_SUCCESS,
  payload,
});

const getDataError = () => ({
  type: GET_DATA_ERROR,
});

//getting Data;

export const getPositionData = () => (dispach) => {
  dispach(getDataRequest());
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  let token=authDetails?.token;
  // axios({
  //   url: "https://test-production-e6c2.up.railway.app/position",
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  fetch("https://test-production-e6c2.up.railway.app/position", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res)=>{
    return res.json();
  })
    .then((res) => {
      dispach(getDataSuccess(res?.positionEligibilityData));
    })
    .catch((error) => dispach(getDataError()));
};
