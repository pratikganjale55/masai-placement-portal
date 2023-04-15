import { message } from "antd";
import axios from "axios";
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

export const addPosition = (payload) => (dispatch) => {
  dispatch(addDataRequest());

  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  let token = authDetails?.token;

  fetch(`https://test-production-e6c2.up.railway.app/positions/${payload.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload.data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      console.log(res, "Backend res");
      dispatch(
        addDataSuccess({
          status: true,
          message: "Data Added Successfully",
        })
      );
        
      message.success("Position Added Successfully");
      payload.navigate("/positions")
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
