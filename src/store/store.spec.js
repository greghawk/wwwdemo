import * as ActionTypes from '../constants/actionTypes';
import configureStore from './configureStore';

describe('Store', () => {

  it('should add a new factory', () => {
    const store = configureStore();

    const actions = [
      { type: ActionTypes.ADD_FACTORY, newFactory: { id: '1', name: 'new', upperbound: '10', lowerbound: '1', childcount: '4', errors:[]}},
      // { type: ActionTypes.EDIT_FACTORY, currentFactoryId: 1 },
      // { type: ActionTypes.UPDATE_FACTORY, newFactory: factory},
      // { type: ActionTypes.RESET_CURRENT_FACTORY, newFactory: factory },
      // { type: ActionTypes.PROCESS_ERRORS,newFactory: factory },
      // { type: ActionTypes.SYNCH_CURRENT_FACTORY, newFactory: factory }
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState().tree.root.children[0];
    const expected = { id: '1', name: 'new', upperbound: '10', lowerbound: '1', childcount: '4', errors:[]};

    expect(actual).toEqual(expected);
  });

  it('should update an existing factory', () => {
    const store = configureStore();

    const actions = [
      { type: ActionTypes.ADD_FACTORY, newFactory: { id: '1', name: 'new', upperbound: '10', lowerbound: '1', childcount: '4', errors:[]}},
      { type: ActionTypes.UPDATE_FACTORY, newFactory: { id: '1', name: 'name2', upperbound: '100', lowerbound: '1', childcount: '14', errors:[]}},

    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState().tree.root.children[0];
    const expected = { id: '1', name: 'name2', upperbound: '100', lowerbound: '1', childcount: '14', errors:[]};

    expect(actual).toEqual(expected);
  });

  // it('should update an existing factory', () => {
  //   const store = configureStore();
  //
  //   const actions = [
  //     { type: ActionTypes.ADD_FACTORY, newFactory: { id: '1', name: 'new', upperbound: '10', lowerbound: '1', childcount: '4', errors:[]}},
  //     { type: ActionTypes.UPDATE_FACTORY, newFactory: { id: '1', name: 'name2', upperbound: '100', lowerbound: '1', childcount: '14', errors:[]}},
  //
  //   ];
  //   actions.forEach(action => store.dispatch(action));
  //
  //   const actual = store.getState().tree.root.children[0];
  //   const expected = { id: '1', name: 'name2', upperbound: '100', lowerbound: '1', childcount: '14', errors:[]};
  //
  //   expect(actual).toEqual(expected);
  // });
});

