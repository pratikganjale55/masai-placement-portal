import { ADD_DATA_ERROR, ADD_DATA_REQUEST, ADD_DATA_SUCCESS } from "./action";

let initState = {
  loading: false,
  msg: [],
  error: false,
};

export const addCompanyDataReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case ADD_DATA_ERROR:
      return {
        ...state,
        loading: false,
        msg: [],
        error: true,
      };
    default:
      return state;
  }
};
