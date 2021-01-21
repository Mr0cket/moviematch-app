import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  FETCHED_PARTY_MEMBERS,
  NEW_USER_IN_PARTY,
} from "./actions";

const initialState = {
  token: null, //getToken(), // This might be a problem
  name: null,
  email: null,
  party: [], // list of members in your party
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      AsyncStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      AsyncStorage.removeItem("token");
      return initialState;

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case FETCHED_PARTY_MEMBERS: {
      return { ...state, party: action.payload };
    }
    case NEW_USER_IN_PARTY: {
      return { ...state, party: [...state.party, action.payload] };
    }
    default:
      return state;
  }
};
