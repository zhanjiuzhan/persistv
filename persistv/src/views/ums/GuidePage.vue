<template>
  <div>
    <div class="box-card" style="width: 730px; height: 330px;  margin-left: 30%; top: 20%; position: absolute">
      <div style="font-size: small">
        <i class="el-icon-s-home"> 选择平台</i>
      </div>
      <div style="margin: 10px 5px; border: 1px solid; width: 700px; height: 250px; padding: 10px; border-width:1px; border-color: lightgray; box-shadow: 1px 1px 1px rgba(0,0,0,0.1) inset;">
        <span v-for="p in projects" :key="p.id">
          <div style="margin: 10px 18px;  float: left">
            <el-link type="primary" :underline="false" :href="p.url" icon="el-icon-thumb">{{p.name}}</el-link>
          </div>
        </span>
      </div>
      <div>
        <div style="float: left; margin-left: 5px; font-size: small;margin-top: 5px">欢迎您: <span style="color: #66b1ff"> {{username}}</span></div>
        <div style="float: right; margin-right: 3px">
          <el-button size="mini" @click="upUserPasswordDialog=true">修改密码</el-button>
          <el-button size="mini" @click="logout">退 出</el-button>
        </div>
      </div>
    </div>

    <el-dialog title="添加用户" :visible.sync="upUserPasswordDialog" width="20%">
      <div style="height: 170px">
        <el-form :model="form" size="mini" label-width="80px">
          <el-form-item label="密 码">
            <el-input v-model="form.password" style="width: 200px" clearable type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.password1" style="width: 200px" clearable type="password"></el-input>
          </el-form-item>
          <el-form-item label="再确认">
            <el-input v-model="form.password2" style="width: 200px" clearable type="password"></el-input>
          </el-form-item>
        </el-form>
        <div style="float:right; margin: 10px">
          <el-button type="primary" @click="upPasswordSubmit" size="mini" icon="el-icon-edit">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import * as API from '@/api/admApi'
    export default {
        name: "GuidePage",
        data() {
            return {
                username: '未登录',
                projects: [],
                upUserPasswordDialog: false,
                form: {
                    password: '',
                    password1: '',
                    password2: '',
                }
            }
        },
        created: function() {
            API.guideInit().then(data=>{
                if (data === '401') {
                    window.location.href = "http://yyums.4366.com/login.do";
                } else {
                    this.username = data.username;
                    this.projects = data.projects;
                }
            })
        },
        methods: {
            logout: function () {
                API.logout().then(()=>{
                    window.location.href="http://yyums.4366.com/login.do";
                });
            },
            upPasswordSubmit: function () {
                if (!this.form.password) {
                    this.$message.warning("请输入原密码!");
                }
                if (!this.form.password1) {
                    this.$message.warning("请输入新密码!");
                }
                if (!this.form.password2) {
                    this.$message.warning("请再次确认!");
                }
                if (this.form.password1 !== this.form.password2) {
                    this.$message.warning("两次输入密码不一致!");
                }
                API.upPassword({
                    password: this.form.password,
                    password1: this.form.password1,
                    password2: this.form.password2
                }).then((data)=>{
                    if (data == true) {
                        this.$message.success("密码修改成功, 5秒后将跳转到登录!");
                        setTimeout(()=>this.logout(), 5000);
                    } else {
                        this.$message.error("密码修改错误: " + data);
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .box-card {
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1) ;
      padding: 10px;
    }
</style>
