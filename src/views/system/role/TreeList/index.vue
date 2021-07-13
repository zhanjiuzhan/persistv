<template>
  <div class="persist-tree">
    <el-row :gutter="10" class="filter-container">
      <el-col :span="16">
        <el-input
          v-model="filterMenuName"
          placeholder="请输入菜单名"
        />
      </el-col>
      <el-col :span="8" class="apply">
        <el-button
          :disabled="applyDisabled"
          size="small"
          type="primary"
          icon="el-icon-document-checked"
          @click="applyMenu"
        >应用</el-button>
      </el-col>
    </el-row>
    <el-tree
      v-loading="loading"
      ref="tree"
      :data="treeData"
      :props="treeProps"
      :filter-node-method="filterMenu"
      :default-expand-all="true"
      show-checkbox
      node-key="id"
    />
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { getRoleMenu } from '@/api/menu'
import { setRoleMenu } from '../../../../api/menu'

export default {
  name: 'TreeList',

  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    treeProps: {
      type: Object,
      default: () => {
      }
    }
  },

  data() {
    return {
      loading: false,
      applyDisabled: true,
      filterMenuName: '',
      selectRole: {},
      defaultProps: {
        children: 'childrenNode',
        label: 'menuName'
      }
    }
  },

  watch: {
    filterMenuName(val) {
      this.$refs.tree.filter(val)
    }
  },

  created() {
    eventBus.$on('selectRole', this.displayMenu)
  },

  destroyed() {
    eventBus.$off('selectRole')
  },

  methods: {
    filterMenu(value, data) {
      if (!value) return true
      return data[this.treeProps.label].indexOf(value) !== -1
    },
    displayMenu(roleData) {
      if (!roleData) return
      this.loading = true
      this.selectRole = roleData
      getRoleMenu(roleData.id).then(res => {
        const ids = []
        const getID = (roleInfo) => {
          ids.push(roleInfo.id)
          if (roleInfo[this.treeProps.children]) {
            getID(roleInfo[this.treeProps.children])
          }
        }
        res.forEach(item => {
          getID(item)
        })
        this.$refs.tree.setCheckedKeys(ids)
        this.applyDisabled = false
        this.loading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.message
        })
        this.loading = false
      })
    },
    applyMenu() {
      this.$confirm(`确定对${this.selectRole.name}角色应用该设置？`, '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        const menuIds = this.$refs.tree.getCheckedKeys()
        const roleId = this.selectRole.id
        this.loading = true
        setRoleMenu({ menuIds, roleId }).then(res => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '设置成功！'
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
  }
}
</script>

<style lang="scss" scoped>
.persist-tree {
  padding: 5px;
  border: 1px solid $--color-border-base;
  height: 100%;

  .apply {
    margin: 4px 0;
  }
}
</style>
