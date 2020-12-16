import { combineReducers } from 'redux';
import goAdvReducer from './goAdvReducer';

const reducers = {
   goAdvStore:goAdvReducer
};

const rootReducer = combineReducers(reducers);
export default rootReducer;


