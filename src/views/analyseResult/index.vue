<template>
  <div class="page-content" v-loading="loading">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input v-model="experimentName" placeholder="请输入查询的实验名称" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQuery()" />
          </el-input>
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
              批分析
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
      experimentName: ''
    }
  },

  methods: {
    clearQuery() {
      this.experimentName = ''
      eventBus.$emit('reloadList')
    },
    previewHandler(rowData) {
      eventBus.$emit('previewData')
    },
    search() {
      eventBus.$emit('query', { name: this.experimentName })
    },
    analyse(row) {
      this.loading = true
      executeAnalyse(row.name)
        .then(() => {
          eventBus.$emit('reloadList')
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
