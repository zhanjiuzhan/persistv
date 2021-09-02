<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    width="40%"
  >
    <el-scrollbar class="scrollbar-wrapper">
      <JsonViewer
        :value="detailData"
        copyable
        boxed
      />
    </el-scrollbar>
  </el-dialog>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
import eventBus from '../../../../utils/eventBus'
export default {
  name: 'Detail',

  components: { JsonViewer },

  created() {
    eventBus.$on('showRecordsDetail', this.showDetail)
  },

  destroyed() {
    eventBus.$off('showRecordsDetail', this.showDetail)
  },

  data() {
    return {
      visible: false,
      dialogTitle: '审计详情',
      detailData: {}
    }
  },

  methods: {
    showDetail(rowData) {
      this.visible = true
      this.detailData = { ...rowData, jsonResult: JSON.parse(rowData.jsonResult) }
    }
  }
}
</script>

<style scoped>
.scrollbar-wrapper {
  height: calc(100vh - 300px);
}
</style>
