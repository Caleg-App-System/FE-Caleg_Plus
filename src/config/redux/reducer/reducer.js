import { combineReducers } from "redux";
import auth from "./auth"
import filter from "./filter";

const reducer = combineReducers({ auth, filter });

export default reducer;
