<template>
  <div class="login">
    <div class="login-background"/>
    <img :src="loginPicture" class="login-picture" width="650" height="530" alt="the internet connect us">
    <el-card>
      <div slot="header" class="title">人类同源重组修复基因突变分析软件</div>
      <login-component class="login-content"/>
    </el-card>
    <el-dialog
      v-loading.lock="loading"
      :show-close="false"
      :title="dialogTitle"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      class="persist-dialog"
      width="30%"
    >
      <el-form ref="form" :model="formData">
        <el-form-item label="激活码">
          <el-input v-model="formData.license" placeholder="请输入激活码以正常使用该程序"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="presit-dialog-footer">
        <el-button type="primary" @click="registryProgram">激活</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LoginComponent from '@/components/login'
import loginPicture from '@/assets/images/login_background_image.png'
import { getActivate, registry } from '@/api/strategy'
export default {
  name: 'Login',
  components: { LoginComponent },
  data() {
    return {
      loading: false,
      dialogTitle: '激活程序',
      visible: false,
      redirect: undefined,
      formData: {
        license: '',
      },
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
  },
  created () {
    getActivate().then(res => {
      if (res !== 'Y') {
        this.visible = true
      }
    })
  },
  methods: {
    registryProgram() {
      registry(this.formData).then(res => {
        this.visible = false
        this.$message({
          message: '激活成功',
          type: 'success'
        })
      }).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
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
</style>
