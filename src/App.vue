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
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 10px;
  height: 100%;
  background-color: #2c3e50;
  color: #EEE;
}
</style>
