<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input v-model="name" placeholder="查询用户名" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQuery()" />
          </el-input>
          <el-button size="small" icon="el-icon-search" type="primary" @click="search">搜素</el-button>
        </div>
        <div class="tools">
          <el-button type="success" size="small" icon="el-icon-plus" @click="addMenu()">增加</el-button>
        </div>
      </div>
      <div class="table-container">
        <List>
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-edit" type="primary" @click="editMenu(scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteMenu(scope.row)">删除</el-button>
          </template>
        </List>
        <Modal/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import List from './List'
import Modal from './Modal'
import eventBus from '@/utils/eventBus'
import { deleteMenu } from '../../../api/menu'

export default {
  name: 'MenuManagement',

  components: { List, Modal },

  data() {
    return {
      name: '',
      selectValueList: [],
      delBtnDisabled: true,
      editBtnDisabled: true,
      dialogTitle: '',
      visible: false,
      isEdit: false
    }
  },

  methods: {
    search() {
      eventBus.$emit('query', { username: this.username })
    },
    clearQuery() {
      this.username = ''
    },
    addMenu() {
      eventBus.$emit('addMenu')
    },
    editMenu(data) {
      eventBus.$emit('editMenu', data)
    },
    deleteMenu(data) {
      this.$confirm('确定要删除该菜单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteMenu(data.id).then(() => {
          eventBus.$emit('reloadList')
          this.loading = false
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch(error => {
          this.loading = false
          this.$message({
            type: 'error',
            message: error.message
          })
        })
      })
    }
  },

  destroyed() {
    eventBus.$off('onSelected')
    eventBus.$off('manySelected')
    eventBus.$off('noOneSelected')
    eventBus.$off('reloadList')
  }
}
</script>

<style scoped>
.scrollbar-wrapper {
  height: 100%;
}
</style>
