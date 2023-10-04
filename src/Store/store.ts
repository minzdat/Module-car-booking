import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../Reducers/rootReducer";
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));