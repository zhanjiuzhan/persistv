import { routerMap } from '@/router/routers'

const state = {
  permission_routers: routerMap,
  addRouters: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.permission_routers = routerMap.concat(routers)
  }
}

const actions = {
  setRouters({ commit }, asyncRouter) {
    commit('SET_ROUTERS', asyncRouter)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
