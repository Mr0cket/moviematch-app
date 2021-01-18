import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";
export const FETCHED_MOVIES = "FETCHED_MOVIES";

export const newStagingList = (movieList) => ({
  type: FETCHED_MOVIES,
  payload: movieList,
});

export const fetchStagingList = () => async (dispatch, getState) => {
  // get user token
  const { token } = getState().user;
  const page = getState().staging.fetchCount;
  try {
    dispatch(appLoading("staging"));
    const response = await axios.get(`${apiUrl}/stagingList?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const list = response.data;
    dispatch(newStagingList(list));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error);
  }
};
