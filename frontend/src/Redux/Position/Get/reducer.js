import { GET_DATA_ERROR, GET_DATA_REQUEST, GET_DATA_SUCCESS } from "./action";

let initState = {
  loading: false,
  data: [],
  error: false,
};

export const getPositionDataReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: true,
      };
    default:
      return state;
  }
};
