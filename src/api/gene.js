import request from '@/utils/request'

export const getGene = (params) => {
  return request.get('/sys/gene/page', { params })
}

export const getAnalyseInfo = (id) => {
  return request.get(`/sys/gene/${id}`)
}

export const saveBaseInfo = (sampleId, data) => {
  return request.post(`/sys/gene/${sampleId}`, data)
}
