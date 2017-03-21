import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import * as actions from './actions'
import * as api from '../../services/api'

function* callApi (apiCall,
                  requestAction,
                  action,
                  onSuccess = () => {},
                  onRejected = () => {}) {
  let req = requestAction.req
  try {
    // yield put(pendingAction)
    const result = yield call(apiCall, req)
    // yield call(onSuccess, result)
    yield call(onSuccess, result)
    yield put(action.success(req, result))
  } catch (error) {
    yield call(onRejected, error)
    yield put(action.failure(req, error))
  }
}

function GenerateSaga (entity, verb, entityAction, onSuccess, onRejected) {
  return function* sagaImpl (requestAction) {
    yield callApi(api.crud(entity)(verb), requestAction, entityAction[verb], onSuccess, onRejected)
  }
}

function GenerateSagaWatcher (entity, verb, entityActionType, entityAction, onSuccess, onRejected) {
  return function* sagaWatcherImpl () {
    while (true) {
      yield * takeLatest(entityActionType[verb].REQUEST, GenerateSaga(entity, verb, entityAction, onSuccess, onRejected))
    }
  }
}

function GenerateEntitySaga (entity, entityActionType, entityAction, successHandlers = {}, rejectedHandlers = {}) {
  return function* entitySagaImpl () {
    let sagas = []
    let verbs = ['LIST', 'UPDATE', 'DEL', 'DETAIL', 'CREATE']
    verbs.forEach(verb => {
      let onSuccess = () => {}
      let onRejected = () => {}
      if (successHandlers.hasOwnProperty(verb)) {
        onSuccess = successHandlers[verb]
      }
      if (rejectedHandlers.hasOwnProperty(verb)) {
        onRejected = rejectedHandlers[verb]
      }
      sagas.push(fork(GenerateSagaWatcher(entity, verb, entityActionType, entityAction, onSuccess, onRejected)))
    })
    yield sagas
  }
}

export {callApi, GenerateSagaWatcher, GenerateEntitySaga}
