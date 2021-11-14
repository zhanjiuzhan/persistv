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
          <el-button v-show="false" :disabled="editBtnDisabled" type="primary" size="small" icon="el-icon-edit" @click="editUser()">编辑
          </el-button>
        </div>
      </div>
      <div class="table-container">
        <List>
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-edit" type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteUser(scope.row)">删除</el-button>
            <el-button size="small" icon="el-icon-refresh-left" type="warning" @click="resetPwd(scope.row.id)">重置密码</el-button>
          </template>
        </List>
        <Modal/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { restPwd, deleteUser } from '@/api/user'
import List from './List'
import Modal from './Modal'
import eventBus from '@/utils/eventBus'

export default {
  name: 'UserManagement',

  components: { List, Modal },

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
  },

  methods: {
    search() {
      eventBus.$emit('query', { username: this.username })
    },
    clearQuery() {
      this.username = ''
      eventBus.$emit('reloadList')
    },
    addUser() {
      eventBus.$emit('addUser')
    },
    editUser(data) {
      if (!data) {
        if (this.selectValueList.length === 1 && this.selectValueList[0]) {
          eventBus.$emit('editUser', { ...this.selectValueList[0] })
        } else {
          return
        }
      } else {
        eventBus.$emit('editUser', { ...data })
      }
    },
    deleteUser(data) {
      this.$confirm('确定要删除这条信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.selectValueList) {
          this.loading = true
          this.selectValueList.forEach(item => {
            deleteUser(item.id).then(() => {
              eventBus.$emit('reloadList')
              this.loading = false
            }).catch(error => {
              this.loading = false
              this.$alert({
                type: 'error',
                message: error.message
              })
            })
          })
        }
        if (data) {
          this.loading = true
          deleteUser(data.id).then(() => {
            eventBus.$emit('reloadList')
            this.loading = false
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }).catch(error => {
            this.loading = false
            this.$alert({
              type: 'error',
              message: error.message
            })
          })
        }
      })
    },
    resetPwd(id) {
      if (!id) return
      this.$confirm('确定重置该用户密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        restPwd(id).then(res => {
          this.$message({
            type: 'success',
            message: '重置成功'
          })
        }).catch(error => {
          this.alert({
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
/deep/ .el-dialog__body {
  text-align: center;
}
</style>
