// import { encrypt } from "@/utils/rsaEncrypt";
import { login } from '@/api/login'
import {
  setToken,
  setRefreshToken,
  setExpireTime
} from '@/utils/auth'

const state = {
  user: {},
  roles: [],
  loadMenus: false
}

const mutations = {
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
    // todo: 用户点击登录后，提示正在登录，按钮开始loading，所有可以输入的项目需要禁止输入
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        const { accessToken, expireTime, refreshToken } = res
        setToken(accessToken)
        setExpireTime(expireTime)
        setRefreshToken(refreshToken)
        // todo: 取得用户信息
        // todo: 取得用户权限
        resolve()
      }).catch(error => {
        reject(error)
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
