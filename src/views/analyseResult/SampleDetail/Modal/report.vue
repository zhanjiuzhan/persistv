<template>
  <el-scrollbar v-loading="loading" class="scrollbar-wrapper">
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
              <el-input v-model="detectionInfo.baseInfo.ID" class="editInfo"/>
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
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
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
            <th>氯胺酸变异</th>
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
  </el-scrollbar>
</template>

<script>
import { getAnalyseInfo, saveBaseInfo } from '../../../../api/gene'
import eventBus from '../../../../utils/eventBus'

export default {
  name: 'Report',

  data() {
    return {
      loading: false,
      subjectInfoTitle: '受验者信息',
      sampleInfoTitle: '样本信息',
      geneDetectionResultTitle: '基因检测结果',
      detectionInfo: {
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
          ID: '',
          clinicalDiagnosis: '',
          sampleType: '',
          samplingTime: ''
        }
      }
    }
  },

  created() {
    eventBus.$on('saveBaseInfo', this.saveInfo)
  },

  destroyed() {
    eventBus.$off('saveBaseInfo', this.saveInfo)
  },

  methods: {
    init(formData) {
      this.loading = true
      getAnalyseInfo(formData.id)
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
              ID: '',
              clinicalDiagnosis: '',
              sampleType: '',
              samplingTime: ''
            }
          }
          this.detectionInfo = res
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
    saveInfo() {
      saveBaseInfo(this.detectionInfo.sampleId, this.detectionInfo.baseInfo).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-wrapper {
  height: calc(100vh - 400px);
}
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
</style>
