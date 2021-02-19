import { dislikedMovie, likedMovie, newMatch } from "./movies/actions";
import { io } from "socket.io-client";
import { apiUrl } from "../config/constants";
import store from "./index";
let socket;
console.log(`socket connected to: ${apiUrl}`);

// handle Events emitted from server.
//validate socket connection with user token
// Socket event listeners
// use dispatch to push socket events to redux
export const initSocket = () => {
  socket = io(apiUrl);
  socket.on("connect", () => {
    // get user token and send to server
    const token = store.getState().user.token;
    socket.emit("user/join", token);
  });

  socket.on("party/match", (movie) => {
    console.log(`movie liked by party: ${movie.title}`);
    store.dispatch(newMatch(movie.movieId));
  });
  // handling connection errors
  socket.on("connect_failed", () =>
    console.log(`[socket]: connection failed with: ${socket?.user?.name}`)
  );
  socket.on("reconnect", () =>
    console.log(`[socket]: reconnected to client: ${socket?.user?.name}`)
  );
  socket.on("error", () => console.log(`[socket]: error: ${socket?.user?.name}`));
};

export const movieliked = (movie) => async (dispatch, getState) => {
  store.dispatch(likedMovie(movie.movieId));
  socket.emit("user/likedMovie", movie);
};

export const movieDisliked = (movie) => async (dispatch, getState) => {
  store.dispatch(dislikedMovie(movie));
  socket.emit("user/dislikedMovie", movie);
};
