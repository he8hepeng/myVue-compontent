<template>
  <div id="Header">
    <i class="fd-header_logo"></i>
    <h1 v-text="title"></h1>
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
    .size(100%;60px);
    .hh(60px);
    @{bg_c}: #1d59c4;
    color: #fff;
    @{p_l}: 20px;
    .pt(r);

    .fd-header_logo {
      .size(110px;34px);
      .dib();
      .posi-center_c();
      @{bg_i}: url(../assets/img/logo.png);
      .bg_max();
    }
    h1 {
      .dib();
      font-weight: bold;
      font-size: @font-h1;
      @{m_l}: 130px;
      @{lt_s}: 4px;
      .clr_h(#fff; #ccc);
    }
  }
</style>
