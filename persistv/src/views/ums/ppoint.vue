<template>
  <div style="padding: 10px 20px">
    <el-tabs v-model="activeName" @tab-click="handleClick" t>
      <el-tab-pane label="权限一榄" name="p1">
        <div style="padding: 10px 20px">
          <el-form :inline="true" :model="p1Form" class="demo-form-inline">
            <el-form-item label="项目">
              <el-select v-model="p1Form.project" placeholder="项目代号" clearable @change="projectSelectChange">
                <el-option v-for="item in projets" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="p1Form.roleName" placeholder="角色名" clearable >
                <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="p1OnSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="permissionData" style="width: 100%" border>
          <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
          <el-table-column prop="project" label="项目" width="100" align="center"></el-table-column>
          <el-table-column prop="domain" label="域名" width="180"></el-table-column>
          <el-table-column prop="name" label="权限名称" width="200"></el-table-column>
          <el-table-column prop="method" label="请求类型" width="80" align="center"></el-table-column>
          <el-table-column prop="url" label="请求路径" ></el-table-column>
          <el-table-column label="请求状态" width="100" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.status === 0">
                <span style="color: #42b983">新增</span>
              </template>
              <template v-else-if="scope.row.status === 1">
                <span>正常</span>
              </template>
              <template v-else>
                <span style="color: darkgrey">已废弃</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="rname" label="角色名" width="100" align="center"></el-table-column>
          <el-table-column prop="rUpdateDate" label="分配时间" width="180" align="center"></el-table-column>
          <el-table-column prop="updateDate" label="修改时间" width="180" align="center"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" width="180" align="center"></el-table-column>
          <el-table-column label="解除角色" width="100" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.rname">
                <el-button type="danger" @click="delPermissionRelation(scope.row.id, scope.row.rid)" size="mini">解除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div style="float: right; padding: 20px">
          <el-button type="primary" @click="dialogAssignRole = true">分配角色</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="功能一榄" name="p2">
        <div style="padding: 10px 20px">
          <el-form :inline="true" :model="p1Form" class="demo-form-inline">
            <el-form-item label="项目">
              <el-select v-model="p2Form.project" placeholder="项目代号" clearable @change="projectSelectChange">
                <el-option v-for="item in projets" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="p2Form.roleNames" placeholder="角色名" clearable multiple >
                <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="显示">
                <el-switch v-model="ppermissionShow"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="p2OnSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="permissionPData" style="width: 100%;" row-key="id" border default-expand-all
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}" ref="ppermissionTable">
          <el-table-column prop="label" label="名称" width="300"></el-table-column>
          <el-table-column prop="type" label="类型" width="100" align="center"></el-table-column>
          <el-table-column label="是否展示" width="100" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.display">
                <span style="color: #42b983">显示</span>
              </template>
              <template v-else>
                <span style="color: darkgrey">隐藏</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="method" label="请求类型" width="100" align="center"></el-table-column>
          <el-table-column prop="url" label="路径"></el-table-column>
          <el-table-column prop="roles" label="拥有角色"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="分配角色" :visible.sync="dialogAssignRole" width="30%" >
      <div>
        <el-form :model="p1Form" class="demo-form-inline">
          <el-form-item label="项目">
            <el-select v-model="assignRoleForm.project" placeholder="项目代号" clearable @change="projectSelectChange" style="width:300px" >
              <el-option v-for="item in projets" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="assignRoleForm.permission" placeholder="项目代号" clearable style="width:400px" >
              <el-option v-for="item in permissions" :key="item.id" :label="item.des" :value="item.id" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="assignRoleForm.roleNames" placeholder="角色名" clearable multiple style="width:400px" >
              <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="assignRole">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import * as API from '@/api/admApi'

export default {
    name: 'Ppoint',
    data() {
      return {
          activeName: 'p1',
          projets: [],
          roles: [],
          permissions: [],
          pmap: {},
          rmap: {},
          p1Form: {
              project: '',
              roleName: ''
          },
          p2Form: {
              project: '',
              roleNames: ''
          },
          permissionData: [],
          permissionPData: [],
          dialogAssignRole: false,
          assignRoleForm: {
              project: '',
              roleNames: '',
              permission: '',
          },
          ppermissionShow: true,
      }
    },
    created: function() {
        this.handleClick({name: 'p1'});
        API.getPermissionInitInfos().then((ret)=>{
            this.projets = ret.projects;
            this.rmap = ret.roleMaps;
            this.pmap = ret.permissionMaps;
        });
    },
    methods: {
        handleClick: function (tab, event) {
            if (tab.name === 'p1') {
                this.p1OnSubmit();
            }
            if (tab.name === 'p2') {
                this.p2OnSubmit();
            }
        },
        p1OnSubmit: function () {
            let par = {};
            this.p1Form.project ? par.project = this.p1Form.project : null;
            this.p1Form.roleName ? par.roleName = this.p1Form.roleName : null;
            API.getPermissionInfos(par).then(data=>{
                this.permissionData = data;
            });
        },
        p2OnSubmit: function() {
            let par = {show: this.ppermissionShow};
            if (this.p2Form.project) {
                par.project = this.p2Form.project
            } else {
                return;
            }
            this.p2Form.roleNames ? par.rid = this.p2Form.roleNames.toString() : null;
            API.getPermissionPInfos(par).then(data=>{
                this.permissionPData = data.children;
            });
        },
        projectSelectChange: function (item) {
            let val = this.rmap[item];
            if (val) {
                this.roles = val;
            } else {
                this.roles = [];
            }
            let tmp = this.pmap[item];
            if (tmp) {
                this.permissions = tmp;
            } else {
                this.permissions = [];
            }
            this.p1Form.roleName = "";
            this.assignRoleForm.roleNames = "";
            this.assignRoleForm.permission = "";
            console.info(this.roles);
        },
        delPermissionRelation(pid, rid) {
            API.delPermissionRelation({"pid": Number(pid), "rid": Number(rid)}).then(ret=>{
                this.$message.info("删除成功!");
                this.p1OnSubmit();
            })
        },
        assignRole() {
            API.assignPermissionRelation({"pid": Number(this.assignRoleForm.permission), "rid": this.assignRoleForm.roleNames.toString()}).then(ret=>{
                this.$message.info("分配成功!");
                this.p1OnSubmit();
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
