import { APP_LOADING, APP_DONE_LOADING, ERROR, SET_MESSAGE, CLEAR_MESSAGE } from "./actions";

const initialState = {
  loading: false,
  message: null,
  calledBy: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true, calledBy: action.payload };

    case APP_DONE_LOADING:
      return { ...state, loading: false, calledBy: null };
    case ERROR: {
      return { ...state, message: action.payload };
    }
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    case CLEAR_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
};
