<template>
  <div class="login-container" @keydown="enterKeyHandler">
    <el-avatar :size="100" :src="avatarUrl" icon="el-icon-user-solid" shape="circle" />
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" :placeholder="userNamePlaceholder" type="text" auto-complete="off">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" :placeholder="passwordPlaceholder" type="password" auto-complete="off" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="5">
          <el-col :span="16">
            <el-input v-model="loginForm.code" :placeholder="validCodePlaceholder">
              <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
            </el-input>
          </el-col>
          <el-col :span="8">
            <div id="validCode">
              <img :src="validCodeImage" @click="getCode">
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="space-between">
          <el-checkbox :label="rememberMeLabel" v-model="loginForm.rememberMe"/>
          <el-button id="loginButton" :loading="loading" size="medium" type="primary" @click.native.prevent="handleLogin">
            <span v-if="!loading">{{ loginText }}</span>
            <span v-else>{{ loggingText }}</span>
          </el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <!-- <el-divider id="divider"/>-->
    <!-- <el-row id="otherItemRow" type="flex" justify="end">-->
    <!--  <el-col :span="4">-->
    <!--    <el-link type="primary">{{ forgetText }}</el-link>-->
    <!--  </el-col>-->
    <!--  <el-col :span="1">-->
    <!--    <span>|</span>-->
    <!--  </el-col>-->
    <!--  <el-col :span="4">-->
    <!--    <el-link type="primary">{{ registerText }}</el-link>-->
    <!--  </el-col>-->
    <!--  <el-col :span="1">-->
    <!--    <span>|</span>-->
    <!--  </el-col>-->
    <!--  <el-col :span="4">-->
    <!--    <el-link type="primary">{{ quickWayText }}</el-link>-->
    <!--  </el-col>-->
    <!-- /el-row>-->
  </div>
</template>

<script>
import Config from '@/config'
import { validCode } from '@/api/login'
import { getAuthorities } from '@/api/authorities'
import { convertBase642picture } from '@/utils'
import { encrypt } from '../utils/rsaEncrypt'
import { SessionStorageUtil } from '../utils/sessionStorageUtil'
// import { Base64 } from 'js-base64'
export default {
  name: 'LoginComponent',

  data () {
    return {
      sessionStorageUtil: null,
      loading: false,
      redirect: undefined,
      loginForm: {
        username: '',
        password: '',
        code: '',
        rememberMe: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      avatarUrl: require('@/assets/avatar/pre_avatar.png'),
      userNamePlaceholder: '账号/手机号码/邮箱',
      passwordPlaceholder: '密码',
      validCodePlaceholder: '请输入验证码',
      validCodeImage: '',
      rememberMeLabel: '记住我',
      loginText: '登 录',
      loggingText: '登 陆 中...',
      forgetText: '忘记密码',
      registerText: '注册账号',
      quickWayText: '快捷登陆',
      publicKey: '',
      uuid: ''
    }
  },

  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  created () {
    this.sessionStorageUtil = new SessionStorageUtil({ expireTime: Config.passCookieExpires })
    this.getCookie()
    this.getCode()
    getAuthorities().then(res => {
      this.publicKey = res
    })
  },

  methods: {
    enterKeyHandler(e) {
      if (e.keyCode === 13) {
        this.handleLogin()
      }
    },
    getCookie () {
      const username = this.sessionStorageUtil.getItem('username')
      const password = this.sessionStorageUtil.getItem('password')
      const rememberMe = this.sessionStorageUtil.getItem('password')
      if (rememberMe) {
        username && (this.loginForm.username = username)
        password && (this.loginForm.password = password)
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const { username, password: plainPwd, code, rememberMe } = this.loginForm
          let encryptPwd = this.sessionStorageUtil.getItem('password')
          if (encryptPwd !== plainPwd) {
            encryptPwd = encrypt(plainPwd, this.publicKey)
            // encryptPwd = Base64.encode(encrypt(plainPwd, this.publicKey))
          }
          if (rememberMe) {
            this.sessionStorageUtil.setItem('username', username)
            this.sessionStorageUtil.setItem('password', encryptPwd)
            this.sessionStorageUtil.setItem('rememberMe', rememberMe)
          }
          const userInfo = {
            username,
            password: encryptPwd,
            code,
            uuid: this.uuid
          }
          this.$store.dispatch('user/login', userInfo).then(() => {
            // todo: 添加加载动画结束标志
            this.$router.push({ path: this.redirect || '/' })
          }).catch(error => {
            // todo: 添加加载动画结束标志
            console.log(error)
            this.getCode()
          })
        } else {
          // todo: 添加验证失败处理
          return false
        }
      })
    },
    getCode () {
      validCode().then(res => {
        this.validCodeImage = convertBase642picture(res.img)
        this.uuid = res.uuid
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: $--second-backgroud-color;
  border: 2px solid $--color-primary;
  border-radius: 6px;
  position: relative;

  /deep/ .el-avatar--circle {
    border: 2px solid $--color-secondary;
    position: absolute;
    left: 150px;
    top: -60px;
  }

  .login-form {
    width: 400px;
    padding: 70px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;width: 14px;margin-left: 2px;
    }
    /deep/ #loginButton {
      width: 180px;
      height: 38px;
      font-size: 18px;
      line-height: 1px;
    }
  }

  #validCode {
    object-fit: cover;
    overflow: hidden ;
    height: 40px;
    border: 1px solid $--color-primary;
    border-radius: 3px;
    margin: -1px;

    & > img {
      width: 100%;
    }
  }

  /deep/ #divider {
    margin: 0 0 24px 0;
  }

  /deep/ .el-avatar {
    background-color: $--color-secondary;
  }

  #otherItemRow {
    margin: 0 25px 24px 0;
  }
}
</style>
