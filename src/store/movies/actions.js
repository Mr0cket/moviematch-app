export const MOVIE_LIKED = "MOVIE_LIKED";
export const MOVIE_DISLIKED = "MOVIE_DISLIKED";

export const dislikedMovie = (movieId) => ({
  type: MOVIE_DISLIKED,
  payload: movieId,
});
