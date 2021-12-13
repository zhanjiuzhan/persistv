<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input v-model="sampleId" placeholder="请输入查询的样本名称" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQuery()" />
          </el-input>
          <el-button size="small" icon="el-icon-search" type="primary" @click="search">搜素</el-button>
        </div>
        <div class="tools">
          <el-button :disabled="disabled" type="primary" size="small" icon="el-icon-download" @click="exportBatch">批量导出</el-button>
        </div>
      </div>
      <div class="table-container">
        <List>
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-view" type="primary" @click="previewHandler(scope.row)">预览</el-button>
            <el-button size="small" icon="el-icon-edit" type="primary" @click="previewHandler(scope.row, true)">编辑</el-button>
            <el-button size="small" icon="el-icon-view" type="primary" @click="previewQualityControl(scope.row)">质控结果</el-button>
          </template>
        </List>
      </div>
      <Modal/>
      <qc-modal/>
    </el-scrollbar>
  </div>
</template>

<script>
import List from './List'
import Modal from './Modal'
import eventBus from '../../../utils/eventBus'
import qcModal from '../qualityControl'

export default {
  name: 'SampleDetail',

  components: { List, Modal, qcModal },

  data() {
    return {
      sampleId: '',
      disabled: true
    }
  },

  mounted() {
    this.$store.dispatch('updateWhiteList', ['/sys/gene/exportReport'])
    eventBus.$off('changeBtn')
    eventBus.$on('changeBtn', this.changeBtn)
  },

  destroyed() {
    eventBus.$off('changeBtn')
  },

  methods: {
    clearQuery() {
      this.sampleId = ''
      eventBus.$emit('reloadList')
    },
    previewHandler(rowData, editable = false) {
      eventBus.$emit('previewData', rowData, editable)
    },
    search() {
      eventBus.$emit('query', { sampleId: this.sampleId, experimentName: this.$route.params.testName })
    },
    previewQualityControl(rowData) {
      eventBus.$emit('showQualityControl', rowData)
    },
    exportBatch() {
      eventBus.$emit('exportBatch')
    },
    changeBtn(status) {
      this.disabled = status
    }
  }
}
</script>

<style scoped>

</style>
