import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";
export const FETCHED_STAGING = "FETCHED_STAGING";

export const newStagingList = (movieList) => ({
  type: FETCHED_STAGING,
  payload: movieList,
});

export const fetchStagingList = (initialLoad) => async (dispatch, getState) => {
  // get user token
  const { token } = getState().user;
  try {
    const response = await axios.get(`${apiUrl}/stagingList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(newStagingList(response.data));
  } catch (error) {
    console.log("staging list err", error);
  }
};
