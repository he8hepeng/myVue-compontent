<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created () {
    let href = location.hostname
  }
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
