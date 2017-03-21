import * as ActionTypes from '../actionTypes/diskTypes'

export const getDisks = () => ({
  type: ActionTypes.disk.DISK_GET_REQUESTED
})

export const saveDisk = (data, resolve, reject) => ({
  type: ActionTypes.disk.DISK_SAVE_REQUESTED,
  data,
  resolve,
  reject
})

export const deleteDisk = (id, resolve, reject) => ({
  type: ActionTypes.disk.DISK_DEL_REQUESTED,
  id,
  resolve,
  reject
})

export const getEntity = (id, resolve, reject) => ({
  type: ActionTypes.disk.DISK_GET_ENTITY_REQUESTED,
  id,
  resolve,
  reject
})

export const updateDisk = (disk, resolve, reject) => ({
  type: ActionTypes.disk.DISK_UPDATE_REQUESTED,
  disk,
  resolve,
  reject
})
