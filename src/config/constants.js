export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://movie-match-api.herokuapp.com"
    : "https://movie-match-api.herokuapp.com";
