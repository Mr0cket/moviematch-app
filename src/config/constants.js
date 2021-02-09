export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://movie-match-api.herokuapp.com"
    : "https://movie-match-api.herokuapp.com";

export const tmdbBaseUrl = "https://api.themoviedb.org/3";
export const tmdbApiKey = "eb066629e9e5aca99797f3955400c4bd";
