<template>
  <div>
    <el-table
      v-loading="loading"
      id="userInfoTable"
      :data="data"
      border
      class="persist-table"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="username"
        label="用户名"
      />
      <el-table-column
        prop="nickname"
        label="昵称"
      />
      <el-table-column
        label="锁定状态"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :inactive-value="1"
            :active-value="0"
            active-color="#34797F"
            inactive-color="#BC3232"
            @change="changeState(scope.row)"
          />
          <div class="state-icon">
            <i v-if="scope.row.state === 0" class="el-icon-unlock unlock"/>
            <i v-else-if="scope.row.state === 1" class="el-icon-lock lock"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <slot :row="scope.row"/>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="size"
      :current-page.sync="current"
      :total="total"
      :page-sizes="sizeList"
      layout="total, prev, pager, next, sizes"
      class="persist-pagination"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import initData from '@/mixins/initData'
import eventBus from '@/utils/eventBus'
import { updateUserInfo } from '@/api/user'

export default {
  name: 'List',

  mixins: [initData],

  created() {
    this.$nextTick(() => {
      this.init()
    })
    eventBus.$on('reloadList', this.init)
    eventBus.$on('query', this.search)
  },

  destroyed() {
    eventBus.$off('reloadList', this.init)
    eventBus.$off('query', this.search)
  },

  methods: {
    init() {
      this.url = '/sys/user/page'
      this.params = {
        current: this.current,
        size: this.size,
        pages: this.pages,
        total: this.total
      }
    },
    search(query) {
      this.query = query
    },
    changeState(data) {
      const { id, state } = data
      const stateMessage = state === 1 ? '锁定' : '解锁'
      this.$confirm(`此操作将${stateMessage}该用户，是否继续？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateUserInfo(id, data).then(res => {
          this.$message({
            type: 'success',
            message: `用户${stateMessage}成功！`
          })
        }).catch(error => {
          data.state = state === 0 ? 1 : 0
          this.$message({
            type: 'error',
            message: error.message
          })
        })
      }).catch(() => {
        data.state = state === 0 ? 1 : 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.state-icon {
  padding-left: 5px;
  display: inline-block;
  font-size: 20px;
  vertical-align: middle;

  & > .lock {
    color: #BC3232;
  }

  & > .unlock {
    color: #34797F;
  }
}
</style>
