<template>
  <el-dialog
    v-loading.lock="loading"
    :title="dialogTitle"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :destroy-on-close="false"
    class="persist-dialog"
    width="50%">
    <Report ref="report"/>
    <div slot="footer" class="persit-dialog-footer">
      <el-button type="primary" icon="el-icon-printer" @click="printFile()">打印</el-button>
      <el-button @click="visible=false">取消</el-button>
      <el-button @click="visible=false">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import eventBus from '../../../../utils/eventBus'
import Report from './report'
import templateSrc from '@/config/pdfTemplate/analyseResultTemplate.html'

export default {
  name: 'Modal',

  components: { Report },

  data() {
    return {
      loading: false,
      visible: false,
      dialogTitle: '人类BRCA1/BRCA2基因突变检测报告单',
      reportData: {}
    }
  },

  created() {
    eventBus.$on('previewData', this.previewData)
  },

  destroyed() {
    eventBus.$off('previewData', this.previewData)
  },

  methods: {
    previewData() {
      this.visible = true
      setTimeout(() => {
        const report = this.$refs.report
        if (report && report.init) {
          report.init()
        }
      })
    },
    printFile() {
      const report = this.$refs.report
      if (report && report.init) {
        const iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        const win = iframe.contentWindow
        const content = templateSrc
        win.document.body.innerHTML = content
        const data = this.$refs.report
        this.fillData(win.document, data)
        win.print()
      }
    },
    fillData(printDoc, docData) {
      const data = docData.formData
      Object.keys(data).forEach(key => {
        if (data[key]) {
          printDoc.querySelector(`#${key}`).textContent = data[key]
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
