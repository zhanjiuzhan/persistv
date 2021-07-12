import request from '@/utils/request'

export function getMenu (id) {
  return request.get(`sys/user/menus/${id}`)
}

export function getAllMenu () {
  return request.get('sys/menu/all')
}

export function getRoleMenu (roleId) {
  return request.get(`/sys/role-menu/${roleId}`)
}

export function setRoleMenu (data) {
  return request.post('/sys/role-menu', data)
}
