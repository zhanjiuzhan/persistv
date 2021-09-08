<template>
  <el-scrollbar class="scrollbar-wrapper">
    <div class="resultContent">
      <!-- 受验者信息--->
      <div id="subjectInfo">
        <h4>{{ subjectInfoTitle }}</h4>
        <table>
          <tr>
            <th>受验者编号</th>
            <td>{{ subjectNumber }}</td>
            <th>姓名</th>
            <td>
              <el-input v-model="formData.name" class="editInfo"/>
            </td>
          </tr>
          <tr>
            <th>性别</th>
            <td>
              <el-input v-model="formData.gender" class="editInfo"/>
            </td>
            <th>年龄</th>
            <td>
              <el-input v-model="formData.age" class="editInfo"/>
            </td>
          </tr>
          <tr>
            <th>送检医院</th>
            <td>
              <el-input v-model="formData.hospital" class="editInfo"/>
            </td>
            <th>送检科室</th>
            <td>
              <el-input v-model="formData.department" class="editInfo"/>
            </td>
          </tr>
          <tr>
            <th>院内识别唯一编号（如住院号、病历号等）</th>
            <td>
              <el-input v-model="formData.ID" class="editInfo"/>
            </td>
            <th>临床诊断</th>
            <td>
              <el-input v-model="formData.clinicalDiagnosis" class="editInfo"/>
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
              <el-input v-model="formData.sampleType" class="editInfo"/>
            </td>
            <td>
              <el-input v-model="formData.samplingTime" class="editInfo"/>
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
          <template v-for="(item, index) in detectionInfo.detectionResultList">
            <tr :key="index">
              <td>{{ item.Gene }}}</td>
              <td>{{ item.Transcript }}</td>
              <td>{{ item.HGVSc }}</td>
              <td>{{ item.HGVSp }}</td>
              <td>{{ item.Class }}</td>
            </tr>
          </template>
          <tr>
            <td colspan="3">检测结果</td>
            <td colspan="2">{{ detectionInfo.result }}</td>
          </tr>
        </table>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Report',

  data() {
    return {
      subjectInfoTitle: '受验者信息',
      sampleInfoTitle: '样本信息',
      geneDetectionResultTitle: '基因检测结果',
      subjectNumber: 'Sample123456',
      detectionInfo: {
        subjectNumber: '',
        detectionResultList: [
          {
            Gene: '',
            Transcript: '',
            HGVSc: '',
            HGVSp: '',
            Class: ''
          }
        ],
        result: ''
      },
      formData: {
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
  },
  methods: {
    init() {
      this.formData = {
        name: 'xxxx',
        gender: '男',
        age: '60岁',
        hospital: '北京协和医院',
        department: '肿瘤外科',
        ID: 'xxxxxx',
        clinicalDiagnosis: '前列腺癌，2021/05初次确诊',
        sampleType: '采血',
        samplingTime: '2021/06/07'
      }
      this.detectionInfo = {
        subjectNumber: 'Sample123456',
        detectionResultList: [
          {
            Gene: 'BRCA1',
            Transcript: 'NM_007294.3',
            HGVSc: 'c.2361del',
            HGVSp: 'p(Arg117MetfsTer5)',
            Class: '致病'
          },
          {
            Gene: 'BRCA2',
            Transcript: 'NM_00059.3',
            HGVSc: 'c.1170T>C',
            HGVSp: '-',
            Class: '致病'
          },
          {
            Gene: 'BRCA3',
            Transcript: 'NM_024675.3',
            HGVSc: 'c.96C>G',
            HGVSp: 'p(Arg117MetfsTer5)',
            Class: '可能致病'
          }
        ],
        result: '阳性'
      }
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
