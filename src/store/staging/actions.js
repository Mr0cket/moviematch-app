import axios from "axios";
import { apiUrl } from "../../config/constants";
export const FETCHED_MOVIES = "FETCHED_MOVIES";

export const gotStagedList = (movieList) => ({
  type: FETCHED_MOVIES,
  payload: movieList,
});

export const getListThunk = () => async (dispatch, getState) => {
  console.log("state test:", getState);
  // get user token

  try {
    const response = await axios.get(apiUrl + "/stagingList", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
