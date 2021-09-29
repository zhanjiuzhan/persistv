<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input id="queryUserName" v-model="userName" placeholder="查询登录用户" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQueryUserName()"/>
          </el-input>
          <el-input id="queryUpdateTime" v-model="updateTime" placeholder="查询操作时间" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQueryUpdateTime()"/>
          </el-input>
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

export default {
  name: 'LoginRecords',

  components: { List },

  data() {
    return {
      userName: '',
      updateTime: ''
    }
  },

  methods: {
    search() {
      const query = {}
      this.userName && (query['userName'] = this.userName)
      this.updateTime && (query['updateTime'] = this.updateTime)
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
  width: 500px;
}
</style>
