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
    store.dispatch(newMatch(movie));
  });
};

export const movieliked = (movie) => async (dispatch, getState) => {
  console.log("emitting likedMovie to socket");
  socket.emit("user/likedMovie", movie);
  dispatch(likedMovie(movie));
};

export const movieDisliked = (movie) => async (dispatch, getState) => {
  socket.emit("user/dislikedMovie", movie);
};
