<template>
  <el-dialog
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
      a4Size: [595.28 * 4 / 3, 841.89 * 4 / 3],
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
          reportName: 'BRCA1/BRCA2',
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
    eventBus.$off('previewData')
    eventBus.$on('previewData', this.previewData)
  },

  destroyed() {
    eventBus.$off('previewData')
  },

  methods: {
    init(id, sampleName) {
      this.loading = true
      return getAnalyseInfo(id)
        .then(res => {
          res['sampleName'] = sampleName
          if (!res.geneInfos || res.geneInfos.length === 0) {
            res.geneInfos = [
              {
                geneName: 'ND',
                transcript: 'ND',
                hgvsC: 'ND',
                hgvsP: 'ND',
                clazz: 'ND'
              }
            ]
          }
          if (!res.baseInfo) {
            res.baseInfo = {
              reportName: 'BRCA1/BRCA2',
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
      this.init(rowData.id, rowData.sampleId).then(() => {
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
      this.loading = true
      const iframe = document.createElement('iframe')
      document.body.appendChild(iframe)
      const win = iframe.contentWindow
      win.document.body.innerHTML = templateSrc
      this.fillData(win.document, this.detectionInfo)
      const pdf = new JsPDF('p', 'px', this.a4Size)
      const width = 680
      const offsetLeft = (this.a4Size[0] - width) / 2
      const elementFragments = this.producePagination(win.document.body)
      const promiseList = []
      let pageIndex = 1
      const totalPage = elementFragments.length
      pdf.text(`${pageIndex} / ${totalPage}`, this.a4Size[0] / 2, this.a4Size[1] - 10)
      elementFragments.forEach(fragment => {
        fragment.contentElements.forEach(content => {
          promiseList.push(new Promise((resolve) => {
            html2canvas(content.element).then(canvas => {
              const imageUrl = canvas.toDataURL('image/png')
              if (content.page) {
                pdf.addPage()
                pageIndex++
                pdf.text(`${pageIndex} / ${totalPage}`, this.a4Size[0] / 2, this.a4Size[1] - 10)
              }
              pdf.addImage(imageUrl, 'PNG', offsetLeft, content.offset, width, content.height)
              resolve()
            })
          }))
        })
      })
      Promise.all(promiseList).then(() => {
        pdf.save(`${this.detectionInfo.sampleId}__${parseTime(new Date(), '_')}.pdf`)
        this.loading = false
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
        trNode.classList.add('row-flag')
        geneNameNode.textContent = info.geneName || ''
        transcriptNode.textContent = info.transcript || ''
        hgvsCNode.textContent = info.hgvsC || ''
        hgvsPNode.textContent = info.hgvsP || ''
        clazzNode.textContent = info.clazz || ''
        parentDom.insertBefore(trNode, insertTarget)
      })
      printDoc.querySelector(`#clazz`).textContent = clazz
    },
    producePagination(contentElement) {
      const marginTop = 20
      const marginBottom = 20
      let offsetStart = marginTop
      const pageHeight = 1123 - marginTop - marginBottom
      const rowHeight = 43
      const varRowList = contentElement.querySelectorAll('.row-flag')
      const bottomTextRowHeight = 25

      const pageContent = [{
        contentElements: [
          {
            element: contentElement.querySelector('.title'),
            offset: offsetStart += 10,
            height: 32
          },
          {
            element: contentElement.querySelectorAll('.content h4')[0],
            offset: offsetStart += 42,
            height: 20
          },
          {
            element: contentElement.querySelectorAll('.content table')[0],
            offset: offsetStart += 40,
            height: 173
          },
          {
            element: contentElement.querySelectorAll('.content h4')[1],
            offset: offsetStart += 193,
            height: 20
          },
          {
            element: contentElement.querySelectorAll('.content table')[1],
            offset: offsetStart += 40,
            height: 105
          },
          {
            element: contentElement.querySelectorAll('.content h4')[2],
            offset: offsetStart += 125,
            height: 20
          },
          {
            element: contentElement.querySelectorAll('#resultTable tr')[0],
            offset: offsetStart += 40,
            height: rowHeight
          }
        ]
      }]

      let height = offsetStart
      let page = 0
      for (let rowIndex = 0; rowIndex < varRowList.length; rowIndex++) {
        height += rowHeight
        if (pageHeight - height >= rowHeight) {
          pageContent[page].contentElements.push({
            element: varRowList[rowIndex],
            offset: height,
            height: rowHeight
          })
        } else {
          page++
          height = marginTop
          const element = varRowList[rowIndex]
          element.style.borderTop = '2px solid #2c2c2c'
          pageContent[page] = {
            contentElements: [
              {
                element: element,
                offset: height,
                height: rowHeight,
                page: true
              }
            ]
          }
        }
      }

      if (pageHeight - height >= rowHeight + 20) {
        pageContent[page].contentElements.push({
          element: contentElement.querySelector('#resultTable tr:last-child'),
          offset: height += rowHeight,
          height: rowHeight
        })
      } else {
        page++
        height = marginTop
        pageContent[page] = {
          contentElements: [
            {
              element: contentElement.querySelector('#resultTable tr:last-child'),
              offset: height,
              height: rowHeight,
              page: true
            }
          ]
        }
      }

      if (pageHeight - height >= 20) {
        pageContent[page].contentElements.push({
          element: contentElement.querySelector('#notice'),
          offset: height += rowHeight,
          height: 20
        })
      } else {
        page++
        height = marginTop
        pageContent[page] = {
          contentElements: [
            {
              element: contentElement.querySelector('#notice'),
              offset: height,
              height: 20,
              page: true
            }
          ]
        }
      }

      if (pageHeight - height >= bottomTextRowHeight * 3) {
        pageContent[page].contentElements.push({
          element: contentElement.querySelector('.description'),
          offset: pageHeight + marginTop - bottomTextRowHeight * 3 - 30,
          height: bottomTextRowHeight
        })
        pageContent[page].contentElements.push({
          element: contentElement.querySelector('.signPosition'),
          offset: pageHeight + marginTop - bottomTextRowHeight - 30,
          height: bottomTextRowHeight,
          end: true
        })
      } else if (pageHeight - height >= bottomTextRowHeight) {
        page++
        height = marginTop
        pageContent[page] = {
          contentElements: [
            {
              element: contentElement.querySelector('.description'),
              offset: height,
              height: bottomTextRowHeight,
              page: true
            }
          ]
        }
        pageContent[page].contentElements.push({
          element: contentElement.querySelector('.signPosition'),
          offset: height += bottomTextRowHeight * 2,
          height: bottomTextRowHeight,
        })
      }
      return pageContent
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
