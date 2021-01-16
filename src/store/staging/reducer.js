const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_MOVIES: {
      return [...state, ...action.payload];
    }
    default:
      return state;
  }
};
