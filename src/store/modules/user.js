import { login } from '@/api/login'
import {
  setToken,
  setRefreshToken,
  getToken,
  removeToken,
  removeRefreshToken
} from '@/utils/auth'
import { SessionStorageUtil } from '../../utils/sessionStorageUtil'
import { logout } from '../../api/logout'
import { Message } from 'element-ui'

const state = {
  user: {},
  roles: [],
  loadMenus: false,
  currentTimer: null,
  whiteList: []
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
  },
  UPDATE_CURRENT_TIME: (state, currentTimer) => {
    state.currentTimer = currentTimer
  },
  UPDATE_WHITE_LIST: (state, whiteList) => {
    const list = state.whiteList
    whiteList.forEach(item => {
      if (!list.includes(item)) {
        list.push(item)
      }
    })
    state.whiteList = [...list]
  }
}

const actions = {
  login(store, userInfo) {
    // todo: 用户点击登录后，提示正在登录，按钮开始loading，所有可以输入的项目需要禁止输入
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        const { accessToken, expireTime, refreshToken, userInfo } = res
        setToken(accessToken, expireTime)
        setRefreshToken(refreshToken)
        const sessionUtil = new SessionStorageUtil()
        // todo: 取得用户信息
        sessionUtil.setItem('userInfo', JSON.stringify(userInfo))
        // todo: 取得用户权限
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      const sessionUtil = new SessionStorageUtil()
      const data = {
        accessToken: getToken(),
        userId: JSON.parse(sessionUtil.getItem('userInfo')).id
      }
      logout(data).then(res => {
        sessionUtil.removeItem('userInfo')
        removeRefreshToken()
        removeToken()
        resolve()
      }).catch(error => reject(error))
    })
  },

  updateLoadMenus({ commit }, reload) {
    return new Promise((resolve) => {
      commit('SET_LOAD_MENUS', reload)
      resolve(reload)
    })
  },

  checkCurrentTime({ commit, getters, dispatch }, skip) {
    let currentTimer = getters.currentTimer
    if (currentTimer) clearTimeout(currentTimer)
    if (!skip) {
      currentTimer = setTimeout(() => {
        Message({
          message: '页面会话超时请重新登录',
          type: 'warning'
        })
        dispatch('logout').then(() => {
          location.reload()
        })
      }, getters.logoutInterval * 1000 * 30)
      commit('UPDATE_CURRENT_TIME', currentTimer)
    }
  },

  updateWhiteList({ commit }, whiteList) {
    commit('UPDATE_WHITE_LIST', whiteList)
  }
}

export default {
  state,
  actions,
  mutations
}
