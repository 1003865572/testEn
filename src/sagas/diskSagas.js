import { call, put, takeLatest, fork } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { callApi } from '../services/api'
import * as ActionTypes from '../actionTypes/diskTypes'
import * as schema from '../actions/schema'

function* fetchDisks() {
  yield put({ type: ActionTypes.disk.DISK_GET_REQUEST })
  try {
    const json = yield call(callApi, 'getDisk', 'GET')
    const result = normalize(json, schema.arrayOfDisks)
    yield put({ type: ActionTypes.disk.DISK_GET_SUCCEEDED, ...{ result } })
  } catch (e) {
    yield put({ type: ActionTypes.disk.DISK_GET_FAILED, message: e.message })
  }
}

function* saveDisk(data) {
  yield put({ type: ActionTypes.disk.DISK_SAVE_REQUEST })
  console.info(data.resolve)
  try {
    console.info('开始执行')
    const json = yield call(callApi, 'insertDisk', 'POST', data.data)
    const result = normalize(json, schema.arrayOfDisks)
    yield put({ type: ActionTypes.disk.DISK_SAVE_SUCCEEDED, ...{ result } })
    yield data.resolve()
  } catch (e) {
    yield put({ type: ActionTypes.disk.DISK_SAVE_FAILED, message: e.message })
    yield data.reject()
  }
}

function* deleteDisk(data) {
  yield put({ type: ActionTypes.disk.DISK_DEL_REQUEST })
  try {
    const json = yield call(callApi, 'deleteDisk', 'POST', {id: data.id})
    const result = normalize(json, schema.arrayOfDisks)
    yield put({ type: ActionTypes.disk.DISK_DEL_SUCCEEDED, ...{ result } })
    yield data.resolve()
  } catch (e) {
    yield put({ type: ActionTypes.disk.DISK_DEL_FAILED, message: e.message })
    yield data.reject()
  }
}

function* getEntity(data){
  // 查询
  yield put({ type: ActionTypes.disk.DISK_GET_ENTITY_REQUEST })
  try {
    const json = yield call(callApi, 'getEntity', "POST", { id: data.id })
    yield put({ type: ActionTypes.disk.DISK_GET_ENTITY_SUCCEEDED, ...{ entity: json.result[0] } })
    yield data.resolve(json.result[0])
  } catch (e) {
    yield put({ type: ActionTypes.disk.DISK_GET_ENTITY_FAILED, message: e.message })
    yield data.reject()
  }
}

function* updateDisk(data) {
  // 修改
  yield put({ type: ActionTypes.disk.DISK_UPDATE_REQUEST })
  try {
    console.info(data)
    const json = yield call(callApi, 'insertDisk', 'POST', data.disk)
    yield put({ type: ActionTypes.disk.DISK_UPDATE_SUCCEEDED })
    yield data.resolve(json)
  } catch (e) {
    yield put({ type: ActionTypes.disk.DISK_UPDATE_FAILED, message: e.message })
    yield data.reject()
  }
}

function* fetchWatcher() {
  yield takeLatest(ActionTypes.disk.DISK_GET_REQUESTED, fetchDisks)
  yield takeLatest(ActionTypes.disk.DISK_SAVE_REQUESTED, saveDisk)
  yield takeLatest(ActionTypes.disk.DISK_DEL_REQUESTED, deleteDisk)
  yield takeLatest(ActionTypes.disk.DISK_GET_ENTITY_REQUESTED, getEntity)
  yield takeLatest(ActionTypes.disk.DISK_UPDATE_REQUESTED, updateDisk)
}

function* diskSaga() {
  const sagas = []
  sagas.push(fork(fetchWatcher))
  yield sagas
}

export default diskSaga
