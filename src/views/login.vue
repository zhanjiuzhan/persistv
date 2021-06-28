<template>
  <div class="login">
    <div class="login-background"/>
    <img :src="loginPicture" class="login-picture" width="870" height="494" alt="the internet connect us">
    <el-card>
      <h2 slot="header" class="title">『PERSIST』用户管理系统</h2>
      <login-component class="login-content"/>
    </el-card>
  </div>
</template>

<script>
import LoginComponent from '@/components/login'
import loginPicture from '@/assets/login-picture.png'
export default {
  name: 'Login',
  components: { LoginComponent },
  data() {
    return {
      redirect: undefined,
      loginPicture
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    @media screen and (min-width: 1500px) {
      .login-background {
        background-image: url("../assets/background.png");
        height: 50%;
        width: 100%;
        position: absolute;
        z-index: -1;
      }

      .login-picture {
        margin-right: 100px;
      }
    }

    @media screen and (max-width: 1499px) {
      .login-background {
        background-image: url("../assets/background.png");
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: -1;
      }

      .login-picture {
        display: none;
      }
    }

    .login-content {
      margin-top: 70px;
    }
  }
  .title {
    text-align: center;
    color: #707070;
  }
</style>
