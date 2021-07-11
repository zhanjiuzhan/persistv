import request from '@/utils/request'

export const getStrategy = () => {
  return request.get('sys/security-strategy')
}

export const setStrategy = (data) => {
  return request.post('sys/security-strategy', data)
}
