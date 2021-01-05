<template>
  <div style="padding: 10px 20px">
    <el-tabs v-model="active" @tab-click="activeChangeClick">

      <!-- 用户信息相关操作 -->
      <el-tab-pane label="用户相关" name="user">

      </el-tab-pane>

      <!-- 用户信息相关操作 -->
      <el-tab-pane label="项目相关" name="project">

      </el-tab-pane>

      <!-- 角色信息相关操作 -->
      <el-tab-pane label="角色相关" name="role">

      </el-tab-pane>

      <!-- 权限信息相关操作 -->
      <el-tab-pane label="权限相关" name="permission">
        <div style="padding: 10px 20px">
          <el-form :inline="true" :model="permForm" class="demo-form-inline" size="mini">
            <el-form-item label="项目">
              <el-select v-model="permForm.project" placeholder="项目代号" clearable @change="permProjectSelectChange">
                <el-option v-for="proj in projets" :key="proj" :label="proj" :value="proj"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="permForm.role" placeholder="角色名" clearable >
                <el-option v-for="role in permRoles" :key="role.id" :label="role.name" :value="role.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="查询类型">
              <el-select v-model="permForm.type" @change="showPerm">
                  <el-option label="权限信息" value="1"></el-option>
                  <el-option label="分配信息" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="showPerm" icon="el-icon-search" style="margin-left: 40px">查 询</el-button>
              <el-button type="success" @click="assignRoles" icon="el-icon-check" style="margin-left: 20px">分配角色</el-button>
              <el-button type="danger" @click="delAssigns" icon="el-icon-delete" style="margin-left: 20px">解绑关系</el-button>
              <el-button type="warning" @click="refresePerm" icon="el-icon-refresh-right" style="margin-left: 20px">推 送</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="permData" style="width: 100%" border @selection-change="permTabSelectionChange">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
          <el-table-column prop="project" label="项目" width="80" align="center"></el-table-column>
          <el-table-column prop="domain" label="域名" width="160"></el-table-column>
          <el-table-column prop="name" label="权限名称" width="180"></el-table-column>
          <el-table-column prop="method" label="请求类型" width="80" align="center"></el-table-column>
          <el-table-column prop="url" label="请求路径" ></el-table-column>
          <el-table-column label="角色" width="180"  v-if="permForm.type === '1'">
            <template slot-scope="scope">
              <el-tag type="warning" v-for="tmp in scope.row.roleNames" :key='tmp' size="mini" style="margin-left: 5px">{{ tmp }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="功能点" width="180"  v-if="permForm.type === '1'">
            <template slot-scope="scope">
              <el-tag  v-for="tmp in scope.row.pointNames"  :key='tmp' size="mini" style="margin-left: 5px">{{ tmp }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="权限状态" width="80" align="center" v-if="permForm.type === '1'">
            <template slot-scope="scope">
              <template v-if="scope.row.status === 0">
                <span style="color: #42b983">新增</span>
              </template>
              <template v-else-if="scope.row.status === 1">
                <span style="color: #66b1ff">确认</span>
              </template>
              <template v-else>
                <span style="color: darkgrey">已废弃</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="rname" label="角色名" width="100" align="center" v-if="permForm.type === '2'"></el-table-column>
          <el-table-column prop="updateDate" label="修改时间" width="180" align="center">
            <template slot-scope="scope">
              <template v-if="permForm.type === '1'">
                <span>{{scope.row.updateDate}}</span>
              </template>
              <template v-if="permForm.type === '2'">
                <span>{{scope.row.rUpdateDate}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="创建时间" width="180" align="center">
            <template slot-scope="scope">
              <template v-if="permForm.type === '1'">
                <span>{{scope.row.createDate}}</span>
              </template>
              <template v-if="permForm.type === '2'">
                <span>{{scope.row.rCreateDate}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <template>

                <el-button type="success" @click="assignRole(scope.row)" size="mini"  icon="el-icon-check" v-if="permForm.type === '1' && scope.row.status !== 2">分 配</el-button>
                <el-button type="danger" @click="delPerm(scope.row)" size="mini" icon="el-icon-delete" v-if="scope.row.status === 2">删 除</el-button>
                <el-button type="primary" @click="upPermInfo(scope.row)" size="mini" icon="el-icon-edit" v-if="permForm.type === '1'" >修 改</el-button>

                <el-button type="danger" @click="delAssign(scope.row)" size="mini"  icon="el-icon-delete" v-if="permForm.type === '2'">解 绑</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 功能点信息相关操作 -->
      <el-tab-pane label="功能相关" name="point">
        <div style="padding: 10px 20px">
          <el-form :inline="true" :model="pointForm" size="mini">
            <el-form-item label="项目" label-width="50px">
              <el-select v-model="pointForm.project" placeholder="项目代号" clearable @change="pointProjectSelectChange">
                <el-option v-for="project in projets" :key="project" :label="project" :value="project"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色" label-width="80px">
              <el-select v-model="pointForm.roleNames" placeholder="角色名" clearable multiple >
                <el-option v-for="role in pointRoles" :key="role.id" :label="role.name" :value="role.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展示" label-width="80px"><el-switch v-model="pointForm.show"></el-switch></el-form-item>
            <el-form-item><el-button type="primary" @click="showPoint" style="margin-left: 40px" icon="el-icon-search">查 询</el-button></el-form-item>
            <el-form-item><el-button type="warning" @click="dialogAddPoint = true" style="margin-left: 20px" icon="el-icon-plus">添加功能</el-button></el-form-item>
          </el-form>
        </div>
        <el-table :data="pointInfo" style="width: 100%;" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" ref="pointTable">
          <el-table-column prop="label" label="名称" width="300"></el-table-column>
          <el-table-column prop="type" label="类型" width="100" align="center"></el-table-column>
          <el-table-column label="是否展示" width="100" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.display"><span style="color: #42b983">显示</span></template>
              <template v-else> <span style="color: darkgrey">隐藏</span></template>
            </template>
          </el-table-column>
          <el-table-column prop="method" label="请求类型" width="100" align="center"></el-table-column>
          <el-table-column prop="url" label="路径"></el-table-column>
          <el-table-column prop="roles" label="拥有角色"></el-table-column>
          <el-table-column prop="order" label="顺序" width="50px" align="center"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="pointUpdate(scope.row)" size="mini" icon="el-icon-edit">修 改</el-button>
              <el-button type="danger" @click="pointDelete(scope.row.id, scope.row.label)" size="mini" icon="el-icon-delete">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>


    <el-dialog title="修改权限信息" :visible.sync="upPermInfoDialog" width="25%">
      <div style="height: 220px">
        <el-form :model="upForm" size="mini" label-width="80px">
          <el-form-item label="项目">
            <el-input v-model.number="upForm.project" style="width: 180px" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限ID">
            <el-input v-model.number="upForm.id" style="width: 180px" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限名">
            <el-input v-model.number="upForm.name" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="分配角色">
            <el-select v-model="upForm.roles" multiple clearable style="width: 250px">
              <el-option v-for="role in upRoles" :key="role.id" :label="role.name" :value="role.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="float:right; margin: 10px">
          <el-button type="primary" @click="upPermAndAssignInfoSubmit" size="mini" icon="el-icon-edit">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="功能点添加" :visible.sync="dialogAddPoint" width="480px" :close-on-click-modal="false">
      <el-form ref="form" :model="addPointForm" label-width="80px" size="mini">
        <el-form-item label="项目代号">
          <el-select v-model="addPointForm.project" @change="addPointProjectSelectChange">
            <el-option v-for="project in projets" :key="project" :label="project" :value="project"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="addPointForm.type">
            <el-option label="菜单" value="1"></el-option>
            <el-option label="按钮" value="2"></el-option>
            <el-option label="API" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="addPointForm.name" style="width: 250px"></el-input>
        </el-form-item>

        <el-form-item label="请求路径" v-if="addPointForm.type === '1'">
          <el-input v-model="addPointForm.url" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="权限分配" v-else>
          <el-select v-model="addPointForm.pid" style="width: 320px">
            <el-option v-for="permission in addPointPp" :key="permission.id" :label="permission.des" :value="permission.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="父功能点">
          <el-select v-model="addPointForm.ppid">
            <el-option label="ROOT" value="0"></el-option>
            <el-option v-for="point in addPointPpp" :key="point.id" :label="point.label" :value="point.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="同级顺序">
          <el-input v-model.number="addPointForm.order" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addPoint" icon="el-icon-plus">创 建</el-button>
          <el-button @click="dialogAddPoint = false" icon="el-icon-mouse">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="功能点修改" :visible.sync="dialogUpdatePoint" width="480px" :close-on-click-modal="false">
      <el-form ref="form" :model="updatePointForm" label-width="80px" size="mini">
        <el-form-item label="项目代号">
          <el-select v-model="updatePointForm.project" disabled>
            <el-option v-for="project in projets" :key="project" :label="project" :value="project"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="updatePointForm.type">
            <el-option label="菜单" value="1"></el-option>
            <el-option label="按钮" value="2"></el-option>
            <el-option label="API" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="updatePointForm.name" style="width: 250px"></el-input>
        </el-form-item>

        <el-form-item label="请求路径" v-if="updatePointForm.type === '1'">
          <el-input v-model="updatePointForm.url" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="权限分配" v-else>
          <el-select v-model="updatePointForm.pid" style="width: 320px">
            <el-option v-for="permission in upPointPp" :key="permission.id" :label="permission.des" :value="permission.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="父功能点">
          <el-select v-model="updatePointForm.ppid">
            <el-option label="ROOT" value="0"></el-option>
            <el-option v-for="point in upPointPpp" :key="point.id" :label="point.label" :value="point.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="同级顺序">
          <el-input v-model.number="updatePointForm.order" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePoint" icon="el-icon-plus">修 改</el-button>
          <el-button @click="dialogUpdatePoint = false" icon="el-icon-mouse">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '@/api/admApi'

export default {
    name: 'AdmManagement',
    data() {
      return {
          active: 'user',
          // 初始化信息
          projets: [],
          pmap: {},
          rmap: {},
          ppmap: {},
          permissions: [],

          // 权限相关
          permData: [],
          permRoles: [],
          permForm: {
              project: '',
              role: '',
              type: '1',
          },
          permSelectionData: [],
          upForm: {
              id: '',
              project: '',
              roles: [],
              name: '',
          },
          upPermInfoDialog: false,
          upRoles: [],


          // 功能点相关
          pointRoles: [],
          pointInfo: [],
          pointForm: {
              show: true,
              project: '',
              roleNames: [],
          },
          dialogAddPoint: false,
          addPointForm: {
              project: '',
              type: '1',
              name: '',
              url: '',
              ppid: '',
              pid: '',
              order: '',
          },
          addPointPp: [],
          addPointPpp: [],
          updatePointForm: {
              id: '',
              project: '',
              type: '',
              name: '',
              url: '',
              ppid: '',
              pid: '',
              order: '',
          },
          upPointPp: [],
          upPointPpp: [],
          dialogUpdatePoint: false,



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
        API.getPermissionInitInfos().then((ret)=>{
            this.projets = ret.projects;
            this.rmap = ret.roleMaps;
            this.pmap = ret.permissionMaps;
            this.ppmap = ret.pointMaps;
        });
        this.activeChangeClick();
    },
    methods: {
        /** tab 变化调用 */
        activeChangeClick: function (tab) {
            if (tab && tab.name === 'user') {
                this.showUser();
            }
            if (tab && tab.name === 'project') {

            }
            if (tab && tab.name === 'role') {

            }
            if (tab && tab.name === 'permission') {
                this.showPerm();
            }
            if (tab && tab.name === 'point') {
                this.showPoint();
            }
        },
        /**
         * 显示用户一榄信息
         */
        showUser: function(){

        },
        ////////////////////////////////////
        /**
         * 项目名变化 角色信息变化
         */
        permProjectSelectChange: function(tmp) {
            let val = this.rmap[tmp];
            if (val) {
                this.permRoles = val;
            } else {
                this.permRoles = [];
            }
        },
        /**
         * 显示权限的相关信息
         */
        showPerm: function() {
            let par = {type: Number(this.permForm.type)};
            this.permForm.project ? par.project = this.permForm.project : "";
            this.permForm.role ? par.roleName = this.permForm.role : "";
            API.getPermInfos(par).then(data=>{
                this.permData = data;
            });
        },
        /**
         * 删除权限信息
         */
        delPerm: function(row) {
            this.$confirm('此操作将删除 [' + row.id + '], 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(row.pointNames && row.pointNames.length > 0) {
                    this.$message.warning("请先解绑功能点!");
                    return;
                }
                if(row.roleNames && row.roleNames.length > 0) {
                    this.$message.warning("请先解绑角色!");
                    return;
                }
                API.delPermInfos({id: Number(row.id)}).then(res=>{
                    if (res == true) {
                        this.$message.success("权限: " + row.id + ", 删除成功!");
                        this.showPerm();
                    } else {
                        this.$message.error("权限: " + row.id + ", " + res);
                    }
                });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        /**
         * 刷新权限信息
         */
        refresePerm: function() {
            if (!this.permForm.project) {
                this.$message.warning("请先指定项目名!");
                return;
            }
            API.refreshPerm({project: this.permForm.project}).then(res=>{
                 this.$message.success("项目 " + this.permForm.project + " 权限信息刷新成功!");
            });
        },
        /**
         * 给权限分配角色信息 单个分配
         */
        assignRole: function(row) {
            this.permForm.project = row.project;
            this.permProjectSelectChange(this.permForm.project);
            if (this.permForm.type !== '1') {
                this.$message.warning("请先指定类型为权限信息!");
                return;
            }
            if (!this.permForm.role) {
                this.$message.warning("请先指定角色信息!");
                return;
            }
            API.assignPermToRole({project: this.permForm.project, roleName: this.permForm.role, pid: row.id+""}).then(res=>{
               if (res == true) {
                   this.$message.success("分配成功!");
                   this.showPerm();
               } else {
                   this.$message.error("分配失败!");
               }
            });
        },
        /**
         * 批量分配权限给角色
         */
        assignRoles: function() {
            if (this.permForm.type !== '1') {
                this.$message.warning("请先指定类型为权限信息!");
                return;
            }
            if (!this.permForm.project) {
                this.$message.warning("请先指定项目名!");
                return;
            }
            if (!this.permForm.role) {
                this.$message.warning("请先指定角色信息!");
                return;
            }
            let perms = [];
            this.permSelectionData.forEach(obj=>{
                if (obj.project === this.permForm.project && obj.status !== 2) {
                    perms.push(obj.id);
                }
            });
            if (perms.length < 1) {
                this.$message.warning("请先选择要分配的权限信息!");
                return;
            }
            API.assignPermToRole({project: this.permForm.project, roleName: this.permForm.role, pid: perms.toString()}).then(res=>{
                if (res == true) {
                    this.$message.success("分配成功!");
                    this.showPerm();
                } else {
                    this.$message.error("分配失败!");
                }
            });
        },
        /**
         * table 选择数据
         */
        permTabSelectionChange: function(val) {
            this.permSelectionData = val;
        },
        /**
         * 修改一个权限的信息
         */
        upPermInfo: function(row) {
            this.upForm.id = row.id;
            this.upForm.name = row.name;
            this.upForm.project = row.project;
            this.upForm.roles = [];
            this.upRoles = this.rmap[this.upForm.project];
            this.upPermInfoDialog = true;
        },
        /**
         * 权限相关信息修改
         */
        upPermAndAssignInfoSubmit: function() {
            let para = {
                project: this.upForm.project,
                pid: Number(this.upForm.id),
            };
            if (this.upForm.name) {
                para.name = this.upForm.name;
            }
            if (this.upForm.roles && this.upForm.roles.length > 0) {
                para.roles = this.upForm.roles.toString();
            }
            API.upPermAndAssignInfo(para).then((res)=>{
                if (res == true) {
                    this.$message.success("修改成功!");
                    this.showPerm();
                    this.upPermInfoDialog = false;
                } else {
                    this.$message.error("修改成功!");
                }
            });
        },
        /**
         * 解绑关系
         */
        delAssign: function(row) {
            API.delAssign({pid: row.id, rid: row.rid}).then(res=>{
                if (res == true) {
                    this.$message.success("解绑成功!");
                    this.showPerm();
                } else {
                    this.$message.error("解绑失败!");
                }});
        },
        /**
         * 批量解绑关系
         */
        delAssigns: function() {
            if (this.permForm.type !== '2') {
                this.$message.warning("请先指定类型为分配信息!");
                return;
            }
            let pids = [];
            let rids = [];
            this.permSelectionData.forEach(obj=>{
                pids.push(obj.id);
                rids.push(obj.rid);
            });
            if (pids.length < 1 || rids.length < 1 || rids.length !== pids.length) {
                this.$message.warning("请先选择要分配的权限信息!");
                return;
            }
            API.delAssign({pid: pids.toString(), rid: rids.toString()}).then(res=>{
                if (res == true) {
                    this.$message.success("解绑成功!");
                    this.showPerm();
                } else {
                    this.$message.error("解绑失败!");
                }});
        },
        //////////////////////////////////
        /**
         * 显示功能点相关信息
         */
        showPoint: function() {
            // 做成查询条件 必须指定项目名
            if (this.pointForm.project) {
                let parameters = {show: this.pointForm.show, project: this.pointForm.project};
                this.pointForm.roleNames ? parameters.roleIds = this.pointForm.roleNames.toString() : null;
                // 异步查询
                API.getPointInfo(parameters).then(data=>{
                    this.pointInfo = data.children;
                });
            }
        },
        /**
         * 功能点选择框变化调用函数
         */
        pointProjectSelectChange: function(item) {
            let val = this.rmap[item];
            if (val) {
                this.pointRoles = val;
            } else {
                this.pointRoles = [];
            }
        },
        /**
         * 添加功能点 项目选择变化
         */
        addPointProjectSelectChange: function(item) {
            let val = this.pmap[item];
            if (val) {
                this.addPointPp = val;
            } else {
                this.addPointPp = [];
            }

            let tmp = this.ppmap[item];
            if (tmp) {
                this.addPointPpp = tmp;
            } else {
                this.addPointPpp = [];
            }
        },
        /**
         * 修改功能点信息
         */
        pointUpdate: function(data) {
            this.updatePointForm.id = Number(data.id);
            this.updatePointForm.project = data.project;
            this.updatePointForm.name = data.label;
            if (data.type === '菜单') {
                this.updatePointForm.type = "1";
            }
            if (data.type === 'API') {
                this.updatePointForm.type = "3";
            }
            if (data.type === '按钮') {
                this.updatePointForm.type = "2";
            }
            this.upPointPp = this.pmap[this.updatePointForm.project] ? this.pmap[this.updatePointForm.project] : [];
            this.upPointPpp = this.ppmap[this.updatePointForm.project] ? this.ppmap[this.updatePointForm.project] : [];
            this.updatePointForm.order =data.order;
            this.updatePointForm.pid = '';
            this.updatePointForm.ppid = '';
            this.dialogUpdatePoint = true;
        },
        /**
         * 删除功能点
         * @param item
         */
        pointDelete: function(id, name) {
            if (!this.pointForm.project) {
                this.$message.info('请指定项目名!');
            }
            this.$confirm('此操作将删除 [' + name + '], 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let parameters = {project: this.pointForm.project, id: Number(id)};
                API.delPointInfo(parameters).then(data=>{
                    if (data) {
                        this.$message.warning(data);
                    } else {
                        this.$message.success('删除成功!');
                        this.showPoint();
                    }
                });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        /**
         * 添加一个功能点
         */
        addPoint: function() {
            let parameter = {};
            if (!this.addPointForm.project) {
                this.$message.warning("项目名必须指定!");
                return;
            }
            parameter.project = this.addPointForm.project;
            if (!this.addPointForm.name) {
                this.$message.warning("必须填写名称!");
                return;
            }
            parameter.name = this.addPointForm.name;
            if (this.addPointForm.type !== '1') {
                if (!this.addPointForm.pid) {
                    this.$message.warning("必须指定一个权限为其分配!");
                    return;
                }
                parameter.pid = Number(this.addPointForm.pid);
            } else {
                parameter.pid = -1;
                parameter.url = this.addPointForm.url;
            }

            parameter.type = Number(this.addPointForm.type);
            if (!this.addPointForm.ppid) {
                this.$message.warning("必须指定父节点!");
                return;
            }

            parameter.ppid = Number(this.addPointForm.ppid);
            if (this.addPointForm.order) {
                try {
                    Number(this.addPointForm.order);
                } catch (e) {
                    this.$message.warning("排序必须是数字!");
                }
                parameter.order = Number(this.addPointForm.order);
            } else {
                parameter.order = 0;
            }
            console.info(parameter);
            API.addPoint(parameter).then(res=>{
                if (res) {
                    this.$message.success("添加成功!");
                    this.showPoint();
                } else {
                    this.$message.error("添加失败!");
                }
            })
        },
        /**
         * 修改一个功能点
         */
        updatePoint: function() {
            let parameter = {id: this.updatePointForm.id, project: this.updatePointForm.project};
            if (!this.updatePointForm.name) {
                this.$message.warning("必须填写名称!");
                return;
            }
            parameter.name = this.updatePointForm.name;
            if (this.updatePointForm.type !== '1') {
                if (!this.updatePointForm.pid) {
                    this.$message.warning("必须指定一个权限为其分配!");
                    return;
                }
                parameter.pid = Number(this.updatePointForm.pid);
            } else {
                parameter.pid = -1;
                parameter.url = this.updatePointForm.url;
            }

            parameter.type = Number(this.updatePointForm.type);
            if (!this.updatePointForm.ppid) {
                this.$message.warning("必须指定父节点!");
                return;
            }
            parameter.ppid = Number(this.updatePointForm.ppid);
            if (this.updatePointForm.order) {
                try {
                    Number(this.updatePointForm.order);
                } catch (e) {
                    this.$message.warning("排序必须是数字!");
                }
                parameter.order = Number(this.updatePointForm.order);
            } else {
                parameter.order = 0;
            }

            if (this.updatePointForm.ppid === this.updatePointForm.id) {
                this.$message.warning("父节点不能指向自己!");
                return;
            }

            console.info(parameter);
            API.upPoint(parameter).then(res=>{
                if (res) {
                    this.$message.success("修改成功!");
                    this.showPoint();
                } else {
                    this.$message.error("修改失败!");
                }
            })
        },
        /////////////////////////////////////////////

        delPermissionRelation(pid, rid) {
            API.delPermissionRelation({"pid": Number(pid), "rid": Number(rid)}).then(ret=>{
                this.$message.info("删除成功!");
                this.p1OnSubmit();
            })
        },

    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-table td {
    padding: 6px 0;
  }
</style>
