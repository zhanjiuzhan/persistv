<template>
  <div>
    <div class="resultContent">
      <!-- 受验者信息--->
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
        <el-input v-model="detectionInfo.baseInfo.inspector" type="text" class="editReportInfo" placeholder="请输入检测人" maxlength="5" show-word-limit/>
      </el-col>
    </el-row>
    <el-row :gutter="8" class="editReportInfoRow">
      <el-col :span="3">
        <label>报告人</label>
      </el-col>
      <el-col :span="9">
        <el-input v-model="detectionInfo.baseInfo.reporter" type="text" class="editReportInfo" placeholder="请输入报告人" maxlength="5" show-word-limit/>
      </el-col>
      <el-col :span="3">
        <label>审核人</label>
      </el-col>
      <el-col :span="9">
        <el-input v-model="detectionInfo.baseInfo.reviewer" type="text" class="editReportInfo" placeholder="请输入审核人" maxlength="5" show-word-limit/>
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
import { parseTime } from '@/utils'

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
        sampleId: '',
        geneInfos: [
          {
            geneName: '',
            transcript: '',
            hgvsC: '',
            hgvsP: '',
            clazz: ''
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
      })
    }
  },

  data() {
    return {
      a4Size: [595.28, 841.89],
      loading: false,
      subjectInfoTitle: '受验者信息',
      sampleInfoTitle: '样本信息',
      geneDetectionResultTitle: '基因检测结果'
    }
  },

  created() {
    eventBus.$on('saveBaseInfo', this.saveInfo)
  },

  destroyed() {
    eventBus.$off('saveBaseInfo', this.saveInfo)
  },

  methods: {
    saveInfo(target) {
      target.loading = true
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
        const blob = pdf.output('blob')
        document.body.removeChild(iframe)
        debugger
        const fileName = this.detectionInfo.sampleId + '.pdf'
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
        return saveBaseInfo(res.sampleId, res.baseInfo)
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

.editReportInfoRow {
  margin: 5px 0;
  display: flex;
  align-items: baseline;

  .editReportInfo {
    /deep/ .el-input__inner {
      border-color: #2c2c2c!important;
    }
  }
}
</style>
