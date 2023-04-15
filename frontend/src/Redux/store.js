import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { getCompanyDataReducer } from "./Company/Get/reducer";
import { addCompanyDataReducer } from "./Company/Post/reducer";
import { getPositionDataReducer } from "./Position/Get/reducer";
import { addPositionDataReducer } from "./Position/Post/reducer";
import thunk from "redux-thunk";

//combine reducers
const rootReducer = combineReducers({
  getCompany: getCompanyDataReducer,
  postCompany: addCompanyDataReducer,
  getPosition: getPositionDataReducer,
  postPosition: addPositionDataReducer,
});

//reduxtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

//store
export const store = createStore(rootReducer, enhancer);
