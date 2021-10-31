<template>
  <el-dialog
    v-loading.lock="loading"
    :show-close="showClose"
    :title="dialogTitle"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    class="persist-dialog"
    width="30%"
  >
    <el-row :gutter="5">
      <el-col :span="6">
        <label class="infoLabel">
          机器码:
        </label>
      </el-col>
      <el-col :span="18">
        <label class="infoValue">
          {{ authenticInfo.machineCode }}
        </label>
      </el-col>
    </el-row>
    <el-row v-if="activated" :gutter="5">
      <el-col :span="6">
        <label class="infoLabel">
          产品名称:
        </label>
      </el-col>
      <el-col :span="18">
        <label class="infoValue">
          {{ config.webName }}
        </label>
      </el-col>
    </el-row>
    <el-row v-if="activated" :gutter="5">
      <el-col :span="6">
        <label class="infoLabel">
          授权时间:
        </label>
      </el-col>
      <el-col :span="18">
        <label class="infoValue">
          {{ authenticInfo.issuedTimeDate + ' - ' + authenticInfo.expiryTimeDate }}
        </label>
      </el-col>
    </el-row>
    <div slot="footer" class="presit-dialog-footer">
      <el-upload ref="upload" :http-request="registryProgram" :limit="1" :show-file-list="false" action="" accept=".lic">
        <el-button type="primary" icon="el-icon-upload">上传许可（*.lic）</el-button>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script>
import eventBus from '../utils/eventBus'
import { getUniqueCode, registry } from '../api/strategy'
import Config from '@/config'

export default {
  name: 'LicenseInfoDialog',

  data() {
    return {
      loading: false,
      dialogTitle: '激活程序',
      visible: false,
      activated: true,
      showClose: false,
      uploadUrl: '/sys/security-license/upload',
      config: Config,
      authenticInfo: {
        machineCode: '',
        productName: '',
        expiryTimeDate: '',
        issuedTimeDate: ''
      }
    }
  },

  created() {
    eventBus.$on('showLicenseInfo', this.showLicenseInfo)
  },

  destroyed() {
    eventBus.$off('showLicenseInfo', this.showLicenseInfo)
  },

  methods: {
    showLicenseInfo(activateData) {
      if (activateData) {
        this.showClose = true
        this.activated = true
        this.authenticInfo = activateData
        this.visible = true
      } else {
        this.activated = false
        getUniqueCode().then(res => {
          this.authenticInfo.machineCode = res
          this.visible = true
        }).catch(error => {
          this.$message({
            message: error.message,
            type: 'error'
          })
        })
      }
    },
    registryProgram({ file }) {
      if (this.$refs && this.$refs.upload) {
        const formData = new FormData()
        formData.append('file', file)
        registry(formData).then(res => {
          this.visible = false
          location.reload()
        }).catch(error => {
          this.$refs.upload.clearFiles()
          this.$message({
            message: error.message,
            type: 'error'
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.infoLabel {
  font-size: 16px;
  font-weight: 400;
  font-family: KaiTi;
}
.infoValue {
  font-size: 14px;
  font-weight: 400;
}
</style>
