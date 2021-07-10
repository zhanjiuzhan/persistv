import request from '@/utils/request'

export const initData = (url, params) => {
  return request.get(url, { params })
}
