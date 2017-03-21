import * as ActionTypes from '../actionTypes/diskTypes'

const initialState = {
  entity:{
    id: 1,
    firstName: 1,
    lastName: 1
  },
  entities: {
    di_0: {
      'firstName': '11',
      'lastName': '22'
    },
    di_1: {
      'firstName': '33',
      'lastName': '44'
    }
  },
  ids: [
    'di_0',
    'di_1',
  ],
  startRequest: 'end',
  errorMessage: ''
}

const diskReduer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.disk.DISK_GET_REQUESTED:
      return {...state}
    case ActionTypes.disk.DISK_GET_REQUEST:
      state.startRequest = 'loading'
      return {...state}
    case ActionTypes.disk.DISK_GET_SUCCEEDED:
      const { result, entities } = action.result
      state.ids = result
      state.entities = entities.disk
      return {...state}
    case ActionTypes.disk.DISK_GET_ENTITY_SUCCEEDED:
      state.entity = action.entity
      return { ...state}
    default:
      return state
  }
}

export default diskReduer
