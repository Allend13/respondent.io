import {API_URL, API_CALL} from '../constants'

//method - request type
//endpoint - where to send request
//entity - endpoint url
//payload - request data or params(handle it in saga)

export function apiCall(method, endpoint, entity, payload = {}) {
  return {
    type: API_CALL,
    entity: entity,
    method: method,
    url: API_URL + endpoint,
    payload: payload
  }
}