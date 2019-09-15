<template>
  <div id="Header">
    {{title}}
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      title: state => state.publics.title
    })
  }
}
</script>
<style lang="less" scoped>
  #Header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #1d59c4;
    color: #fff;
  }
</style>
