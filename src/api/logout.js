import request from '@/utils/request'

export const logout = (data) => {
  return request.post('/sys/oauth/logout', data)
}
