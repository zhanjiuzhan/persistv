import request from '@/utils/request'

export function login (data) {
  return request.post('/sys/oauth/login', data)
}

export function validCode () {
  return request.get('/sys/captcha')
}

export function refreshToken (data) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  return request.post('/sys/oauth/refresh', data, { headers })
}
