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
      <el-button type="primary" icon=" cel-icon-download" @click="downloadFile()">下载</el-button>
      <el-button type="primary" icon="el-icon-printer" @click="printFile()">打印</el-button>
      <el-button @click="visible=false">取消</el-button>
      <el-button @click="visible=false">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import eventBus from '../../../utils/eventBus'
import Report from './report'

export default {
  name: 'Modal',

  components: { Report },

  data() {
    return {
      loading: false,
      visible: false,
      dialogTitle: '人类BRCA1/BRCA2基因突变检测报告单'
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
    downloadFile() {
      console.log('download file')
    },
    printFile() {
      const report = this.$refs.report
      if (report && report.init) {
        const iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        const win = iframe.contentWindow
        const content = report.$el.querySelector('.resultContent').innerHTML
        win.document.body.innerHTML = content
        win.print()
      }
    }
  }
}
</script>

<style scoped>

</style>
