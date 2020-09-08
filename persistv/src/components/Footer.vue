<template>
  <div id="footer">
    <el-tag type="info">Footer</el-tag>
  </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
  #footer {
    position: fixed;
    top: calc(100% - 40px);
    left: 0px;
    z-index: 999;
  }
</style>
