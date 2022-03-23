import axios, { AxiosRequestConfig, Method } from 'axios'
import { addTrailingSlash, removeTrailingSlash } from './utils'

export class ApiErrorEvent extends Event {
  nonFieldErrors: string[] = []
}

const addSlash = true

async function request (method: Method, url: string, config?: AxiosRequestConfig) {
  if (!config) config = {}
  if (!config.headers) config.headers = {}
  if (localStorage.auth) config.headers.Authorization = 'JWT ' + localStorage.auth
  url = addSlash ? addTrailingSlash(url) : removeTrailingSlash(url)

  let response = null

  try {
    response = await axios.request({ url, method, ...config })
    return response
  } catch (e) {
    if (e.response?.status === 400) {
      const nonFieldErrors = e.response?.data?.errors?.non_field_errors
      if (nonFieldErrors) {
        const event = new ApiErrorEvent('400 Non Field Errors')
        event.nonFieldErrors = nonFieldErrors
        window.dispatchEvent(event)
      }
      return e.response
    }
    if (e.response?.status === 401) window.dispatchEvent(new Event('401 Unauthorized'))
    throw e
  }
}

async function get (url: string, config?: AxiosRequestConfig) {
  return request('GET', url, config)
}

async function post (url: string, data?: any, config?: AxiosRequestConfig) {
  return request('POST', url, {
    data,
    ...config
  })
}

async function put (url: string, data?: any, config?: AxiosRequestConfig) {
  return request('PUT', url, {
    data,
    ...config
  })
}

async function remove (url: string, config?: AxiosRequestConfig) {
  return request('DELETE', url, config)
}

export default { get, post, put, delete: remove }
