import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: null, //getToken(), // This might be a problem
  name: null,
  email: null,
  party: [], // list of members in your party
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("got to LOGIN_SUCCESS");
      console.log("token:", action.payload.token);
      AsyncStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      AsyncStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
