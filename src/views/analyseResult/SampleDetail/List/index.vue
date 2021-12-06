<template>
  <div>
    <el-table
      v-loading="loading"
      id="userInfoTable"
      ref="userInfoTable"
      :data="data"
      border
      class="persist-table"
      row-key="id"
      @selection-change="changeSelect"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="样本名称"
        prop="sampleId"
      />
      <el-table-column
        label="受检者编号"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sampleName ? scope.row.sampleName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="clazz"
        label="检测结果"
        width="100"
      />
      <el-table-column
        label="分析状态"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status === 1" class="text-success">分析成功</div>
          <div v-else class="text-failure">分析失败</div>
        </template>
      </el-table-column>
      <el-table-column
        label="质控结果"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.qcStatus === 1" class="text-success">质控合格</div>
          <div v-else class="text-failure">质控不合格</div>
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
import eventBus from '@/utils/eventBus'
import initData from '@/mixins/initData'
import { exportReportBatch } from '../../../../api/gene'
import { downloadFile } from '../../../../utils'

export default {
  name: 'List',

  mixins: [initData],

  data() {
    return {
      selectIds: []
    }
  },

  created() {
    this.$nextTick(() => {
      this.init()
    })
    eventBus.$on('reloadList', this.init)
    eventBus.$on('query', this.search)
    eventBus.$on('exportBatch', this.export)
  },

  destroyed() {
    eventBus.$off('reloadList', this.init)
    eventBus.$off('query', this.search)
    eventBus.$off('exportBatch', this.export)
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
    },
    export() {
      const params = {
        sampleIds: this.selectIds.join(',')
      }
      const filename = this.$route.params.testName
      exportReportBatch(params).then(res => {
        downloadFile(res, filename, 'zip')
      }).catch((error) => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
    },
    changeSelect(selection) {
      this.selectIds = selection.map(_ => _.sampleId)
    }
  }
}
</script>

<style scoped>

</style>
