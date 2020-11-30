import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value: permissionRoles } = binding
    const hasPermission = checkPermission(permissionRoles)
    !hasPermission && el.parentNode && el.parentNode.removeChild(el)
  }
}

function checkPermission(values) {
  if (values && Array.isArray(values) && values.length > 0) {
    const roles = store.getters && store.getters.roles
    return roles.some(role => values.includes(role))
  }
  console.log(`need roles! Like v-permission="['admin','editor']"`)
  return false
}
