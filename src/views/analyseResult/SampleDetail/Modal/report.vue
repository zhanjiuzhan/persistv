<template>
  <div>
    <div class="resultContent">
      <!--      <el-row id="titleInfo">-->
      <!--        <el-col :span="3">-->
      <!--          <label>标题</label>-->
      <!--        </el-col>-->
      <!--        <el-col :span="8">-->
      <!--          <el-select class="editReportInfo" v-model="detectionInfo.baseInfo.reportName">-->
      <!--            <el-option-->
      <!--              v-for="item in titleList"-->
      <!--              :key="item.value"-->
      <!--              :label="item.label"-->
      <!--              :value="item.value">-->
      <!--            </el-option>-->
      <!--          </el-select>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <!-- 受验者信息--->
      <el-row id="titleInfo">
        <el-col>
          <h4>人类 BRCA1/BRCA2 基因突变检测报告单</h4>
        </el-col>
      </el-row>
      <div id="subjectInfo">
        <h4>{{ subjectInfoTitle }}</h4>
        <table>
          <tr>
            <th>受验者编号</th>
            <td>{{ detectionInfo.sampleId }}</td>
            <th>姓名</th>
            <td>
              <el-input v-model="detectionInfo.baseInfo.name" class="editInfo"/>
            </td>
          </tr>
          <tr>
            <th>性别</th>
            <td>
              <el-select v-model="detectionInfo.baseInfo.gender" class="editInfo">
                <el-option label="男" value="男"/>
                <el-option label="女" value="女"/>
              </el-select>
            </td>
            <th>年龄</th>
            <td>
              <el-input v-model="detectionInfo.baseInfo.age" class="editInfo"/>
            </td>
          </tr>
          <tr>
            <th>送检医院</th>
            <td>
              <el-input v-model="detectionInfo.baseInfo.hospital" class="editInfo"/>
            </td>
            <th>送检科室</th>
            <td>
              <el-input v-model="detectionInfo.baseInfo.department" class="editInfo"/>
            </td>
          </tr>
          <tr>
            <th>院内识别唯一编号（如住院号、病历号等）</th>
            <td>
              <el-input v-model="detectionInfo.baseInfo.id" class="editInfo"/>
            </td>
            <th>临床诊断</th>
            <td>
              <el-input v-model="detectionInfo.baseInfo.clinicalDiagnosis" class="editInfo"/>
            </td>
          </tr>
        </table>
      </div>
      <!--样本信息--->
      <div id="sampleInfo">
        <h4>{{ sampleInfoTitle }}</h4>
        <table>
          <tr>
            <th>
              样本类型
            </th>
            <th>
              采样时间
            </th>
          </tr>
          <tr>
            <td>
              <el-input v-model="detectionInfo.baseInfo.sampleType" class="editInfo"/>
            </td>
            <td>
              <el-date-picker
                v-model="detectionInfo.baseInfo.samplingTime"
                type="date"
                value-format="yyyy-MM-dd"
                class="editInfo"
                style="width: 100%"
              />
            </td>
          </tr>
        </table>
      </div>
      <div class="geneDetectionResult">
        <!--基因检测结果--->
        <h4>{{ geneDetectionResultTitle }}</h4>
        <table>
          <tr>
            <th>基因</th>
            <th>转录本</th>
            <th>核苷酸变异</th>
            <th>氨基酸变异</th>
            <th>变异分类</th>
          </tr>
          <template v-for="(item, index) in detectionInfo.geneInfos">
            <tr :key="index">
              <td>{{ item.geneName }}</td>
              <td>{{ item.transcript }}</td>
              <td>{{ item.hgvsC }}</td>
              <td>{{ item.hgvsP }}</td>
              <td>{{ item.clazz }}</td>
            </tr>
          </template>
          <tr>
            <td colspan="3">检测结果</td>
            <td colspan="2">{{ detectionInfo.clazz }}</td>
          </tr>
        </table>
      </div>
    </div>
    <el-row :gutter="10" class="editReportInfoRow">
      <el-col :span="3">
        <label>报告日期</label>
      </el-col>
      <el-col :span="9">
        <el-date-picker
          v-model="detectionInfo.baseInfo.reportDate"
          type="date"
          class="editReportInfo"
          value-format="yyyy-MM-dd"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="3">
        <label>检测人</label>
      </el-col>
      <el-col :span="9">
        <el-input v-model="detectionInfo.baseInfo.inspector" type="text" class="editReportInfo" placeholder="请输入检测人" maxlength="10" show-word-limit/>
      </el-col>
    </el-row>
    <el-row :gutter="8" class="editReportInfoRow">
      <el-col :span="3">
        <label>报告人</label>
      </el-col>
      <el-col :span="9">
        <el-input v-model="detectionInfo.baseInfo.reporter" type="text" class="editReportInfo" placeholder="请输入报告人" maxlength="10" show-word-limit/>
      </el-col>
      <el-col :span="3">
        <label>审核人</label>
      </el-col>
      <el-col :span="9">
        <el-input v-model="detectionInfo.baseInfo.reviewer" type="text" class="editReportInfo" placeholder="请输入审核人" maxlength="10" show-word-limit/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { saveBaseInfo } from '@/api/gene'
