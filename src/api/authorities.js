import request from '@/utils/request'

export function getAuthorities (params) {
  return request.get('/sys/authorities/all', params)
}
