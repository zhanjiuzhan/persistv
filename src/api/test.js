import request from '@/utils/request'

export function test(param) {
  return request({
    url: 'test/' + param,
    method: 'get'
  })
}
