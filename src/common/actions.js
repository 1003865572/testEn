
import * as ActionTypes from './actionTypes'
import {LIST, DETAIL, CREATE, UPDATE, DEL} from './actionTypes'

function action (type, payload = {}) {
  return {type, ...payload}
}

function generateActionForCRUD (actionType) {
  const res = {};
  [LIST, DETAIL, CREATE, UPDATE, DEL].forEach(type => {
    res[type] = {
      request: (req) =>
        action(actionType[type].REQUEST, {req}),
      success: (req, res) =>
        action(actionType[type].SUCCESS, {req, res}),
      failure: (req, error) =>
        action(actionType[type].FAILURE, {req, error})
    }
  })
  return res
}

export {action, generateActionForCRUD}
