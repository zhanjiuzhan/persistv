<template>
  <div class="login-container">
    <el-avatar :size="128" :src="avatarUrl" icon="el-icon-user-solid" />
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
            <img :src="validCodeImage">
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
import Cookies from 'js-cookie'
import Config from '@/config'
import { validCode } from '@/api/login'
import { convertBase642picture } from '@/utils'
// import { encrypt } from '../utils/rsaEncrypt'
// import { Base64 } from 'js-base64'
export default {
  name: 'LoginComponent',

  data() {
    return {
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
      avatarUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      userNamePlaceholder: '账号/手机号码/邮箱',
      passwordPlaceholder: '密码',
      validCodePlaceholder: '请输入验证码',
      validCodeImage: '',
      rememberMeLabel: '记住我',
      loginText: '登 录',
      loggingText: '登 陆 中...',
      forgetText: '忘记密码',
      registerText: '注册账号',
      quickWayText: '快捷登陆'
    }
  },

  created() {
    this.getCookie()
    this.getCode()
  },

  methods: {
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      if (rememberMe) {
        username && (this.loginForm.username = username)
        password && (this.loginForm.password = password)
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const { username, password, rememberMe } = this.loginForm
          // let encryptPwd = Cookies.get('password')
          // 加密，并且防止在rememberMe的情况下重复加密
          // if (encryptPwd !== plainPwd) {
          //   encryptPwd = Base64.encode(encrypt(plainPwd))
          // }
          if (rememberMe) {
            Cookies.set('username', username, { expires: Config.passCookieExpires })
            // Cookies.set('password', encryptPwd, { expires: Config.passCookieExpires })
            Cookies.set('password', password, { expires: Config.passCookieExpires })
            Cookies.set('rememberMe', rememberMe, { expires: Config.passCookieExpires })
          }
          const userInfo = {
            username,
            password,
            rememberMe
          }
          this.$store.dispatch('user/login', userInfo)
        }
      })
    },
    getCode() {
      validCode().then(res => {
        this.validCodeImage = convertBase642picture(res.img)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #ffffff;
  border: 2px solid #4ebbfe;
  border-radius: 6px;
  position: relative;

  /deep/ .el-avatar--circle {
    border: 2px solid #4ebbfe;
    position: absolute;
    left: 136px;
    top: -70px;
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

  /deep/ #divider {
    margin: 0 0 24px 0;
  }

  #otherItemRow {
    margin: 0 25px 24px 0;
  }
}
</style>
