import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading, showMessageWithTimeout, ERROR } from "../appState/actions";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const FETCHED_PARTY_MEMBERS = "FETCHED_PARTY_MEMBERS";
export const NEW_USER_IN_PARTY = "NEW_USER_IN_PARTY";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};
const loginError = (error) => ({
  type: ERROR,
  payload: error,
});

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

const addedUserToParty = (newUser) => ({
  type: NEW_USER_IN_PARTY,
  payload: newUser,
});

export const logOut = () => {
  return { type: LOG_OUT };
};

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading("user"));
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    // input validation
    if (!name) return;
    if (!email || !emailRegex.test(email))
      return dispatch(showMessageWithTimeout("danger", true, "please provide valid email"));
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(showMessageWithTimeout("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        loginError(error.message);

        // dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => async (dispatch, getState) => {
  dispatch(appLoading("user"));
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password,
    });
    dispatch(loginSuccess(response.data));
    // dispatch(showMessageWithTimeout("success", false, "welcome back!", 1000));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      dispatch(showMessageWithTimeout("danger", true, error.response.data.message));
      // if (error.response.data.message === "account blocked")
      // dispatch(setMessage("danger", true, "Account is Blocked. Please contact the retaurant"));
    } else {
      console.log(error.message);
      dispatch(showMessageWithTimeout("danger", true, error.message));

      // dispatch(setMessage("danger", true, error.message));
    }
    dispatch(appDoneLoading());
  }
};

export const getUserWithStoredToken = (token) => {
  return async (dispatch, getState) => {
    // get token from the state

    // if we have no token, stop
    if (!token) return;

    dispatch(appLoading("user"));
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid({ ...response.data, token }));
      dispatch(appDoneLoading());
    } catch (error) {
      console.log("got here");

      if (error.response) {
        console.log(error.response.data.message);
        // if (error.response.data.message === "account blocked")
        // dispatch(showMessageWithTimeout("danger", true, "Your Account may be blocked...", 2000));
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const inviteFriend = (email) => async (dispatch, getState) => {
  const token = getState().user.token;
  try {
    const response = await axios.post(
      `${apiUrl}/party/invite`,
      { email: email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(addedUserToParty(response.data));
    dispatch(showMessageWithTimeout("success", false, "user added to party", 2000));
  } catch (error) {
    console.log("error response:", error.response.data);
    if (error.response)
      dispatch(showMessageWithTimeout("danger", false, error.response.data.message, 2000));
    else dispatch(showMessageWithTimeout("danger", false, error.message, 2000));
  }
};
