
import { postReducer } from './postsReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    properties: postReducer
})