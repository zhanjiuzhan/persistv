<template>
  <div v-loading="loading" class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="backup-strategy">
        <el-row :gutter="15">
          <el-col :span="8">
            <el-card class="backup-info">
              <div slot="header" class="clearfix">
                <label>备份策略</label>
              </div>
              <el-row>
                <el-col :span="12" class="info-key">
                  <label>状态</label>
                </el-col>
                <el-col :span="12">
                  <el-switch
                    v-model="data.status"
                    :active-value="1"
                    :inactive-value="0"
                  />
                  <label v-show="data.status===1" class="text-success">运行</label>
                  <label v-show="data.status===0" class="text-warning">暂停</label>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="info-key">
                  <label>corn表达式</label>
                </el-col>
                <el-col :span="12">
                  <label>{{ cronData }}</label>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" :lg="16">
            <el-card class="backup-setting">
              <div slot="header" class="clearfix">
                <label>备份周期设置</label>
                <el-button
                  size="small"
                  icon="el-icon-document"
                  type="primary"
                  style="float: right;"
                  @click.stop="setting"
                >
                  设置
                </el-button>
              </div>
              <el-scrollbar class="scrollbar-wrapper cron-wrapper">
                <cron ref="cron" :cron="cronData"/>
              </el-scrollbar>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { getBackupStrategy } from '@/api/backup'
import cron from '@/components/Cron'
import { setBackupStrategy } from '../../../api/backup'

export default {
  name: 'BackupStrategy',

  components: { cron },

  data() {
    return {
      loading: false,
      data: [],
      cronData: ''
    }
  },

  created() {
    this.$nextTick(() => {
      this.init()
    })
  },

  methods: {
    init() {
      this.loading = true
      getBackupStrategy().then(res => {
        this.loading = false
        this.data = res
        this.cronData = res.cronExpression
      }).catch(error => {
        this.loading = false
        this.$message({
          type: 'error',
          message: error.message
        })
      })
    },
    setting() {
      this.$confirm('确定设置该策略？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        setBackupStrategy({
          cronExpression: this.$refs['cron'].getValue(),
          status: this.data.status
        }).then(res => {
          this.loading = false
          this.data = res
          this.cronData = res.cronExpression
        }).catch(error => {
          this.loading = false
          this.$message({
            type: 'error',
            message: error.message
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-wrapper {
  height: 100%;

  .backup-strategy {
    padding: 20px;

    .backup-info {
      /deep/ .el-card__body {

        .el-row {
          margin: 15px 5px;
        }

        .info-key {
          label {
            font-size: 15px;
            font-weight: 600;
          }
        }

        label {
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
  }

  .clearfix:after {
    clear: both
  }

  .cron-wrapper {
    height: calc(100vh - 292px);
  }
}
</style>
