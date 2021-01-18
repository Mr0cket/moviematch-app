export const DISLIKED_MOVIE = "DISLIKED_MOVIE";
export const LIKED_MOVIE = "LIKED_MOVIE";
export const PARTY_LIKED_MOVIE = "PARTY_LIKED_MOVIE";
// initialise socket.io here...?
import socket from "../socket";

// noticing a lot of actions which are too similar..
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

//socket events here??
