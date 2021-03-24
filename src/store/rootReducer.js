import { combineReducers } from "redux";
import user from "./user/reducer";
import appState from "./appState/reducer";
import movies from "./movies/reducer";

export default combineReducers({
  user,
  appState,
  movies,
});
