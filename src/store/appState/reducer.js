import { APP_LOADING, APP_DONE_LOADING } from "./actions";

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true, calledBy: action.payload };

    case APP_DONE_LOADING:
      return { ...state, loading: false, calledBy: null };

    default:
      return state;
  }
};
