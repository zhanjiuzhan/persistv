<template>
  <el-menu-item v-if="sidebarLogo" :class="{'submenu-title-noDropdown':isCollapse}" index="0" style="pointer-events: none;">
    <svg-icon v-if="isCollapse" icon-class="run" />
    <div class="logo-icon">
      <img :src="logoImg">
      <span slot="title">{{ logoText }}</span>
    </div>
  </el-menu-item>
</template>

<script>
import logoImg from '@/assets/logo/logo.png'
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',

  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      logoImg,
      logoText: '『PERSIST』用户管理系统'
    }
  },

  computed: {
    ...mapGetters([
      'sidebarLogo'
    ])
  }
}
</script>
