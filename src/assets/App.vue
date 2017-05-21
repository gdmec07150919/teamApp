<template>
  <div id="app">
    <router-view name="header"></router-view>
    <app-body></app-body>
    <router-view></router-view>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from '@/components/footer/footGuide'
export default {
  name: 'app',
  components: { 'foot-guide': footGuide, 'app-body': require('./src/App.vue') }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
