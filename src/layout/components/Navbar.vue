<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="Avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/center">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <span style="display:block" @click="showRegistryInfo">
            <el-dropdown-item>
              激活状态
            </el-dropdown-item>
          </span>
          <span style="display:block" @click="logout">
            <el-dropdown-item divide>
              退出登录
            </el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
      <LicenseInfoDialog/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import eventBus from '@/utils/eventBus'
import LicenseInfoDialog from '@/components/LicenseInfoDialog'
import { getActivate } from '@/api/strategy'
export default {
  name: 'Navbar',

  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    LicenseInfoDialog
  },

  data () {
    return {
      Avatar: require('@/assets/avatar/pre_avatar.png'),
      dialogVisible: false,
      textFullScreen: '全屏'
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'user',
      'baseApi'
    ]),
    show: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },

  methods: {
    showRegistryInfo () {
      getActivate().then(res => {
        if (!res) {
          this.$message({
            message: '激活异常',
            type: 'error'
          })
          this.$store.dispatch('logout').then(() => {
            location.replace('/login')
          })
        } else {
          eventBus.$emit('showLicenseInfo', res)
        }
      }).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
    },
    logout () {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('logout').then(() => {
          location.replace('/login')
        })
      })
    },
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px;
  border-bottom: 1px ridge #c8c8c8;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    dispaly: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursro: pointer;
          positon: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

</style>
