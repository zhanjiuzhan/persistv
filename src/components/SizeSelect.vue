<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icons class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'SizeSelect',

  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },

  computed: {
    size() {
      return this.store.getters.size
    }
  },

  methods: {
    handleSetSize(size) {
      this.$el.size = size
      this.$store.dispatch('setSize', size)
      this.refreshView()
      this.$message({
        message: '布局设置成功',
        type: 'success'
      })
    },
    refreshView () {
      this.$store.dispatch('')

      const { fullpath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: 'redirect' + fullpath
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
