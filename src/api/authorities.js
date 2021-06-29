import request from '@/utils/request'

export function getAuthorities () {
  return request.get('/sys/oauth/publicKey')
}
