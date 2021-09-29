<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input id="queryOperatorName" v-model="operatorName" placeholder="查询操作人" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQueryOperatorName()"/>
          </el-input>
          <el-input id="queryTitle" v-model="title" placeholder="查询操作内容" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQueryTitle()"/>
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
            <el-button size="small" icon="el-icon-document" type="primary" @click.stop="showDetail(scope.row)">详情</el-button>
          </template>
        </List>
      </div>
      <Detail/>
    </el-scrollbar>
  </div>
</template>

<script>
import List from './List'
import Detail from './detail'
import eventBus from '../../../utils/eventBus'
import { parseTime } from '@/utils'

export default {
  name: 'Records',

  components: { List, Detail },

  data() {
    return {
      operatorName: '',
      title: '',
      timeRange: ','
    }
  },

  methods: {
    search() {
      const query = {}
      this.operatorName && (query['operatorName'] = this.operatorName)
      this.title && (query['title'] = this.title)
      if (this.timeRange && this.timeRange.length === 2) {
        query['startTime'] = parseTime(this.timeRange[0])
        query['endTime'] = parseTime(this.timeRange[1])
      }
      eventBus.$emit('query', query)
    },

    clearQueryOperatorName() {
      this.operatorName = ''
      eventBus.$emit('reloadList')
    },

    clearQueryTitle() {
      this.title = ''
      eventBus.$emit('reloadList')
    },

    showDetail(rowData) {
      eventBus.$emit('showRecordsDetail', rowData)
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
