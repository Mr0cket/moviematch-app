import { FETCHED_MOVIES } from "../staging/actions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_MOVIES: {
      return state;
    }
    default:
      return state;
  }
};
