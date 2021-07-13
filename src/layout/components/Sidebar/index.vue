<template>
  <div class="sidebar-container" >
    <Logo :is-collapse="isCollapse" />
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :unique-opened="uniqueOpened"
        mode="vertical"
        background-color="#34797f"
        text-color="#c8c8c8"
        active-text-color="#fa8072"
      >

        <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
import Logo from './Logo'
export default {
  name: 'Sidebar',

  components: { SidebarItem, Logo },

  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'uniqueOpened'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.scrollbar-wrapper {
  height: calc(100% - 50px);
}
</style>
