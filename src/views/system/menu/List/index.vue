<template>
  <el-table
    v-loading="loading"
    id="userInfoTable"
    :data="data"
    :tree-props="{children: 'childrenNode', hasChildren: 'hasChildren'}"
    border
    row-key="id"
    class="persist-table"
  >
    <el-table-column
      prop="menuName"
      label="菜单名"
    />
    <el-table-column
      prop="icon"
      label="图标"
    />
    <el-table-column
      prop="orderNum"
      label="排序"
    />
    <el-table-column
      prop="authorityMark"
      label="权限标识"
    />
    <el-table-column
      prop="component"
      label="组件路径"
    />
    <el-table-column
      prop="isFrame"
      label="外链"
    />
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <slot :row="scope.row"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getAllMenu } from '@/api/menu'
import eventBus from '@/utils/eventBus'

export default {
  name: 'List',

  data() {
    return {
      loading: false,
      data: []
    }
  },

  created() {
    this.$nextTick(() => {
      this.init()
    })
    eventBus.$on('reloadList', this.init)
  },

  destroyed() {
    eventBus.$off('reloadList', this.init)
  },

  methods: {
    init() {
      getAllMenu().then(res => {
        this.data = res
      })
    },
    search(query) {
      this.query = query
    }
  }
}
</script>

<style scoped>

</style>
