import request from '@/utils/request'

export function setRole(data) {
  return request.post('/sys/user-role', data)
}

export function getRole(userId) {
  return request.get(`/sys/user-role/${userId}`)
}

export function getAllRole(params) {
  return request.get('/sys/role/all', { params })
}

export function getRoleList(params) {
  return request.get('/sys/role/page', { params })
}
