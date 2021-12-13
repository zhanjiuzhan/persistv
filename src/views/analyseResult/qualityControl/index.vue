<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :destroy-on-close="false"
    class="persist-dialog"
    width="50%"
  >
    <el-table
      id="qualityControlTable"
      :data="qualityControlDataList"
      border
      class="persist-table"
    >
      <el-table-column
        prop="qualityControlItem"
        label="质控项目"
      />
      <el-table-column
        prop="qualityControlValue"
        label="质控数值"
      />
      <el-table-column
        prop="qualityControlIsPassed"
        label="合格/不合格"
      />
    </el-table>
  </el-dialog>
</template>

<script>
import { getQualityControlInfo } from '../../../api/gene'
import eventBus from '../../../utils/eventBus'

export default {
  name: 'QualityControl',

  data() {
    return {
      loading: false,
      dialogTitle: '质控结果',
      visible: false,
      qualityControlDataList: [
        {
          qualityControlItem: '',
          qualityControlValue: '',
          qualityControlIsPassed: ''
        }
      ]
    }
  },

  mounted() {
    eventBus.$off('showQualityControl')
    eventBus.$on('showQualityControl', this.open)
  },

  destroyed() {
    eventBus.$off('showQualityControl')
  },

  methods: {
    open(data) {
      const { testName } = this.$route.params
      this.loading = true
      getQualityControlInfo(testName, data.sampleId)
        .then(res => {
          this.visible = true
          this.qualityControlDataList = res
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
    }
  }
}
</script>

<style scoped>

</style>
