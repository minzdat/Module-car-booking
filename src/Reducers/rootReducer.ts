import { combineReducers } from 'redux';
import { requestReducer } from './requestReducer';

export const rootReducer = combineReducers({
    request: requestReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
