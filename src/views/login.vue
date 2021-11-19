<template>
  <div class="login">
    <div class="login-background"/>
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
export default {
  name: 'Login',
  components: { LoginComponent, LicenseInfoDialog },
  data() {
    return {
      redirect: undefined,
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
    justify-content: end;
    align-items: center;
    height: 100%;
    width: 100%;

    .login-background {
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("../assets/images/background.png");
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: -1;
      -moz-transform: scaleX(-1);
      -webkit-transform: scaleX(-1);
      -o-transform: scaleX(-1);
      transform: scaleX(-1);
    }

    .login-content {
      margin-top: 70px;
    }

    .el-card__header {
      border: 0;
    }

    .el-card {
      width: 450px;
      margin-right: 10%;
    }
  }
  .title {
    word-break: break-all;
    text-align: center;
    margin: 15px 10px 5px 10px;
    font-weight: 600;
    font-size: 30px;
  }
  .copyrightContent {
    margin-top: 10px;

    .copyrightText {
      font-size: 13px;
    }
  }
</style>
