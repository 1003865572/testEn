
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

const LIST = 'LIST'
const DETAIL = 'DETAIL'
const CREATE = 'CREATE'
const UPDATE = 'UPDATE'
const DEL = 'DEL'

function createRequestTypes (app, base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${app}_${base}_${type}`)
  return res
}

function createRequestTypesForCRUD (entity) {
  const res = {};
  [LIST, DETAIL, CREATE, UPDATE, DEL].forEach(type => res[type] = createRequestTypes(entity, type))
  return res
}

export {createRequestTypes, createRequestTypesForCRUD, LIST, DETAIL, CREATE, UPDATE, DEL}
