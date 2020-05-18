<template>
  <div id="Header">
    <i class="fd-header_logo"></i>
    <h1 v-text="title"></h1>
    <span v-text="timeSpan" class="fd-time"></span>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      timeSpan: ''
    }
  },
  computed: {
    ...mapState({
      title: state => state.publics.title
    })
  },
  created () {
    this.setInter()
  },
  methods: {
    setInter () {
      setInterval(() => {
        this.timeSpan = this.util._getSetTime()
      }, 1000)
    }
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
      .fz(@font-h1);
      @{m_l}: 130px;
      @{lt_s}: 4px;
      .clr_h(#fff; #ccc);
    }
    .fd-time {
      @{m_l}: 20px;
    }
  }
</style>
