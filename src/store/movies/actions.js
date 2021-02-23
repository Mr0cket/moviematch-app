export const DISLIKED_MOVIE = "DISLIKED_MOVIE";
export const LIKED_MOVIE = "LIKED_MOVIE";
export const NEW_MATCH = "NEW_MATCH";
export const CLEAR_MODAL = "CLEAR_MODAL";
export const NEW_LIKED = "NEW_LIKED";
export const FETCHED_MATCHES = "FETCHED_MATCHES";
export const FETCHED_LIKED_MOVIES = "FETCHED_LIKED_MOVIES";
export const FETCHED_MOVIE_DETAILS = "FETCHED_MOVIE_DETAILS";
import axios from "axios";
import { appDoneLoading, appLoading, showMessageWithTimeout } from "../appState/actions";
import { apiUrl, tmdbBaseUrl, tmdbApiKey } from "../../config/constants";
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
  // show modal for 3 seconds then clear
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
export const MovieDetails = (details) => ({
  type: FETCHED_MOVIE_DETAILS,
  payload: details,
});
export const sendMovieLiked = () => {};

export const fetchMovieList = (type) => async (dispatch, getState) => {
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

export const fetchMovieDetails = (movieId) => async (dispatch, getState) => {
  // query TMDB API with n requests simultaneously
  const endpoints = [
    `${tmdbBaseUrl}/movie/${movieId}?api_key=${tmdbApiKey}`, // more movie details
    `${tmdbBaseUrl}/movie/${movieId}/watch/providers?api_key=${tmdbApiKey}`, // watchProviders
    `${tmdbBaseUrl}/movie/${movieId}/credits?api_key=${tmdbApiKey}`, // movie cast / credits
  ];
  dispatch(appLoading("movies"));
  try {
    const promises = endpoints.map((endpoint) => axios.get(endpoint).then((res) => res.data));
    const results = await Promise.all(promises);
    if (results.find((data) => !data)) return console.log("a fetchMovieDetails request failed");
    const {
      backdrop_path,
      runtime,
      production_countries,
      original_language: language,
    } = results[0];
    const backdropUrl = "https://image.tmdb.org/t/p/w1280" + backdrop_path;
    const watchProviders = results[1].results;
    const cast = results[2].cast;

    // get watchProviders stuff from watchProviders stuff endpoint

    dispatch({
      type: FETCHED_MOVIE_DETAILS,
      payload: {
        movieId,
        backdropUrl,
        runtime,
        production_countries,
        language,
        watchProviders,
        cast,
      },
    });
    dispatch(appDoneLoading());
  } catch (e) {
    console.log("fetchMovieDetails error:", e.message);
    dispatch(showMessageWithTimeout("danger", true, `unable to fetch movie details: ${e.message}`));
  }
};
