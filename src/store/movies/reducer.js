import { FETCHED_STAGING } from "../staging/actions";
import { LOG_OUT } from "../user/actions";
import {
  FETCHED_LIKED_MOVIES,
  FETCHED_MATCHES,
  NEW_MATCH,
  LIKED_MOVIE,
  CLEAR_MODAL,
  FETCHED_MOVIE_DETAILS,
  DISLIKED_MOVIE,
} from "./actions";
// all lists store movie Ids. when lists are selected, array is mapped to the values of the entries in cachedMovies.
const initialState = {
  cachedMovies: {}, // movies stored with key = movie Id
  matches: [], // list of movie Ids
  liked: [], // list of movie Ids
  staging: [], // should I move staging list here?
  matchModal: null, // movie Id
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_STAGING: {
      const newCachedMovies = state.cachedMovies;
      const staging = action.payload.map((movie) => {
        const movieId = movie.movieId;
        if (!newCachedMovies[movieId]) newCachedMovies[movieId] = movie;
        return movieId;
      });

      return {
        ...state,
        staging: [...state.staging, ...staging],
        cachedMovies: newCachedMovies,
      };
    }

    case FETCHED_MATCHES: {
      const newCachedMovies = { ...state.cachedMovies };
      const matches = action.payload.map((movie) => {
        const movieId = movie.movieId;
        if (!newCachedMovies[movieId]) newCachedMovies[movieId] = movie;
        return movieId;
      });
      return { ...state, matches, cachedMovies: newCachedMovies };
    }
    case FETCHED_LIKED_MOVIES: {
      const newCachedMovies = state.cachedMovies;
      const liked = action.payload.map((movie) => {
        const movieId = movie.movieId;
        if (!newCachedMovies[movieId]) newCachedMovies[movieId] = movie;
        return movieId;
      });
      return { ...state, liked, cachedMovies: newCachedMovies };
    }
    case NEW_MATCH: {
      const newMatches = !state.matches.includes(action.payload)
        ? [...state.matches, action.payload]
        : state.matches;
      return { ...state, matches: newMatches, matchModal: state.cachedMovies[action.payload] };
    }
    case CLEAR_MODAL: {
      return { ...state, matchModal: null };
    }
    case LIKED_MOVIE: {
      const newLiked = !state.liked.includes(action.payload)
        ? [...state.liked, action.payload]
        : state.liked;
      return {
        ...state,
        liked: [...state.liked, action.payload],
        staging: [...state.staging.slice(1)],
      };
    }
    case DISLIKED_MOVIE: {
      return { ...state, staging: [...state.staging.slice(1)] };
    }

    case FETCHED_MOVIE_DETAILS: {
      return {
        ...state,
        cachedMovies: {
          ...state.cachedMovies,
          [action.payload.movieId]: {
            ...state.cachedMovies[action.payload.movieId],
            ...action.payload,
          },
        },
      };
    }
    case FETCHED_STAGING:
      const newCachedMovies = state.cachedMovies;
      action.payload.forEach((movie) => {
        const movieId = movie.movieId;
        if (!newCachedMovies[movieId]) newCachedMovies[movieId] = movie;
        return movieId;
      });
      return { ...state, cachedMovies: newCachedMovies };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
