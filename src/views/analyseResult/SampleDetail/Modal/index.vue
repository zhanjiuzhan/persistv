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
      <el-button @click="saveInfo">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import eventBus from '@/utils/eventBus'
import Report from './report'
import templateSrc from '@/config/pdfTemplate/analyseResultTemplate.html'
import { parseTime } from '@/utils'

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
    previewData(rowData) {
      this.visible = true
      setTimeout(() => {
        const report = this.$refs.report
        if (report && report.init) {
          report.init(rowData)
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
        document.body.removeChild(iframe)
      }
    },
    fillData(printDoc, docData) {
      const { baseInfo, geneInfos, sampleId, clazz } = docData.detectionInfo
      Object.keys(baseInfo).forEach(key => {
        if (baseInfo[key]) {
          printDoc.querySelector(`#${key}`).textContent = baseInfo[key]
        }
      })
      printDoc.querySelector(`#sampleId`).textContent = sampleId
      geneInfos.forEach(info => {
        const trNode = printDoc.querySelector('#resultPlaceholder')
        const geneNameNode = printDoc.createElement('td')
        const transcriptNode = printDoc.createElement('td')
        const hgvsCNode = printDoc.createElement('td')
        const hgvsPNode = printDoc.createElement('td')
        const clazzNode = printDoc.createElement('td')
        trNode.appendChild(geneNameNode)
        trNode.appendChild(transcriptNode)
        trNode.appendChild(hgvsCNode)
        trNode.appendChild(hgvsPNode)
        trNode.appendChild(clazzNode)
        geneNameNode.textContent = info.geneName || ''
        transcriptNode.textContent = info.transcript || ''
        hgvsCNode.textContent = info.hgvsC || ''
        hgvsPNode.textContent = info.hgvsP || ''
        clazzNode.textContent = info.clazz || ''
      })
      printDoc.querySelector(`#clazz`).textContent = clazz
      printDoc.querySelector('#signTime').textContent = parseTime(new Date())
    },
    saveInfo() {
      eventBus.$emit('saveBaseInfo', [this.visible, this.loading])
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
