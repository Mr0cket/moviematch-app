import { createStore, applyMiddleware, compose } from "redux";

import ReduxThunk from "redux-thunk";
import reducer from "./rootReducer";

const composeEnhancers = window ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const store = createStore(reducer, enhancer);

export default store;
