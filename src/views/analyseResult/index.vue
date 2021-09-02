<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input placeholder="请输入查询的受验者编号" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQuery()" />
          </el-input>
          <el-button size="small" icon="el-icon-search" type="primary" @click="search">搜素</el-button>
        </div>
        <div class="tools">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="startAnalyse()">开始分析</el-button>
        </div>
      </div>
      <!-- 自定义折叠面板 -->
      <div class="table-container">
        <List>
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-edit" type="primary" @click="previewHandler(scope.row)">编辑</el-button>
          </template>
        </List>
      </div>
      <Modal/>
    </el-scrollbar>
  </div>
</template>

<script>
import templateSrc from '@/config/pdfTemplate/analyseResultTemplate.html'
import List from './List'
import Modal from './Modal'
import eventBus from '../../utils/eventBus'

export default {
  name: 'AnalyseResult',

  components: { List, Modal },

  data() {
    return {
      templateSrc,
      results: [
        {
          subjectNumber: 'Sample000001',
          subjectResult: '阳性'
        },
        {
          subjectNumber: 'Sample000002',
          subjectResult: '阴性'
        }
      ],
      resultsDetailDialogVisible: false
    }
  },

  methods: {
    previewHandler(rowData) {
      eventBus.$emit('previewData')
    },
    search() {
      this.$message({
        message: '该功能持续开发中！',
        type: 'warning'
      })
    },
    startAnalyse() {
      this.$message({
        message: '该功能持续开发中！',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
