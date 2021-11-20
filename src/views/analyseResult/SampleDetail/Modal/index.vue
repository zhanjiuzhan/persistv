<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :destroy-on-close="false"
    width="50%"
    class="persist-dialog"
  >
    <el-scrollbar v-loading.lock="loading" class="scrollbar-wrapper">
      <Report v-if="editable===true" ref="report" :detection-info="detectionInfo" :fill-data="fillData" />
      <div v-else class="previewContainer">
        <img :src="imageUrl" :width="a4Size[0]">
      </div>
    </el-scrollbar>
    <div slot="footer" class="persit-dialog-footer">
      <el-button v-if="editable===false" type="primary" icon="el-icon-download" @click="download()">下载</el-button>
      <el-button v-if="editable===false" type="primary" icon="el-icon-printer" @click="printFile()">打印</el-button>
      <el-button v-if="editable===true" @click="visible=false">取消</el-button>
      <el-button v-if="editable===true" @click="saveInfo">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import eventBus from '@/utils/eventBus'
import Report from './report'
import templateSrc from '@/config/pdfTemplate/analyseResultTemplate.html'
import { parseTime } from '@/utils'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { getAnalyseInfo } from '../../../../api/gene'

export default {
  name: 'Modal',

  components: { Report },

  data() {
    return {
      a4Size: [595.28, 841.89],
      loading: false,
      visible: false,
      dialogTitle: '人类BRCA1/BRCA2基因突变检测报告单',
      reportData: {},
      editable: false,
      imageUrl: '',
      detectionInfo: {
        sampleId: '',
        geneInfos: [
          {
            geneName: 'ND',
            transcript: 'ND',
            hgvsC: 'ND',
            hgvsP: 'ND',
            clazz: 'ND'
          }
        ],
        clazz: '',
        baseInfo: {
          name: '',
          gender: '',
          age: '',
          hospital: '',
          department: '',
          id: '',
          clinicalDiagnosis: '',
          sampleType: '',
          samplingTime: '',
          inspector: '',
          reporter: '',
          reviewer: '',
          reportDate: ''
        }
      }
    }
  },

  created() {
    eventBus.$on('previewData', this.previewData)
  },

  destroyed() {
    eventBus.$off('previewData', this.previewData)
  },

  methods: {
    init(id) {
      this.loading = true
      return getAnalyseInfo(id)
        .then(res => {
          if (!res.geneInfos) {
            res.geneInfos = []
          }
          if (!res.baseInfo) {
            res.baseInfo = {
              name: '',
              gender: '',
              age: '',
              hospital: '',
              department: '',
              id: '',
              clinicalDiagnosis: '',
              sampleType: '',
              samplingTime: '',
              reportDate: ''
            }
          }
          this.detectionInfo = Object.assign(
            this.detectionInfo,
            res
          )
          return res
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
    },
    previewData(rowData, editable) {
      this.visible = true
      this.editable = editable
      this.loading = true
      this.init(rowData.id).then(() => {
        if (!editable) {
          const iframe = document.createElement('iframe')
          document.body.appendChild(iframe)
          const win = iframe.contentWindow
          win.document.body.innerHTML = templateSrc
          this.fillData(win.document, this.detectionInfo)
          return html2canvas(win.document.body).then(canvas => {
            this.imageUrl = canvas.toDataURL('image/png')
            document.body.removeChild(iframe)
          })
        }
      }).catch((error) => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    download() {
      const iframe = document.createElement('iframe')
      document.body.appendChild(iframe)
      const win = iframe.contentWindow
      win.document.body.innerHTML = templateSrc
      this.fillData(win.document, this.detectionInfo)
      html2canvas(win.document.body).then(canvas => {
        const imageUrl = canvas.toDataURL('image/png')
        const pdf = new JsPDF('p', 'pt', this.a4Size)
        const [width, height] = this.a4Size
        pdf.addImage(imageUrl, 'PNG', 0, 0, width, height)
        pdf.save(`${this.detectionInfo.sampleId}__${parseTime(new Date(), '_')}.pdf`)
        document.body.removeChild(iframe)
      })
    },
    printFile() {
      const iframe = document.createElement('iframe')
      document.body.appendChild(iframe)
      const win = iframe.contentWindow
      win.document.body.innerHTML = templateSrc
      this.fillData(win.document, this.detectionInfo)
      win.print()
      document.body.removeChild(iframe)
    },
    fillData(printDoc, data) {
      const { baseInfo, geneInfos, sampleId, clazz } = data
      Object.keys(baseInfo).forEach(key => {
        if (baseInfo[key] && baseInfo[key] !== 'null') {
          printDoc.querySelector(`#${key}`).textContent = baseInfo[key]
        }
      })
      printDoc.querySelector(`#sampleId`).textContent = sampleId
      geneInfos.forEach(info => {
        const parentDom = printDoc.querySelector('#resultTable tbody')
        const insertTarget = printDoc.querySelector('#resultPlaceholder')
        const trNode = printDoc.createElement('tr')
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
        parentDom.insertBefore(trNode, insertTarget)
      })
      printDoc.querySelector(`#clazz`).textContent = clazz
    },
    saveInfo() {
      eventBus.$emit('saveBaseInfo', this)
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-wrapper {
  height: calc(100vh - 400px);

  .previewContainer {
    overflow-y: auto;
    height: auto;
    display: flex;
    justify-content: center;
  }
}
</style>
