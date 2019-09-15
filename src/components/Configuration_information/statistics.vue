<template>
  <div class="fd-roulstatistics">
    <div class="common_component_header"><span>统计案卡</span></div>
    <div class="fd-roulstatistics_content">
      <el-input
        placeholder="请输入查询关键字"
        v-model="inquire">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="fd-roulstatistics_list">
        <div v-for="(item, index) in list" :key="index" @click="touchList(item, index)" :class="['fd-roulstatistics_list_card', activeIndex == index ? 'fd-active': '']">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inquire: '',
      list: [],
      activeIndex: ''
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      this.axios.get('/roulList', {}, { c: 4 }, res => {
        this.list = res.content
      })
    },
    touchList (_item, _index) {
      this.$store.dispatch('setDefinShow', { '_isShow': false, '_item': {} })
      this.$store.dispatch('setRuleShow', { '_isShow': false, '_item': {} })
      this.activeIndex = _index
      setTimeout(() => {
        this.$store.dispatch('setRuleShow', { '_isShow': true, '_item': _item })
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
  .fd-roulstatistics {
    width: 400px;
    .main-content_border;
    background: #fff;
    height: 100%;

    .fd-roulstatistics_content {
      padding: 10px;
      width: 100%;
      height: calc(100% - 35px);

      .fd-roulstatistics_list {
        height: calc(100% - 50px);
        margin-top: 10px;
        overflow: auto;

        .fd-roulstatistics_list_card {
          height: 30px;
          width: 100%;
          text-indent: 10px;
          line-height: 30px;
          cursor: pointer;
          color: @font-color;

          &:hover {
            background: #d7e5f9;
          }

          &.fd-active {
            background: #d7e5f9;
            color: #2363c9;
          }
        }
      }
    }
  }
</style>
