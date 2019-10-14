<template>
  <div id="Nav">
    <el-menu
      :default-active="indexActive"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      :collapse="isCollapse"
      :unique-opened="true">
      <el-menu-item index="example">
        <template slot="title">
          <i class="el-icon-zbpz"></i>
          <span slot="title">演示页面</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState({
      indexActive: state => state.publics.indexActive
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push({ name: key })
    }
  }
}
</script>
<style lang="less" scoped>
#Nav {
  .size(150px;100%);
  overflow: auto;
  margin: auto;
  @{bg_c}: #1655b9;
  .b_r(4px);
}
</style>
