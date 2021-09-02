import request from '@/utils/request'

export const getStrategy = () => {
  return request.get('sys/security-strategy')
}

export const setStrategy = (data) => {
  return request.post('sys/security-strategy', data)
}

export const getActivate = () => {
  return request.get('sys/security-strategy/activate')
}

export const registry = (data) => {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  return request.put('/sys/security-license', data, { headers })
}
