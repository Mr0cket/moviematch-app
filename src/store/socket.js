import { io } from "socket.io-client";
import { apiUrl } from "../config/constants";

const socket = io(apiUrl);
console.log("socket initialised");

// handle Events emitted from server.
export const initSocket = (token, dispatch) => {
  //validate socket connection with user token
  // Socket event listeners
  // use dispatch to push socket events to redux
  socket.on("connect", () => {
    console.log("connection established with server");
    // console.log("device socketId:", socket.id);
    socket.emit("user/join", token);
  });

  socket.on("party/movieLiked", (movie) => dispatch(partyLiked(movie)));
};

export default socket;
