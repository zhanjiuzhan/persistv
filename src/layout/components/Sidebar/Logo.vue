<template>
  <div v-if="sidebarLogo" :class="{'submenu-title-noDropdown':isCollapse}" class="logo-icon">
    <img :src="logoImg">
  </div>
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
      logoImg
    }
  },

  computed: {
    ...mapGetters([
      'sidebarLogo'
    ])
  }
}
</script>

<style lang="scss" scoped>
.logo-icon {
  overflow: hidden;
  object-fit: contain;

  & > img {
    width: 100%;
    padding: 10px 20px;
  }
}
</style>
