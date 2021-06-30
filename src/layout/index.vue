<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutSide"/>
    <sidebar />
    <div :class="{hasTagView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar/>
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <div v-if="$store.state.settings.showFooter" id="el-main-foot">
        <span v-html="$store.state.settings.footerTxt" />
      </div>
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { mapState } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'

export default {
  name: 'Layout',

  components: {
    AppMain,
    Navbar,
    Settings,
    Sidebar,
    TagsView,
    RightPanel
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
        openSidebar: this.sidebar.opened,
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

<style lang="scss" scoped>
.app-wrapper {
  //@include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .main-container {
    background-color:$--main-background-color;

    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      background: #ffffff;
      z-index: 99;
      width: calc(100% - #{$--sidebar-width});
      height: 90px;
      transition: width 0.28s;
      box-shadow: 1px 1px 7px 0px #c8c8c8;
    }

    #el-main-foot {
      position: fixed;
      bottom: 0;
      padding: 0 20px;
      height: 30px;
      width: 100%;
      background-color:$--second-backgroud-color;
      font-size: 14px;
      line-height: 30px;
      box-shadow: 2px -2px 7px #c8c8c8;
    }
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.hideSidebar .main-container .fixed-header {
  width: calc(100% - 36px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
