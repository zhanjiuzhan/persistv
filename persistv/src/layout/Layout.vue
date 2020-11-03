<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { test } from '@/api/test'
export default {
  name: 'Layout',
  mounted() {
    test('test2.do').then(res => {
      debugger
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
