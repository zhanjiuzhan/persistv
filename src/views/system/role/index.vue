<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="persist-toolbar">
        <div class="persist-query">
          <el-input v-model="name" placeholder="查询角色" class="query-input">
            <i slot="suffix" class="el-icon-circle-close" @click="clearQuery()"/>
          </el-input>
          <el-button size="small" icon="el-icon-search" type="primary" @click="search">搜素</el-button>
        </div>
        <div class="tools">
          <el-button type="success" size="small" icon="el-icon-plus" @click="addRole()">增加</el-button>
          <el-button :disabled="delBtnDisabled" type="danger" size="small" icon="el-icon-delete" @click="deleteRole()">
            删除
          </el-button>
          <el-button :disabled="editBtnDisabled" type="primary" size="small" icon="el-icon-edit" @click="editRole()">编辑
          </el-button>
        </div>
      </div>
      <el-row :gutter="10" class="setting-content">
        <el-col :xs="24" :sm="24" :md="18" :lg="18">
          <List>
            <template slot-scope="scope">
              <el-button size="small" icon="el-icon-edit" type="primary" @click.stop="editRole(scope.row)">编辑</el-button>
              <el-button size="small" icon="el-icon-delete" type="danger" @click.stop="deleteRole(scope.row)">删除</el-button>
            </template>
          </List>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6">
          <TreeList v-loading="treeLoading" :tree-data="treeData" :tree-props="treeProps"/>
        </el-col>
      </el-row>
      <Modal/>
    </el-scrollbar>
  </div>
</template>

<script>
import List from './List'
import eventBus from '@/utils/eventBus'
import TreeList from './TreeList'
import { getAllMenu } from '@/api/menu'
import { deleteRole } from '@/api/role'
import Modal from './Modal'

export default {
  name: 'RoleManagement',

  components: { TreeList, List, Modal },

  data() {
    return {
      treeLoading: false,
      name: '',
      selectValueList: [],
      delBtnDisabled: true,
      editBtnDisabled: true,
      dialogTitle: '',
      visible: false,
      isEdit: false,
      treeData: [],
      treeProps: {
        children: 'childrenNode',
        label: 'menuName'
      }
    }
  },

  created() {
    this.initTree()
  },

  mounted() {
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
      eventBus.$emit('query', { name: this.name })
    },
    clearQuery() {
      this.name = ''
    },
    initTree() {
      this.treeLoading = true
      getAllMenu().then(res => {
        this.treeLoading = false
        this.treeData = res
      })
    },
    addRole() {
      eventBus.$emit('addRole')
    },
    editRole(data) {
      if (!data) {
        if (this.selectValueList.length === 1 && this.selectValueList[0]) {
          eventBus.$emit('editRole', { ...this.selectValueList[0] })
        } else {
          return
        }
      } else {
        eventBus.$emit('editRole', { ...data })
      }
    },
    deleteRole(data) {
      if (!data && this.selectValueList.length === 0) {
        return
      }
      this.$confirm('确定要删除该角色吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.selectValueList) {
          this.loading = true
          this.selectValueList.forEach(item => {
            deleteRole(item.id).then(() => {
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
          deleteRole(data.id).then(() => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  text-align: center;
}

.setting-content {
  padding: 15px;
}

/deep/ .el-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
</style>
