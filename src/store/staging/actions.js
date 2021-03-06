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
  const page = getState().staging.fetchCount;
  try {
    initialLoad && dispatch(appLoading("staging"));
    const response = await axios.get(`${apiUrl}/stagingList?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const list = response.data;
    dispatch(newStagingList(list));
    initialLoad && dispatch(appDoneLoading());
  } catch (error) {
    console.log(error);
  }
};
