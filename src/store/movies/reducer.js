import { LOG_OUT } from "../user/actions";
import {
  FETCHED_LIKED_MOVIES,
  FETCHED_MATCHES,
  NEW_MATCH,
  LIKED_MOVIE,
  CLEAR_MODAL,
} from "./actions";

const initialState = { matches: [], liked: [], matchModal: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_MATCHES: {
      return { ...state, matches: action.payload };
    }
    case FETCHED_LIKED_MOVIES: {
      return { ...state, liked: action.payload };
    }
    case NEW_MATCH: {
      return { ...state, matches: [...state.matches, action.payload], matchModal: action.payload };
    }
    case CLEAR_MODAL: {
      return { ...state, matchModal: null };
    }
    case LIKED_MOVIE: {
      return { ...state, liked: [...state.liked, action.payload] };
    }
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
