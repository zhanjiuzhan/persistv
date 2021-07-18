const getters = {
  size: state => state.app.size,
  device: state => state.app.device,
  sidebar: state => state.app.sidebar,
  permission_routers: state => state.routers.permission_routers,
  addRouters: state => state.routers.addRouters,
  logoutInterval: state => state.routers.logoutInterval,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  roles: state => state.user.roles,
  user: state => state.user.user,
  loadMenus: state => state.user.loadMenus,
  theme: state => state.settings.theme,
  showSettings: state => state.settings.showSettings,
  tagsView: state => state.settings.tagsView,
  fixedHeader: state => state.settings.fixedHeader,
  sidebarLogo: state => state.settings.sidebarLogo,
  uniqueOpened: state => state.settings.uniqueOpened,
  showFooter: state => state.settings.showFooter,
  footerTxt: state => state.settings.footerTxt,
  caseNumber: state => state.settings.caseNumber
}

export default getters
