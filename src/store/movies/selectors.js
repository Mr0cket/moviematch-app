export const selectMatches = (state) =>
  state.movies.matches.map((movieId) => state.movies.cachedMovies[movieId]);
export const selectMatchModal = (state) => state.movies.matchModal;
export const selectlikedMovies = (state) =>
  state.movies.liked.map((movieId) => state.movies.cachedMovies[movieId]);
export const selectMovie = (movieId) => (state) => state.movies.cachedMovies[movieId];
