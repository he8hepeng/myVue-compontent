<template>
  <div id="global_entrance">
    <my-header></my-header>
    <div class="global_content">
      <div class="global_leftNav">
        <my-nav></my-nav>
      </div>
      <div class="global_rightCont">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import myNav from './nav.vue'
import myHeader from './header.vue'
export default {
  components: {
    myNav,
    myHeader
  }
}
</script>

<style lang="less" scoped>
  #global_entrance {
    width: 100%;
    height: 100%;
    background: #ecf1f9;

    .global_content {
      height: calc(100% - 40px);
      width: 100%;
      display: -webkit-box;

      .global_leftNav {
        width: 170px;
        height: 100%;
        padding: 10px;
      }
      .global_rightCont {
        display: flex;
        flex: 1;
        display: -webkit-box;
        height: 100%;
        padding: 10px;
        padding-left: 0;
      }
    }
  }
</style>
