import request from '@/utils/request'

export const getExperimentInfo = (params) => {
  return request.get('/sys/experiment-info/page', { params })
}

export const executeAnalyse = (name) => {
  return request.put(`/sys/experiment-info/${name}`)
}
