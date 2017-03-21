import {combineReducers} from 'redux'

function generateEntityVerbReducer (entityActionType, verb) {
  return function entityVerbReducerImpl (state = {}, action) {
    switch (action.type) {
      case entityActionType[verb].SUCCESS:
        return Object.assign({}, state, {req: action.req}, {result: action.res}, {error: null})
      case entityActionType[verb].FAILURE:
        return Object.assign({}, state, {req: action.req.url}, {error: action.error})
      default:
        return state
    }
  }
}

function generateEntityReducer (entityActionType, otherReducers = {}) {
  let reducers = {}
  let verbs = ['LIST', 'UPDATE', 'DEL', 'DETAIL', 'CREATE']
  verbs.forEach(verb => (reducers[verb.toLowerCase()] = generateEntityVerbReducer(entityActionType, verb)))
  return combineReducers(Object.assign({}, reducers, otherReducers))
}

const reducer = (state = {login: false}, action) => {
  return state
}

export {generateEntityReducer}
export default reducer
