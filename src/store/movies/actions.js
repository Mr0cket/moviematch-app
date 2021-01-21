export const DISLIKED_MOVIE = "DISLIKED_MOVIE";
export const LIKED_MOVIE = "LIKED_MOVIE";
export const NEW_MATCH = "NEW_MATCH";
export const CLEAR_MODAL = "CLEAR_MODAL";
export const NEW_LIKED = "NEW_LIKED";
export const FETCHED_MATCHES = "FETCHED_MATCHES";
export const FETCHED_LIKED_MOVIES = "FETCHED_LIKED_MOVIES";

import axios from "axios";
import { apiUrl } from "../../config/constants";
// initialise socket.io here...?

// noticing a lot of actions which are too similar..
export const clearModal = () => ({ type: CLEAR_MODAL });
export const newMatchesList = (matches) => ({
  type: FETCHED_MATCHES,
  payload: matches,
});
export const newLikedList = (likedMovies) => ({
  type: FETCHED_LIKED_MOVIES,
  payload: likedMovies,
});
export const newMatch = (movie) => async (dispatch, getState) => {
  setTimeout(() => dispatch(clearModal()), 3000);
  dispatch({
    type: NEW_MATCH,
    payload: movie,
  });
};

export const newLiked = (movie) => ({
  type: NEW_LIKED,
  payload: movie,
});

export const dislikedMovie = (movieId) => ({
  type: DISLIKED_MOVIE,
  payload: movieId,
});

export const likedMovie = (movieId) => {
  return { type: LIKED_MOVIE, payload: movieId };
};
export const sendMovieLiked = () => {};

export const fetchMovieList = (type) => async (dispatch, getState) => {
  console.log("type", type);
  console.log("isMatches:", type === "matches");
  const token = getState().user.token;
  try {
    const response = await axios.get(`${apiUrl}/movies/${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data?.message === "user has no party") return;
    dispatch(type === "matches" ? newMatchesList(response.data) : newLikedList(response.data));
  } catch (error) {
    console.log("error fetching Movies", error);
  }
};

//socket events here??
