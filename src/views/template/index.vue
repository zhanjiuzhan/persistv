<template>
  <div className="page-content">
    <img :src="imgURL" width="600px">
    <label>功能正在开发中，请等待!</label>
  </div>
</template>

<script>
import imgURL from '@/assets/images/not-complete.svg'

export default {
  name: 'PageTemplate',

  data() {
    return {
      imgURL
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  overflow: auto;
  background-color: $--second-backgroud-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
