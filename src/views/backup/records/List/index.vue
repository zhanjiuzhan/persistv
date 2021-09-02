<template>
  <div>
    <el-table
      v-loading="loading"
      id="backupRecordsTable"
      :data="data"
      border
      class="persist-table"
      row-key="id"
    >
      <el-table-column
        prop="backupFilename"
        label="文件名"
      />
      <el-table-column
        prop="updateTime"
        label="时间"
      />
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <slot :row="scope.row"/>
        </template>
      </el-table-column>
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
      this.url = '/sys/db-backup-record/page'
      this.params = {
        current: this.current,
        size: this.size,
        page: this.pages,
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
