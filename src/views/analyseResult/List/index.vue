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
        label="实验名称（批次）"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.status=== 2"
            :to="{name: 'SampleDetail', params: {testName: scope.row.name }}"
            class="testLink">
            {{ scope.row.name }}
          </router-link>
          <div v-else>
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="分析状态"
      >

        <template slot-scope="scope">
          <div v-if="scope.row.status === 1" class="text-success">正在分析</div>
          <div v-else-if="scope.row.status === 2" class="text-info">分析完成</div>
          <div v-else-if="scope.row.status === -1" class="text-failure">分析异常</div>
          <div v-else-if="scope.row.status === 0" class="text-warning">未分析</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        label="开始时间"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.startTime">{{ scope.row.startTime }}</div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.endTime">{{ scope.row.endTime }}</div>
          <div v-else>-</div>
        </template>
      </el-table-column>
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
    eventBus.$off('reloadList')
    eventBus.$off('query')
    eventBus.$on('reloadList', this.init)
    eventBus.$on('query', this.search)
  },

  destroyed() {
    eventBus.$off('reloadList', this.init)
    eventBus.$off('query', this.search)
  },

  methods: {
    init() {
      this.url = '/sys/experiment-info/page'
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
a.testLink{
  color: #2151A3;
  text-decoration: underline!important;
}
</style>
