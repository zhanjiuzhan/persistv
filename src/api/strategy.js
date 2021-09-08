import request from '@/utils/request'

export const getStrategy = () => {
  return request.get('sys/security-strategy')
}

export const setStrategy = (data) => {
  return request.post('sys/security-strategy', data)
}

export const getActivate = () => {
  return request.get('/sys/security-license/activate')
}

export const registry = (data) => {
  const headers = { 'Content-Type': 'multipart/form-data' }
  return request.post('/sys/security-license/upload', data, { headers })
}

export const getUniqueCode = () => {
  return request.get('/sys/security-license/uniqueCode')
}
