import { routerMap } from '@/router/routers'
import { getMenu } from '@/api/menu'
import { SessionStorageUtil } from '../../utils/sessionStorageUtil'

const state = {
  permission_routers: routerMap,
  addRouters: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.permission_routers = routerMap.concat(routers)
  },
  GENERATE_ROUTERS: (state, originRouter) => {
    const router = originRouter.map(router => adaptMenuTree(router))
    state.permission_routers = routerMap.concat(router)
    state.addRouters = router
  }
}

const actions = {
  setRouters({ commit }, asyncRouter) {
    commit('SET_ROUTERS', asyncRouter)
  },
  generateRouters({ commit }) {
    return new Promise((resolve, reject) => {
      const sessionStorage = new SessionStorageUtil()
      const { id } = JSON.parse(sessionStorage.getItem('userInfo'))
      getMenu(id).then(originRouter => {
        commit('GENERATE_ROUTERS', originRouter.menus)
        resolve(originRouter)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const adaptMenuTree = (menuTree) => {
  const { path, component, menuName: name, menuType, visible, icon, childrenNode: children } = menuTree
  const routers = {
    path,
    name,
    component: importComponent(component),
    meta: { icon, title: name, noCache: true },
    alwaysShow: menuType.toLowerCase() === 'm',
    hidden: !visible
  }
  if (menuType.toLowerCase() === 'm') {
    routers.path = `/${path}`
    routers.redirect = path
    routers.children = children.map(child => adaptMenuTree(child))
  }
  return routers
}

const importComponent = (componentPath) => {
  if (!componentPath) return () => import('@/layout')
  return () => import(`@/views/${componentPath}`)
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
