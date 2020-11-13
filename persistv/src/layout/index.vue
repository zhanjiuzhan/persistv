<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutSide"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div :class="{hasTagView:needTagView}" class="main-container">
      <div :class="{'fix-header':fixedHeader}">
        <navbar/>
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
import { AppMain, Navbar, Settings, Sidebar, TagView } from './components/AppMain'
export default {
  name: 'Layout',

  components: {
    AppMain

  },

  mixins: [ResizeMixin],

  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opedn,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },

  methods: {
    handleClickOutSide() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style scoped>

</style>
