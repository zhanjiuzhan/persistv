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
          <el-button size="mini">修改密码</el-button>
          <el-button size="mini" @click="logout">退 出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import * as API from '@/api/admApi'
    export default {
        name: "GuidePage",
        data() {
            return {
                username: '未登录',
                projects: [{
                    id: 1,
                    url: 'http://www.baidu.com',
                    name: 'Baidu',
                }],
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
                console.log("close");
                API.logout().then(()=>{
                    let userAgent = navigator.userAgent;
                    if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
                        window.location.href="http://yyums.4366.com/login.do";
                        window.close();
                    } else {
                        window.opener = null;
                        window.open("", "_self");
                        window.close();
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
