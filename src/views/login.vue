<template>
  <div class="login">
    <div class="login-background"/>
    <img :src="loginPicture" class="login-picture" width="650" height="530" alt="the internet connect us">
    <el-card>
      <div slot="header" class="title">人类同源重组修复基因突变分析软件</div>
      <login-component class="login-content"/>
      <div class="copyrightContent">
        <el-row type="flex" justify="center" >
          <span class="copyrightText">{{ $store.getters.footerCopyRightTxt }}</span>
        </el-row>
        <el-row type="flex" justify="center" >
          <span class="copyrightText">{{ $store.getters.footerVersionTxt }}</span>
        </el-row>
      </div>
    </el-card>
    <LicenseInfoDialog/>
  </div>
</template>

<script>
import LoginComponent from '@/components/login'
import LicenseInfoDialog from '@/components/LicenseInfoDialog'
import loginPicture from '@/assets/images/login_background_image.png'
export default {
  name: 'Login',
  components: { LoginComponent, LicenseInfoDialog },
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
        background-repeat: no-repeat;
        background-size: 2560px 2560px;
        background-image: url("../assets/images/background.png");
        height: 500px;
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
        background-image: url("../assets/images/background.png");
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

    .el-card__header {
      border: 0;
    }

    .el-card {
      width: 450px;
    }
  }
  .title {
    word-break: break-all;
    text-align: center;
    margin: 15px 10px 5px 10px;
    color: $--color-info;
    font-family: "KaiTi";
    font-weight: 700;
    font-size: 35px;
  }
  .copyrightContent {
    margin-top: 10px;

    .copyrightText {
      font-size: 13px;
    }
  }
</style>
