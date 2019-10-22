import { axios } from '@/api/axios'

export function getMaxValue () {
  return axios.get('/statistic/value/max')
}

export function getMinValue () {
  return axios.get('/statistic/value/min')
}

export function getMaxRound () {
  return axios.get('/statistic/round/max')
}

export function getMinRound () {
  return axios.get('/statistic/round/min')
}

export function getMean () {
  return axios.get('/statistic/mean')
}

export function getMse (correct) {
  return axios.get(`/statistic/mse/${correct}`)
}

export function getDecay () {
  return axios.get(`/statistic/decay`)
}

export function save (correct) {
  return axios.get(`/statistic/save/${correct}`)
}

export function getAllRecords () {
  return axios.get(`/statistic/record/all`)
}

export function getMeanRound () {
  return axios.get(`/statistic/round/mean`)
}

export function Export (data) {
  return axios.post(`/statistic/export`, data)
}
