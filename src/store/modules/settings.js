import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/config'

const { tagsView, fixedHeader, sidebarLogo, uniqueOpened, showFooter, footerTxt, caseNumber } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: false,
  tagsView,
  fixedHeader,
  sidebarLogo,
  uniqueOpened,
  showFooter,
  footerTxt,
  caseNumber
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
