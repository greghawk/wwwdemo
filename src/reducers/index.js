import { combineReducers } from 'redux';
import tree from './treeReducer';

const rootReducer = combineReducers({
  tree,
});

export default rootReducer;
