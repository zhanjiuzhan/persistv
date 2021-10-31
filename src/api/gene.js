import request from '@/utils/request'

export const getGene = (params) => {
  return request.get('/sys/gene/page', { params })
}

export const getAnalyseInfo = (id) => {
  return request.get(`/sys/gene/${id}`)
}

export const saveBaseInfo = (sampleId, data) => {
  const headers = { 'Content-Type': 'multipart/form-data' }
  return request.post(`/sys/gene/${sampleId}`, data, { headers })
}

export const getQualityControlInfo = (experimentName, sampleId) => {
  return request.get(`/sys/gene/qc/${experimentName}/${sampleId}`)
}

export const exportReportBatch = (params) => {
  const headers = {
    'Content-Type': 'application/json; application/octet-stream'
  }
  return request.get('/sys/gene/exportReport', { params, headers, responseType: 'blob' })
}
