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

export const getData = () => (dispach) => {
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  let token = authDetails?.token;
  dispach(getDataRequest());
  axios({
    url: "https://test-production-e6c2.up.railway.app/getCompany",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispach(getDataSuccess(res.data.companyDataResult));
    })
    .catch((error) => dispach(getDataError()));
};
