import { axios } from '@/api/axios'

export function getAllNode() {
  return axios.get("/node/all")
}

export function addNode (config ,amount) {
  return axios.post(`/node/add/${amount}`, config)
}

export function deleteNode (id) {
  return axios.post(`/node/delete/${id}`)
}

export function start () {
  return axios.get(`/node/start`)
}

export function reset () {
  return axios.get(`/node/reset`)
}

export function clear(){
  return axios.get(`/node/clear`)
}