import eventBus from '@/utils/eventBus'
import templateSrc from '@/config/pdfTemplate/analyseResultTemplate.html'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  name: 'Report',

  props: {
    fillData: {
      type: Function,
      default: () => {}
    },
    detectionInfo: {
      type: Object,
      default: () => ({
        sampleName: '',
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
      })
    }
  },

  data() {
    return {
      a4Size: [595.28 * 4 / 3, 841.89 * 4 / 3],
      loading: false,
      subjectInfoTitle: '受验者信息',
      sampleInfoTitle: '样本信息',
      geneDetectionResultTitle: '基因检测结果',
      titleList: [
        { value: 'BRCA1/BRCA2/PALB2', label: '人类BRCA1/BRCA2/PALB2 基因突变检测报告单' },
        { value: 'BRCA1/BRCA2', label: '人类BRCA1/BRCA2 基因突变检测报告单' }
      ]
    }
  },

  created() {
    eventBus.$off('saveBaseInfo')
    eventBus.$on('saveBaseInfo', this.saveInfo)
  },

  destroyed() {
    eventBus.$off('saveBaseInfo')
  },

  methods: {
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

      if (pageHeight - height >= bottomTextRowHeight * 4) {
        pageContent[page].contentElements.push({
          element: contentElement.querySelector('.description'),
          offset: pageHeight + marginTop - bottomTextRowHeight * 4 - 30,
          height: bottomTextRowHeight
        })
        pageContent[page].contentElements.push({
          element: contentElement.querySelector('.signPosition'),
          offset: pageHeight + marginTop - bottomTextRowHeight * 2 - 30,
          height: bottomTextRowHeight * 2,
          end: true
        })
      } else if (pageHeight - height >= bottomTextRowHeight * 2) {
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
          height: bottomTextRowHeight * 2
        })
      }
      return pageContent
    },
    saveInfo(target) {
      target.loading = true
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
            html2canvas(content.element, {
              scale: window.devicePixelRatio * 2
            }).then(canvas => {
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
        document.body.removeChild(iframe)
        const fileName = this.detectionInfo.sampleId + '.pdf'
        const blob = pdf.output('blob')
        const file = new File([blob], fileName)
        const formData = new FormData()
        formData.append('reportFile', file)
        const baseInfo = this.detectionInfo.baseInfo
        Object.keys(this.detectionInfo.baseInfo).map(key => {
          if (baseInfo[key] && baseInfo[key] !== 'null') {
            formData.append(key, baseInfo[key])
          }
        })
        this.detectionInfo.baseInfo = formData
        return this.detectionInfo
      }).then(res => {
        return saveBaseInfo(res.sampleName, res.baseInfo)
      }).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      }).finally(() => {
        target.loading = false
        target.visible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.resultContent {
  padding-bottom: 17px;
}

.resultContent table {
  width: 100%;
  padding: 20px;
  text-align: center;
  word-break: break-word;
  white-space: break-spaces;
  font-size: 14px;
  border-collapse: collapse;
}

.resultContent table td, th {
  height: 40px;
  border: 1px solid #2c2c2c;
  border-collapse: collapse;
  max-width: 80px;

  .editInfo {
    /deep/ .el-input__inner {
      color: $--color-success!important;
    }
  }
}

.editReportInfoRow, #titleInfo {
  margin: 5px 0;
  display: flex;
  align-items: baseline;

  .editReportInfo {
    width: 100%;

    /deep/ .el-input__inner {
      border-color: #2c2c2c!important;
    }
  }
}
</style>
