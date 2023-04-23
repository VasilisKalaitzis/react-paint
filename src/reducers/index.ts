import { combineReducers } from 'redux';
import { shapeReducer } from './shapeReducer';
import { toolReducer } from './toolReducer';

export const rootReducer = combineReducers({
  shapes: shapeReducer,
  tools: toolReducer,
});
