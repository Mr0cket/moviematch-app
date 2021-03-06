import { combineReducers } from "redux";
import user from "./user/reducer";
import appState from "./appState/reducer";
import staging from "./staging/reducer";
import movies from "./movies/reducer";

export default combineReducers({
  user,
  appState,
  staging,
  movies,
});
