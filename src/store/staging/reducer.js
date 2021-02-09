import { FETCHED_STAGING } from "./actions";
import { DISLIKED_MOVIE, PARTY_LIKED_MOVIE, LIKED_MOVIE } from "../movies/actions";
import {} from "../movies/actions";
import { LOG_OUT } from "../user/actions";

const initialState = {
  list: [],
  fetchCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_STAGING: {
      console.log(`fetch count: ${state.fetchCount}`);
      return {
        ...state,
        list: [...state.list, ...action.payload],
        fetchCount: state.fetchCount + 1,
      };
    }
    case DISLIKED_MOVIE: {
      return { ...state, list: [...state.list.slice(1)] };
    }
    case LIKED_MOVIE: {
      return { ...state, list: [...state.list.slice(1)] };
    }
    case PARTY_LIKED_MOVIE: {
      return {
        ...state,
        list: [...state.list, ...action.payload],
      };
    }
    case LOG_OUT: {
      return initialState;
    }
    default:
      return state;
  }
};
