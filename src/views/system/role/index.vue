<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input v-model="username" placeholder="查询用户名" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQuery()" />
          </el-input>
          <el-button size="small" icon="el-icon-search" type="primary" @click="search">搜素</el-button>
        </div>
        <div class="tools">
          <el-button type="success" size="small" icon="el-icon-plus" @click="addUser()">增加</el-button>
          <el-button :disabled="delBtnDisabled" type="danger" size="small" icon="el-icon-delete" @click="deleteUser()">
            删除
          </el-button>
          <el-button :disabled="editBtnDisabled" type="primary" size="small" icon="el-icon-edit" @click="editUser()">编辑
          </el-button>
        </div>
      </div>
      <div class="table-container">
        <List>
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-edit" type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </List>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import List from './List'
import eventBus from '@/utils/eventBus'
export default {
  name: 'RoleManagement',

  components: { List },

  data() {
    return {
      username: '',
      selectValueList: [],
      delBtnDisabled: true,
      editBtnDisabled: true,
      dialogTitle: '',
      visible: false,
      isEdit: false
    }
  },

  mounted () {
    eventBus.$on('oneSelected', (valList) => {
      this.selectValueList = valList
      this.delBtnDisabled = false
      this.editBtnDisabled = false
    })
    eventBus.$on('manySelected', (valList) => {
      this.selectValueList = valList
      this.delBtnDisabled = false
      this.editBtnDisabled = true
    })
    eventBus.$on('noOneSelected', (valList) => {
      this.selectValueList = valList
      this.delBtnDisabled = true
      this.editBtnDisabled = true
    })
  },

  destroyed() {
    eventBus.$off('onSelected')
    eventBus.$off('manySelected')
    eventBus.$off('noOneSelected')
    eventBus.$off('reloadList')
  },

  methods: {
    search() {
      eventBus.$emit('query', { username: this.username })
    },
    clearQuery() {
      this.username = ''
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  text-align: center;
}
</style>
