import * as types from '../constants/actionTypes';
import * as uuid from 'uuid';

export function updateFactory(currentFactory) {
  return (dispatch, getState) => {
    let factory = {
      id: currentFactory.id,
      name: currentFactory.name,
      upperbound: parseInt(currentFactory.upperbound),
      lowerbound: parseInt(currentFactory.lowerbound),
      childcount: parseInt(currentFactory.childcount),
      errors: [],
      randomChildren: []
    };

    const min = Math.ceil(factory.lowerbound);
    const max = Math.floor(factory.upperbound);

    let i = 0;
    do {
      let rando = Math.floor(Math.random() * (max - min + 1)) + min;

      if (!factory.randomChildren.includes(rando)) {
        factory.randomChildren.push(rando);
        i++;
      }
    }
    while (i < factory.childcount);
    factory.randomChildren.sort((a, b) => a - b);

    dispatch({
      type: types.UPDATE_FACTORY,
      newFactory: factory
    });
    dispatch(socketMessage(getState().tree.root))
  };
}

export function editFactory(factoryId) {
  return {
    type: types.EDIT_FACTORY,
    currentFactoryId: factoryId
  };
}

export function synchCurrentFactory(name, value) {
  return {
    type: types.SYNCH_CURRENT_FACTORY,
    name: name,
    value: value
  }
}

export function resetCurrentFactory() {
  return {
    type: types.RESET_CURRENT_FACTORY
  }
}

export function processErrors(errors) {
  return {
    type: types.PROCESS_ERRORS,
    errors: errors
  }
}

export function createFactory(currentFactory) {
  return (dispatch, getState) => {
    let factory = {
      id: uuid.v4(),
      name: currentFactory.name,
      upperbound: parseInt(currentFactory.upperbound),
      lowerbound: parseInt(currentFactory.lowerbound),
      childcount: parseInt(currentFactory.childcount),
      errors: [],
      randomChildren: []
    };

    const min = Math.ceil(factory.lowerbound);
    const max = Math.floor(factory.upperbound);

    let i = 0;
    do {
      let rando = Math.floor(Math.random() * (max - min + 1)) + min;

      if (!factory.randomChildren.includes(rando)) {
        factory.randomChildren.push(rando);
        i++;
      }
    }
    while (i < factory.childcount);
    factory.randomChildren.sort((a, b) => a - b);

    dispatch({
      type: types.ADD_FACTORY,
      newFactory: factory
    });
    dispatch(socketMessage(getState().tree.root))
  }
}

function socketMessage(data) {

  return {type: types.SOCKET_MESSAGE_OUT, data}
}

export function resetSystem() {
  return {
    type: types.SOCKET_MESSAGE_OUT, data: {children: []}
  }
}

