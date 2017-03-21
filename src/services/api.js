import fetch from 'isomorphic-fetch'
import { API_ROOT } from '../config'

const commonHeader = {
  'Content-Type': 'application/json'
}

function callApi(endpoint, method, body = '', isformData = false) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  // const fullUrl = API_ROOT + endpoint
  const params = []
  params.mode = 'cors'
  params.method = method
  if (method === 'POST' || method === 'PUT') {
    if (isformData === false) {
      params.body = JSON.stringify(body)
      params.headers = commonHeader
    } else {
      params.body = body
    }
  }
  if (method === 'DELETE') {
    params.headers = commonHeader
  }
  return fetch(fullUrl, params).then(
      (response) => {
        if (method === 'DELETE' && response.status === 204) {
          const json = {}
          return Promise.resolve({ json, response })
        }
        return response.json().then((json) => {
          return { json, response }
        })
      }
    ).then(
      ({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        if (method === 'DELETE' && response.status === 204) {
          return Promise.resolve({ success: true })
        }
        return json
      },
      (error) => {
        console.log(error)
      }
    )
}

export { callApi }
export default { callApi }
