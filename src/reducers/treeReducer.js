import * as actions from '../constants/actionTypes';
import initialState from './initialState';
import iproduce from 'immer';

export default function treeReducer(state = initialState.tree, action) {
  let newState;
  let newFactory;

  switch (action.type) {
    case actions.ADD_FACTORY:
      return {
        ...state,
        root: {children: [...state.root.children, action.newFactory]}
      };

    case actions.UPDATE_FACTORY:
      newState = iproduce(state, draftState => {
        draftState.root.children[state.root.children.findIndex(el => el.id === action.newFactory.id)] = action.newFactory;
      });
      return newState;

    case actions.EDIT_FACTORY:
      newState = Object.assign({}, state);
      newState.currentFactory = state.root.children.find((child) => {
        return child.id === action.currentFactoryId
      });
      return newState;

    case actions.SYNCH_CURRENT_FACTORY:
      newState = Object.assign({}, state);
      newFactory = Object.assign({}, newState.currentFactory);
      newFactory[action.name] = action.value;
      newState.currentFactory = newFactory;
      return newState;

    case actions.RESET_CURRENT_FACTORY:
      newState = Object.assign({}, state);
      newFactory = Object.assign({}, newState.currentFactory);
      newState.currentFactory = initialState.tree.currentFactory;
      return newState;

    case actions.PROCESS_ERRORS:
      newState = iproduce(state, draftState => {
        draftState.currentFactory.errors = action.errors;
      });
      return newState;

    case actions.SOCKET_MESSAGE_OUT:
      return Object.assign({}, state,{root: action.data});

    case actions.SOCKET_MESSAGE_IN:
      return Object.assign({}, state,{root: action.data});

    default:
      return state;
  }
}
