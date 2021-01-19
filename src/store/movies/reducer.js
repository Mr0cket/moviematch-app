import { FETCHED_LIKED_MOVIES, FETCHED_MATCHES } from "./actions";

const initialState = { matches: [], liked: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_MATCHES: {
      return { ...state, matches: action.payload };
    }
    case FETCHED_LIKED_MOVIES: {
      return { ...state, liked: action.payload };
    }
    default:
      return state;
  }
};
