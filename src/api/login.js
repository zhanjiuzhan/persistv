import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/v1/login',
    method: 'post',
    data
  })
}

export function validCode () {
  return request.get('/sys/captcha')
}
