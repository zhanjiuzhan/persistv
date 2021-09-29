<template>
  <div>
    <el-table
      v-loading="loading"
      id="userInfoTable"
      :data="data"
      border
      class="persist-table"
      row-key="id"
    >
      <el-table-column
        prop="sampleId"
        label="受检者编号"
      />
      <el-table-column
        prop="clazz"
        label="检测结果"
      />
      <el-table-column
        label="分析状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status === 1" class="text-success">分析成功</div>
          <div v-else class="text-failure">分析失败</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        prop="updateTime"
        label="更新时间"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
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
import eventBus from '@/utils/eventBus'
import initData from '@/mixins/initData'

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
      this.url = '/sys/gene/page'
      this.params = {
        current: this.current,
        size: this.size,
        pages: this.pages,
        total: this.total,
        experimentName: this.$route.params.testName
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
