import { combineReducers } from "redux";
import auth from "./auth"
import filter from "./filter";
import split from "./split";

const reducer = combineReducers({ auth, filter, split });

export default reducer;
