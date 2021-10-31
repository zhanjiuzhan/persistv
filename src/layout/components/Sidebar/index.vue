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
        <el-menu-item ref="menu-item" @click="visible = !visible">
          <el-popover
            v-model="visible"
            placement="bottom"
            title="关于"
            width="150"
            trigger="manual"
          >
            <div>软件版本V1.0</div>
            <div>完整版本V1.0.0</div>
            <Item slot="reference" icon="info" title="关于"/>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
import Logo from './Logo'
import Item from './Item'
export default {
  name: 'Sidebar',

  components: { SidebarItem, Logo, Item },

  data() {
    return {
      visible: false
    }
  },

  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'uniqueOpened'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },

  mounted() {
    const element = this.$refs['menu-item'].$el
    element.onblur = () => {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.scrollbar-wrapper {
  height: calc(100% - 50px);
}
</style>
