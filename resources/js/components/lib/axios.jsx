import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://localhost:8008/',
  // baseURL: 'https://jsonplaceholder.typicode.com/',
})

export const postMethod = async (
  methodName,
  params
) => {
  return client.post(methodName, params)
}