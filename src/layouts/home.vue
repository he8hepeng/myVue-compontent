<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 21:44:40
 * @LastEditTime: 2019-09-15 21:44:40
 * @LastEditors: your name
 -->
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
        .size(100%;
        100%);
        @{bg_c}: #ecf1f9;
        .global_content {
            .size(100%;
            calc(100% - 60px));
            .flex_box();
            .global_leftNav {
                .size(170px;
                100%);
                padding: 10px;
            }
            .global_rightCont {
                display: -webkit-box;
                height: 100%;
                padding: 10px;
                @{p_l}: 0px;
                .list(flex);
                .flex_box();
            }
        }
    }
</style>
