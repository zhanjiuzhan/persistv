<template>
  <div class="page-content" v-loading="loading">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input v-model="experimentName" placeholder="请输入查询的实验名称" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQuery()" />
          </el-input>
          <el-select v-model="experimentStatus" :clearable="true" class="query-input">
            <el-option label="未分析" value="0"/>
            <el-option label="正在分析" value="1"/>
            <el-option label="分析完成" value="2"/>
            <el-option label="分析异常" value="-1"/>
          </el-select>
          <el-button size="small" icon="el-icon-search" type="primary" @click="search">搜素</el-button>
        </div>
      </div>
      <div class="table-container">
        <List>
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.status === 1 || scope.row.status === 2"
              size="small"
              icon="el-icon-pie-chart"
              type="primary"
              @click="analyse(scope.row)">
              {{ scope.row.status !== -1 ? '批分析' : '重新分析' }}
            </el-button>
          </template>
        </List>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import List from './List'
import eventBus from '@/utils/eventBus'
import { executeAnalyse } from '../../api/experimentInfo'

export default {
  name: 'AnalyseResult',

  components: { List },

  data() {
    return {
      loading: false,
      experimentName: '',
      experimentStatus: ''
    }
  },

  methods: {
    clearQuery() {
      this.experimentName = ''
      eventBus.$emit('reloadExperimentList')
    },
    search() {
      const queryData = {}
      if (this.experimentName) {
        queryData['name'] = this.experimentName
      }
      if (this.experimentStatus !== undefined) {
        queryData['status'] = this.experimentStatus
      }
      eventBus.$emit('queryExperiment', queryData)
    },
    analyse(row) {
      this.loading = true
      executeAnalyse(row.name)
        .then(() => {
          eventBus.$emit('reloadExperimentList')
        })
        .catch(error => {
          this.$message({
            message: error.message,
            type: 'error'
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
