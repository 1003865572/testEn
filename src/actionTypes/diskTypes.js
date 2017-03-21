const types = [
  'GET',
  'GET_ENTITY',
  'SAVE',
  'DEL',
  'UPDATE'
]
/*
  增

  删
  改
  查
*/



const requestType = [
  'REQUESTED',
  'REQUEST',
  'SUCCEEDED',
  'FAILED'
]

export const disk = {}

types.forEach(type =>
  requestType.forEach(status =>
    (disk[`DISK_${type}_${status}`] = `DISK_${type}_${status}`))
)

export default { disk }
