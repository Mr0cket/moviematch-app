export const DISLIKED_MOVIE = "DISLIKED_MOVIE";
export const LIKED_MOVIE = "LIKED_MOVIE";
export const PARTY_LIKED_MOVIE = "PARTY_LIKED_MOVIE";
export const FETCHED_MATCHES = "FETCHED_MATCHES";
export const FETCHED_LIKED_MOVIES = "FETCHED_LIKED_MOVIES";

import axios from "axios";
import { apiUrl } from "../../config/constants";
// initialise socket.io here...?
import socket from "../socket";

// noticing a lot of actions which are too similar..
export const newMatchesList = (matches) => ({
  type: FETCHED_MATCHES,
  payload: matches,
});
export const newLikedList = (likedMovies) => ({
  type: FETCHED_LIKED_MOVIES,
  payload: likedMovies,
});
export const partyLiked = (movie) => ({
  type: PARTY_LIKED_MOVIE,
  payload: movie,
});

export const dislikedMovie = (movieId) => ({
  type: DISLIKED_MOVIE,
  payload: movieId,
});

export const likedMovie = (movieId) => {
  console.log("movieId:", movieId);
  return { type: LIKED_MOVIE, payload: movieId };
};
export const movieliked = (movie) => async (dispatch, getState) => {
  // send socket.io message...?
  // should initialise socket.io in one place... maybe a separate file?
  console.log("socketId check:", socket.id);
  socket.emit("user/likedMovie", movie);
  dispatch(likedMovie(movie.id));
};

export const movieDisliked = (movie) => async (dispatch, getState) => {
  // send socket.io message...?
  socket.emit("user/dislikedMovie", movie);
  dispatch(dislikedMovie(movie.id));
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
    dispatch(type === "matches" ? newMatchesList(response.data) : newLikedList(response.data));
  } catch (error) {
    console.log("error fetching Movies", error);
  }
};

//socket events here??
