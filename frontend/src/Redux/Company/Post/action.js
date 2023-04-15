import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
//action types
export const ADD_DATA_REQUEST = "ADD_DATA_REQUEST";
export const ADD_DATA_SUCCESS = "ADD_DATA_SUCCESS";
export const ADD_DATA_ERROR = "ADD_DATA_ERROR";

//actions
const addDataRequest = () => ({
  type: ADD_DATA_REQUEST,
});

const addDataSuccess = (payload) => ({
  type: ADD_DATA_SUCCESS,
  payload,
});

const addDataError = (payload) => ({
  type: ADD_DATA_ERROR,
  payload,
});

//posting Data;

export const addData = (payload) => (dispatch) => {

  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  let token = authDetails?.token;

  dispatch(addDataRequest());
  axios({
    url: "https://test-production-e6c2.up.railway.app/createCompany",
    method: "POST",
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(
        addDataSuccess({
          status: true,
          message: "Data Add Successfully",
        })
      );
      message.success("Added Successfully");
    })
    .catch((error) => {
      dispatch(
        addDataError({
          status: false,
          message: "Something went wrong while adding Data",
        })
      );
      message.error("Something went wrong while adding Data");
    });
};
