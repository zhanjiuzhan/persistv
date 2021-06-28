import request from '@/utils/request'

export function addUser (data) {
  return request.post('/sys/user', data)
}

export function getUserList (params) {
  return request.get('/sys/user/page', params)
}

export function changePwd (data) {
  return request.put('/sys/user/pwd', data)
}

export function restPwd (id) {
  return request.put(`/sys/user/pwd/${id}`)
}

export function updateUserInfo (id, data) {
  return request.put(`/sys/user/${id}`, data)
}

export function deleteUser (id) {
  return request.delete(`/sys/user/${id}`)
}
