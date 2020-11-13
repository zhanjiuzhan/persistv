<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ drawerTitle }}</h3>
      <div class="drawer-item">
        <span>{{ showLogoText }}</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>{{ fixedHeaderText }}</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>{{ enableTagViewsText }}</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>{{ showSettingButtonText }}</span>
        <el-switch v-model="settingBtn" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>{{ menuUniqueOpened }}</span>
        <el-switch v-model="uniqueOpened" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',

  data () {
    return {
      drawerTitle: '系统布局配置',
      showLogoText: '显示 Logo',
      fixedHeaderText: '固定 Header',
      enableTagViewsText: '开启 Tags-Views',
      showSettingButtonText: '显示 SettingButton',
      menuUniqueOpened: '菜单 UniqueOpened'
    }
  },

  computed: {
    fixedHeader: {
      get () {
        return this.$store.state.settings.fixedHeader
      },
      set (val) {
        this.$store.dispatch('changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    },
    settingBtn: {
      get() {
        return this.$store.state.settings.settingBtn
      },
      set(val) {
        this.$store.dispatch('changeSetting', {
          key: 'settingBtn',
          value: val
        })
      }
    },
    uniqueOpened: {
      get() {
        return this.$store.state.settings.uniqueOpened
      },
      set(val) {
        this.$store.dispatch('changeSetting', {
          key: 'uniqueOpened',
          value: val
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85)
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65)
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
