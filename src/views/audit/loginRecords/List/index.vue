<template>
  <div>
    <el-table
      v-loading="loading"
      id="auditRecordsTable"
      :data="data"
      border
      row-key="id"
      class="persist-table"
    >
      <el-table-column
        prop="userName"
        label="登录用户"
      />
      <el-table-column
        prop="status"
        label="登录状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status===1" class="text-success">成功</div>
          <div v-else-if="scope.row.status===0" class="text-failure">失败</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="os"
        label="操作系统"
      />
      <el-table-column
        prop="msg"
        label="提示消息"
      />
      <el-table-column
        prop="createTime"
        label="登录/退出时间"
      />
      <el-table-column
        prop="ipAddress"
        label="ip地址"
      />
    </el-table>
    <el-pagination
      :page-size="size"
      :current-page.sync="current"
      :total="total"
      :page-sizes="sizeList"
      layout="total, prev, pager, next, sizes"
      class="persist-pagination"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import initData from '@/mixins/initData'
import eventBus from '@/utils/eventBus'

export default {
  name: 'List',

  mixins: [initData],

  created() {
    this.$nextTick(() => {
      this.init()
    })
    eventBus.$on('reloadList', this.init)
    eventBus.$on('query', this.search)
  },

  destroyed() {
    eventBus.$off('reloadList', this.init)
    eventBus.$off('query', this.search)
  },

  methods: {
    init() {
      this.url = '/sys/loginlog/page'
      this.params = {
        current: this.current,
        size: this.size,
        pages: this.pages,
        total: this.total
      }
    },
    search(query) {
      this.query = query
    }
  }
}
</script>

<style scoped>

</style>
