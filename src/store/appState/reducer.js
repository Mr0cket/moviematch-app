import { APP_LOADING, APP_DONE_LOADING, ERROR } from "./actions";

const initialState = {
  loading: false,
  error: null,
  calledBy: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true, calledBy: action.payload };

    case APP_DONE_LOADING:
      return { ...state, loading: false, calledBy: null };

    case ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
