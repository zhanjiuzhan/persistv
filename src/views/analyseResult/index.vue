<template>
  <div class="page-content">
    <div class="tool-icon">
      <!-- 搜搜按钮 -->
      <!-- 操作按钮 -->
    </div>
    <!-- 自定义折叠面板 -->
    <div class="table-container">
      <el-table
        id="analyseResultTable"
        :data="results"
        border
        class="persist-table"
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
          width="100"
        >
          <template slot-scope="scope">
            <el-button size="small" @click="previewHandler(scope.row)" >预览</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="resultsDetailDialogVisible" title="检测详情">
      <iframe id="detailContentIframe" ref="detailContentIframe" width="595px" height="842px" style="border: none; width:100%; height: 900px; box-shadow: 2px 2px 8px grey"/>
      <el-button @click.native.prevent="print">打印</el-button>
    </el-dialog>
  </div>
</template>

<script>
import templateSrc from '@/config/pdfTemplate/analyseResultTemplate.html'
export default {
  name: 'AnalyseResult',

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
      resultsDetailDialogVisible: false,
    }
  },

  methods: {
    previewHandler(rowData) {
      this.resultsDetailDialogVisible = true
      setTimeout(() => {
        const iframe = this.$refs.detailContentIframe
        const win = iframe.contentWindow
        console.log(templateSrc)
        win.document.body.innerHTML = templateSrc.toString()
      })
    },
    print() {
      const iframe = this.$refs.detailContentIframe
      const win = iframe.contentWindow
      console.log(templateSrc)
      win.document.body.innerHTML = templateSrc.toString()
      win.print()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  overflow: auto;
  background-color: $--second-backgroud-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.table-container {
  position: relative;
  padding: 15px;
  width: 100%;
  height: 100%;
}
/deep/ .el-dialog__body {
  text-align: center;
}
</style>
