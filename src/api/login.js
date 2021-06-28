import request from '@/utils/request'

export function login (data) {
  return request.post('/sys/oauth/login', data)
}

export function validCode () {
  return request.get('/sys/captcha')
}

export function refreshToken (data) {
  return request.post('/sys/oauth/refresh', data)
}

export function logout (data) {
  return request.post('/sys/oauth/logout', data)
}
