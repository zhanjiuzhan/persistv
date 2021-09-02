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
        prop="operatorName"
        label="操作人"
      />
      <el-table-column
        prop="roles"
        label="角色"
      />
      <el-table-column
        label="操作状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status===0" class="text-success">正常</div>
          <div v-else-if="scope.row.status===1" class="text-success">异常</div>
        </template>
      </el-table-column>
      <el-table-column
        label="业务类型"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.businessType===0">其他</div>
          <div v-else-if="scope.row.businessType===1">新增</div>
          <div v-else-if="scope.row.businessType===2">修改</div>
          <div v-else-if="scope.row.businessType===3">删除</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="操作内容"
      />
      <el-table-column
        prop="updateTime"
        label="操作时间"
      />
      <el-table-column
        prop="operatorLocation"
        label="位置"
      />
      <el-table-column
        prop="operatorIp"
        label="IP"
      />
      <el-table-column
        label="操作"
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
      this.url = '/sys/operatorlog/page'
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
