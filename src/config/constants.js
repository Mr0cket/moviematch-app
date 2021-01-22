export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://movie-match-api.herokuapp.com"
    : "http://192.168.1.20:4000";
// : "http://192.168.1.20:4000";
