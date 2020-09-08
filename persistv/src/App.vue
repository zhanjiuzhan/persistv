<template>
  <div id="app">
    <app-header></app-header>
    <div>
      <div id="menu">
        <app-menu></app-menu>
      </div>
      <div id="content">
        <router-view/>
      </div>
      <div style="clear: both"></div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/Header'
import AppFooter from './components/Footer'
import AppMenu from './components/Menu'
export default {
    name: 'App',
    components: {
        AppHeader,
        AppFooter,
        AppMenu,
    }
}
</script>

<style>
/**@import url("assets/css/");*/
body {
  padding: 0;
  margin: 0;
}

#menu {
  float: left;
  padding: 0;
  margin: 0;
  width: 15%;
}

#content {
  float: left;
  padding: 0;
  margin: 0;
  width: 85%;
}
</style>
