import request from '@/utils/request'

export function getMenu (id) {
  return request.get(`sys/user/menus/${id}`)
}

export function getAllMenu () {
  return request.get('sys/menu/all')
}
