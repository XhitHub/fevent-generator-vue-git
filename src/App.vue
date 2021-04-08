<template>
  <div id="app">
    <Fiction />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Fiction from './components/Fiction.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Fiction
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
