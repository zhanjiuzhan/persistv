<template>
  <el-dialog
    v-loading.lock="loading"
    :title="dialogTitle"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :destroy-on-close="false"
    class="persist-dialog"
    width="30%"
  >
    <el-form ref="form" :model="formData" label-position="left" label-width="100px">
      <el-form-item label="角色名称">
        <el-input v-model="formData.name" placeholder="请输入角色名称"/>
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input v-model="formData.comments" :rows="3" type="textarea" placeholder="请输入描述信息"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="persit-dialog-footer">
      <el-button @click="visible=false">取消</el-button>
      <el-button type="primary" @click="submitFormData()">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { setRole, updateRole } from '@/api/role'

export default {
  name: 'Modal',

  data() {
    return {
      loading: false,
      isEdit: true,
      dialogTitle: '',
      visible: false,
      formData: {
        id: '',
        name: '',
        comments: ''
      }
    }
  },

  created() {
    eventBus.$on('addRole', this.addFormData)
    eventBus.$on('editRole', this.editFormData)
  },

  destroyed() {
    eventBus.$off('addRole', this.addFormData)
    eventBus.$off('editRole', this.editFormData)
  },

  methods: {
    addFormData() {
      this.isEdit = false
      this.dialogTitle = '新增角色'
      this.formData = {}
      this.visible = true
    },
    editFormData(data) {
      this.isEdit = true
      this.dialogTitle = '编辑角色'
      this.formData = data
      this.visible = true
    },
    submitFormData() {
      this.loading = true
      if (this.isEdit) {
        updateRole(this.formData).then(res => {
          eventBus.$emit('reloadList')
          this.visible = false
          this.loading = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }).catch(error => {
          this.visible = false
          this.loading = false
          this.$alert(error.message)
        })
      } else {
        setRole(this.formData).then(res => {
          eventBus.$emit('reloadList')
          this.visible = false
          this.loading = false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }).catch(error => {
          this.visible = false
          this.loading = false
          this.$message({
            type: 'error',
            message: error.message
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
