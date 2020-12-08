import { getToken } from '@/utils/auth'
// import { encrypt } from "@/utils/rsaEncrypt";
import { login } from '@/api/login'

const state = {
  token: getToken(),
  user: {},
  roles: [],
  loadMenus: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_LOAD_MENUS: (state, loadMenus) => {
    state.loadMenus = loadMenus
  }
}

const actions = {
  login({ commit }, userInfo) {
    // const { userName, password, rememberMe } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        debugger
        console.log(res)
      })
    })
  },

  getInfo({ commit }) {

  },

  logout({ commit }) {

  },

  updateLoadMenus({ commit }) {

  }
}

// const logoutMethod = (commit) => {
//   commit('SET_TOKEN', '')
//   commit('SET_ROLES', [])
//   removeToken()
// }
//
// const setUserInfo = (res, commit) => {
//   if (res.roles.length === 0) {
//     commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
//   } else {
//     commit('SET_ROLES', res.roles)
//   }
//   commit('SET_USER', res)
// }

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
