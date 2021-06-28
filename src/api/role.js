import request from '@/utils/request'

export function setRole (data) {
  return request.post('/sys/user-role',data)
}

export function getRole (userId) {
  return request.get(`/sys/user-role/${userId}`)
}
