<template>
  <el-menu-item v-if="sidebarLogo" :class="{'submenu-title-noDropdown':isCollapse}" index="0" style="pointer-events: none;">
    <svg-icon v-if="isCollapse" icon-class="run" />
    <div class="logo-icon">
      <img :src="logoImg">
    </div>
  </el-menu-item>
</template>

<script>
import logoImg from '@/assets/logp/logo.png'
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',

  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },

  date() {
    return {
      logoImg: logoImg
    }
  },

  computed: {
    ...mapGetters([
      'sidebarLogo'
    ])
  }
}
</script>
