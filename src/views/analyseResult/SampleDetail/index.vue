<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input placeholder="请输入查询的样本编号" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQuery()" />
          </el-input>
          <el-button size="small" icon="el-icon-search" type="primary" @click="search">搜素</el-button>
        </div>
        <!-- T.B.D : 多样本生成报告的文件长啥样 --->
        <!--        <div class="tools">-->
        <!--          <el-button type="primary" size="small" icon="el-icon-plus" @click="startAnalyse()">开始分析</el-button>-->
        <!--        </div>-->
      </div>
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
import List from './List'
import Modal from './Modal'
import eventBus from '../../../utils/eventBus'

export default {
  name: 'SampleDetail',

  components: { List, Modal },

  methods: {
    clearQuery() {
      console.log('clear')
    },
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

<style scoped>

</style>
