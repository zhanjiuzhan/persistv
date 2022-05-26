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
    @open="getRoleInfo"
  >
    <el-form ref="form" :model="formData" label-position="left" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formData.nickname" placeholder="请输入昵称"/>
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
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="角色">
        <el-select v-model="userRole" placeholder="请选择用户角色" style="width: 100%">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
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
import { getRole, getAllRole } from '@/api/role'
import { updateUserInfo, addUser } from '@/api/user'
import { setUserRole } from '../../../../api/role'

export default {
  name: 'Modal',

  data() {
    return {
      loading: false,
      isEdit: true,
      visible: false,
      dialogTitle: '',
      userRole: '',
      roleList: [],
      formData: {
        id: '',
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
  },

  destroyed() {
    eventBus.$off('addUser', this.addFormData)
    eventBus.$off('editUser', this.editFormData)
  },

  methods: {
    addFormData() {
      this.loading = true
      this.isEdit = false
      this.dialogTitle = '新增用户'
      this.formData = {}
      this.userRole = ''
      this.visible = true
    },
    editFormData(data) {
      this.loading = true
      this.isEdit = true
      this.dialogTitle = '编辑用户'
      this.formData = data
      this.userRole = ''
      this.visible = true
    },
    submitFormData() {
      this.loading = true
      if (this.isEdit) {
        updateUserInfo(this.formData.id, this.formData).then(res => {
          const data = {
            roleIds: [this.userRole],
            userId: this.formData.id
          }
          setUserRole(data).then(() => {
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
        }).catch(error => {
          this.visible = false
          this.loading = false
          this.$alert(error.message)
        })
      } else {
        addUser(this.formData).then(res => {
          if (!res.id) {
            this.$message({
              message: '用户角色添加失败',
              type: 'error'
            })
          }
          const data = {
            roleIds: [this.userRole],
            userId: res.id
          }
          setUserRole(data).then(() => {
            eventBus.$emit('reloadList')
            this.visible = false
            this.loading = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
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
    },
    getRoleInfo() {
      this.loading = true
      getAllRole().then(allUser => {
        this.roleList = allUser
        if (this.formData.id) {
          getRole(this.formData.id).then(role => {
            this.loading = false
            this.userRole = role.map(item => item.id)[0]
          }).catch(error => {
            this.visible = false
            this.loading = false
            this.$message({
              type: 'error',
              message: error.message
            })
          })
        } else {
          this.loading = false
        }
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
