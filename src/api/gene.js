import request from '@/utils/request'

export const getGene = (params) => {
  return request.get('/sys/gene/page', { params })
}

export const getAnalyseInfo = (id) => {
  return request.get(`/sys/gene/${id}`)
}

export const saveBaseInfo = (experimentName, sampleId, data) => {
  const headers = { 'Content-Type': 'multipart/form-data' }
  return request.post(`/sys/gene/${experimentName}/${sampleId}`, data, { headers })
}

export const getQualityControlInfo = (experimentName, sampleId) => {
  return request.get(`/sys/gene/qc/${experimentName}/${sampleId}`)
}

export const exportReportBatch = (experimentName, params) => {
  return request.get(`/sys/gene/exportReport/${experimentName}`, { params, responseType: 'blob' })
}
