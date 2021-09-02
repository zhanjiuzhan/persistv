<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input v-model="filename" placeholder="查询文件名" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQuery()"/>
          </el-input>
          <el-date-picker
            v-model="timeRange"
            :default-time="['12:00:00']"
            type="datetimerange"
            start-placeholder="请输入开始时间"
            end-placeholder="请输入结束时间"
            class="query-time-picker"
          />
          <el-button size="small" icon="el-icon-search" type="primary" @click="search">搜素</el-button>
        </div>
      </div>
      <div class="table-container">
        <List>
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-document" type="primary" @click.stop="recoverBackup(scope.row)">
              还原
            </el-button>
            <el-button size="small" icon="el-icon-document" type="danger" @click.stop="deleteRecords(scope.row)">
              删除
            </el-button>
          </template>
        </List>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import List from './List'
import { recoverBackup, deleteBackup } from '@/api/backup'
import { parseTime } from '@/utils'
import eventBus from '@/utils/eventBus'

export default {
  name: 'BackupRecords',

  components: { List },

  data() {
    return {
      filename: '',
      timeRange: ''
    }
  },

  methods: {
    search() {
      const query = {}
      this.filename && (query['filename'] = this.filename)
      if (this.timeRange && this.timeRange.length === 2) {
        query['startTIme'] = parseTime(this.timeRange[0])
        query['endTime'] = parseTime(this.timeRange[1])
      }
      eventBus.$emit('query', query)
    },
    clearQuery() {
      this.filename = ''
    },
    recoverBackup(rowData) {
      if (!rowData) return
      const { id } = rowData
      if (!id) return
      this.$confirm('确定还原该备份？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recoverBackup(id).then(res => {
          this.$message({
            type: 'success',
            message: '还原成功'
          })
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error.message
          })
        })
      })
    },
    deleteRecords(rowData) {
      if (!rowData) return
      const { id } = rowData
      if (!id) return
      this.$confirm('确定删除该条备份？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBackup(id).then(res => {
          eventBus.$emit('reloadList')
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch(error => {
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

<style scoped>
.persist-query {
  width: 800px;
}

.query-time-picker {
  min-width: 400px;
  margin-right: 10px;
}
</style>
