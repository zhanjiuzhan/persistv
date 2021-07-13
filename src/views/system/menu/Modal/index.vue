<template>
  <el-dialog
    v-loading.lock="loading"
    :title="dialogTitle"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :destroy-on-close="false"
    class="persist-dialog"
    width="40%"
    @open="getMenuInfo"
  >
    <el-form
      ref="form"
      :model="formData"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="上级菜单">
        <TreeSelect v-model="formData.pid" :options="menuInfo" placeholder="请选择上级菜单"/>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="formData.menuType" size="mini">
          <el-radio label="M">目录</el-radio>
          <el-radio label="C">菜单</el-radio>
          <el-radio label="F">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-show="formData.menuType==='M' || formData.menuType==='C'"
        label="图标类型"
      >
        <el-popover
          placement="bottom-start"
          trigger="click"
          width="450"
          @show="$refs['iconSelect'].reset()"
        >
          <IconSelect ref="iconSelect" @selected="selected"/>
          <el-input
            slot="reference"
            v-model="formData.icon"
            placeholder="点击选择图标"
            readonly
          >
            <svg-icon
              v-if="formData.icon"
              slot="prefix"
              :icon-class="formData.icon"
            />
            <i v-else slot="prefix" class="el-icon-search el-input__icon"/>
          </el-input>
        </el-popover>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="菜单名称">
            <el-input v-model="formData.menuName" placeholder="请输入菜单名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序">
            <el-input-number
              v-model.number="formData.orderNum"
              :min="0"
              :max="99"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 目录类型， 菜单类型显示 -->
      <el-row v-show="formData.menuType==='M' || formData.menuType==='C'" :gutter="10">
        <el-col :span="12">
          <el-form-item label="是否外链">
            <el-radio-group v-model="formData.isFrame" size="mini">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="路由地址">
            <el-input v-model="formData.path" placeholder="请输入路由地址"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col v-show="formData.menuType==='C'" :span="12">
          <el-form-item label="组件路径">
            <el-input v-model="formData.component" placeholder="请输入组件路径"/>
          </el-form-item>
        </el-col>
        <el-col v-show="formData.menuType==='C'||formData.menuType==='F'" :span="12">
          <el-form-item label="权限标识">
            <el-input v-model="formData.authorityMark" placeholder="请输入权限标识"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="persit-dialog-footer">
      <el-button @click="visible=false">取消</el-button>
      <el-button type="primary" @click="submitFormData()">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import eventBus from '../../../../utils/eventBus'
import { getAllMenu, setMenu, updateMenu } from '../../../../api/menu'
import IconSelect from '@/components/IconSelect'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'Modal',

  components: { TreeSelect, IconSelect },

  data() {
    return {
      loading: false,
      isEdit: true,
      visible: false,
      dialogTitle: '',
      menuInfo: [],
      formData: {
        pid: '',
        icon: '',
        menuName: '',
        menuType: 'M',
        orderNum: 0,
        path: '',
        component: '',
        isFrame: 0,
        authorityMark: ''
      }
    }
  },

  created() {
    eventBus.$on('addMenu', this.addFormData)
    eventBus.$on('editMenu', this.editFormData)
  },

  destroyed() {
    eventBus.$off('addMenu', this.addFormData)
    eventBus.$off('editMenu', this.editFormData)
  },

  methods: {
    addFormData() {
      this.isEdit = false
      this.dialogTitle = '新增菜单'
      this.formData = {
        menuType: 'M',
        pid: '0',
        isFrame: 0,
        icon: '',
        orderNum: 0,
        path: '',
        component: '',
        authorityMark: ''
      }
      this.visible = true
    },
    editFormData(data) {
      this.isEdit = true
      this.dialogTitle = '编辑菜单'
      this.formData = data
      this.visible = true
    },
    submitFormData() {
      this.loading = true
      if (this.isEdit) {
        updateMenu(this.formData).then(() => {
          eventBus.$emit('reloadList')
          this.visible = false
          this.loading = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }).catch(error => {
          this.visible = false
          this.loading = false
          this.$message({
            message: error.message,
            type: 'error'
          })
        })
      } else {
        setMenu(this.formData).then(() => {
          eventBus.$emit('reloadList')
          this.visible = false
          this.loading = false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }).catch(error => {
          this.visible = false
          this.loading = false
          this.$message({
            type: 'error',
            message: error.message
          })
        })
      }
    },
    getMenuInfo() {
      this.loading = true
      getAllMenu().then(allMenu => {
        const childrenNode2ChildrenProp = (options) => {
          return options.map(item => {
            if (item.childrenNode) {
              return {
                ...item,
                children: childrenNode2ChildrenProp(item.childrenNode),
                label: item.menuName
              }
            }
            return { ...item, label: item.menuName }
          })
        }
        this.menuInfo = [
          {
            id: '0',
            label: '顶级目录',
            children: childrenNode2ChildrenProp(allMenu)
          }
        ]
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
    },
    selected(name) {
      this.formData.icon = name
    }
  }
}
</script>

<style scoped>

</style>
