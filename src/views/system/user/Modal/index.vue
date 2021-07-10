<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :destroy-on-close="false"
    class="persist-dialog"
    width="30%"
  >
    <el-form ref="form" :model="formData" label-position="left" label-width="60px">
      <el-form-item label="用户名" placeholder="请输入用户名">
        <el-input v-model="formData.username"/>
      </el-form-item>
      <el-form-item label="昵称" placeholder="请输入昵称">
        <el-input v-model="formData.nickname"/>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="状态">
            <el-switch
              v-model="formData.state"
              :inactive-value="1"
              :active-value="0"
              active-color="#34797F"
              inactive-color="#BC3232"
            />
            <div class="state-icon">
              <i v-if="formData.state === 0" class="el-icon-unlock unlock"/>
              <i v-else-if="formData.state === 1" class="el-icon-lock lock"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="性别">
            <el-select v-model="formData.sex" placeholder="请选择性别">
              <el-option label="男" value="男"/>
              <el-option label="女" value="女"/>
            </el-select>
            <!-- item--->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="persit-dialog-footer">
      <el-button @click="visible=false">取消</el-button>
      <el-button type="primary" @click="submitFormData()">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { deleteUser, updateUserInfo, addUser } from '@/api/user'

export default {
  name: 'Modal',

  data() {
    return {
      isEdit: true,
      visible: false,
      dialogTitle: '',
      formData: {
        nickname: '',
        sex: '',
        username: '',
        state: 1
      }
    }
  },

  created() {
    eventBus.$on('addUser', this.addFormData)
    eventBus.$on('editUser', this.editFormData)
    eventBus.$on('deleteUser', this.deleteFormData)
  },

  destroyed() {
    eventBus.$off('addUser', this.addFormData)
    eventBus.$off('editUser', this.editFormData)
    eventBus.$off('deleteUser', this.deleteFormData)
  },

  methods: {
    addFormData() {
      this.isEdit = false
      this.dialogTitle = '新增用户'
      this.formData = {}
      this.visible = true
    },
    editFormData(data) {
      this.isEdit = true
      this.dialogTitle = '编辑用户'
      this.formData = data
      this.visible = true
    },
    deleteFormData(data) {
      this.$confirm('确定要删除这条信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.selectValueList) {
          this.selectValueList.forEach(item => {
            deleteUser(item.id).then(res => {
              eventBus.$emit('reloadList')
            })
          })
        }
        if (data) {
          deleteUser(data.id).then(res => {
            eventBus.$emit('reloadList')
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }).catch(error => {
            this.$alert({
              type: 'error',
              message: error.message
            })
          })
        }
      })
    },
    submitFormData() {
      if (this.isEdit) {
        updateUserInfo(this.formData.id, this.formData).then(res => {
          eventBus.$emit('reloadList')
          this.visible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }).catch(error => {
          this.visible = false
          this.$alert({
            type: 'error',
            message: error.message
          })
        })
      } else {
        addUser(this.formData).then(res => {
          eventBus.$emit('reloadList')
          this.visible = false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }).catch(error => {
          this.visible = false
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

<style lang="scss" scoped>
.persist-dialog {
  /deep/ .el-dialog {
    min-width: 400px;
  }

  .state-icon {
    padding-left: 5px;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;

    & > .lock {
      color: #BC3232;
    }

    & > .unlock {
      color: #34797F;
    }
  }
}
</style>
