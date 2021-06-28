<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',

  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
section.app-main {
  height: calc(100vh - 40px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 90px 15px 10px;
}

/deep/ .hasTagView {
  .app-main {
    height: calc(100vh - 110px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
.el-popup-parent--hidden {
  /deep/ .fixed-header {
    padding-right: 15px;
  }
}
</style>
