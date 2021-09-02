<template>
  <div>
    <el-table
      v-loading="loading"
      id="userInfoTable"
      :data="data"
      border
      class="persist-table"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        prop="subjectNumber"
        label="受检者编号"
      />
      <el-table-column
        prop="subjectResult"
        label="检测结果"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
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
import eventBus from '../../../utils/eventBus'
import initData from '../../../mixins/initData'

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
      this.data = [
        {
          subjectNumber: 'Sample000001',
          subjectResult: '阳性'
        },
        {
          subjectNumber: 'Sample000002',
          subjectResult: '阴性'
        }
      ]
    },
    search(query) {
      this.query = query
    },
  }
}
</script>

<style scoped>

</style>
