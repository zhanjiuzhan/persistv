<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input id="queryUserName" v-model="userName" placeholder="查询登录用户" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQueryUserName()"/>
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
        <List/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import List from './List'
import eventBus from '../../../utils/eventBus'
import { parseTime } from '../../../utils'

export default {
  name: 'LoginRecords',

  components: { List },

  data() {
    return {
      userName: '',
      timeRange: ''
    }
  },

  methods: {
    search() {
      const query = {}
      this.userName && (query['userName'] = this.userName)
      if (this.timeRange && this.timeRange.length === 2) {
        query['startTime'] = parseTime(this.timeRange[0])
        query['endTime'] = parseTime(this.timeRange[1])
      }
      eventBus.$emit('query', query)
    },

    clearQueryUserName() {
      this.userName = ''
      eventBus.$emit('reloadList')
    },

    clearQueryUpdateTime() {
      this.updateTime = ''
      eventBus.$emit('reloadList')
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
