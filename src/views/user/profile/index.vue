<template>
  <el-row :gutter="15" class="page-content">
    <el-col :sm="24" :md="6" :lg="6">
      <el-card class="profile-left">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div class="avatar">
          <el-avatar :size="100" :src="avatarUrl" icon="el-icon-user-solid" shape="circle"/>
        </div>
        <ul class="profile-content">
          <li>
            <i class="el-icon-user"/>
            <span class="profile-item">用户名</span>
            <label class="profile-value">{{ user.username }}</label>
          </li>
          <li>
            <svg-icon icon-class="user1"/>
            <span class="profile-item">昵称</span>
            <label class="profile-value">{{ user.nickname }}</label>
          </li>
          <li>
            <i v-if="user.state===0" class="el-icon-unlock"/>
            <i v-else-if="user.state===1" class="el-icon-lock"/>
            <span class="profile-item">用户状态</span>
            <label class="profile-value">{{ user.state === 0 ? '未锁定' : '锁定' }}</label>
          </li>
          <li>
            <i v-if="user.sex==='男'" class="el-icon-male"/>
            <i v-else-if="user.sex==='女'" class="el-icon-female"/>
            <span class="profile-item">性别</span>
            <label class="profile-value">{{ user.sex }}</label>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :sm="24" :md="18" :lg="18">
      <el-card :loading="formLoading" class="profile-right">
        <div slot="header" class="clearfix">
          <span>修改密码</span>
        </div>
        <el-form ref="form" :rules="rules" :model="pwdForm" class="profile-content">
          <el-form-item label="原始密码" prop="oldPwd">
            <el-input v-model="pwdForm.oldPwd" type="password" placeholder="请输入原始密码"/>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pwdForm.newPwd" type="password" :placeholder="newPwdPlaceholder"/>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPwd">
            <el-input v-model="pwdForm.confirmPwd" type="password" placeholder="请再次输入新密码" @change="confirmPwdData"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="apply">应用</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { SessionStorageUtil } from '../../../utils/sessionStorageUtil'
import { changePwd } from '../../../api/user'
import { getStrategy } from '../../../api/strategy'

export default {
  name: 'Profile',

  data() {
    return {
      avatarUrl: require('@/assets/avatar/pre_avatar.png'),
      user: {
        username: '',
        nickname: '',
        state: 0,
        changePasswordFlag: 'y',
        createTime: '',
        id: '',
        passwordUpdateTime: '',
        sex: '男',
        updateTime: ''
      },
      formLoading: false,
      pwdForm: {
        newPwd: '',
        oldPwd: '',
        confirmPwd: ''
      },
      pattern: '',
      newPwdRules: {},
      oldPwdRules: {},
      newPwdPlaceholder: '',
      rules: {
        oldPwd: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        confirmPwd: [
          { required: true, message: '请确认输入密码', trigger: 'blur' },
        ]
      }
    }
  },

  created() {
    this.init()
  },

  mounted() {
    const sessionStorageUtil = new SessionStorageUtil()
    this.user = JSON.parse(sessionStorageUtil.getItem('userInfo'))
  },

  methods: {
    init() {
      getStrategy().then(res => {
        const { includeDigital, includeLetter, includeSpecialSymbol, regularExpression, minLength } = res
        const errorMessage = `密码必须是长度为${minLength}的，包含${includeDigital === 'Y' ? '数字、' : ''}${includeLetter === 'Y' ? '字母、' : ''}${includeSpecialSymbol === 'Y' ? '特殊字符、' : ''}的字符`
        this.rules.newPwd.push({
          pattern: new RegExp(regularExpression),
          message: errorMessage
        })
        this.rules.confirmPwd.push({
          pattern: new RegExp(regularExpression),
          message: errorMessage
        })
        if (includeDigital !== 'Y' && includeLetter !== 'Y' && includeSpecialSymbol !== 'Y') {
          this.newPwdPlaceholder = `请输入任意长度不少于${minLength}位的任意字符`
        } else {
          this.newPwdPlaceholder = `新密码应包含${includeDigital === 'Y' ? '数字、' : ''}${includeLetter === 'Y' ? '字母、' : ''}${includeSpecialSymbol === 'Y' ? '特殊符号、' : ''}且长度不少于${minLength}位`
        }
      })
    },
    confirmPwdData() {
      new Promise((resolve, reject) => {
        if (!this.pwdForm.oldPwd) {
          reject({ message: '请先输入原始密码' })
        }
        if (!this.pwdForm.newPwd) {
          reject({ message: '请先输入新设置的密码再进行确认' })
        }
        console.log(this.pwdForm.newPwd, this.pwdForm.confirmPwd)
        if (this.pwdForm.newPwd !== this.pwdForm.confirmPwd) {
          reject({ message: '新设置密码与确认密码不一致，请确认后再输入' })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.message
        })
      })
    },
    apply() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formLoading = true
          const { oldPwd, newPwd } = this.pwdForm
          changePwd({ oldPwd, newPwd }).then(() => {
            this.formLoading = false
            this.$message({
              type: 'success',
              message: '密码设置成功'
            })
            this.$store.dispatch('user/logout').then(() => {
              location.replace('/login')
            })
          }).catch(error => {
            this.$message({
              message: error.message,
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '密码修改失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  flex-direction: row;
  align-items: baseline;

  .clearfix {
    font-weight: 600;
    font-family: KaiTi;
    color: $--color-primary;
    font-size: 24px;
  }

  .profile-left {
    .avatar {
      text-align: center;
    }

    .profile-content {
      padding-left: 0px;
      list-style: none;

      li {
        border-bottom: 1px solid #F0F3F4;
        border-top: 1px solid #F0F3F4;
        padding: 11px 0px;
        font-size: 13px;

        .profile-item {
          padding: 2px 5px;
          width: 100px;
          display: inline-block;
        }

        .profile-value {
          label {
            text-align: center;
            width: 100%;
            display: inline-block;
          }
        }
      }
    }
  }

  .profile-right {
    .profile-content {
      width: 60%;
    }
  }
}
</style>
