<template>
  <div id="Nav">
    <el-menu
      :default-active="indexActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :unique-opened="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-zbpz"></i>
          <span slot="title">决策管理</span>
        </template>
      </el-submenu>
      <!--  -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-zbpz"></i>
          <span slot="title">信息监管</span>
        </template>
        <!-- 信息审核 -->
        <el-submenu index="2-1">
          <template slot="title">信息审核</template>
          <router-link :to="{ name: 'baseVisualization' }">
            <el-menu-item index="2-7-1">基础表审核</el-menu-item>
          </router-link>
        </el-submenu>
        <!-- 信息审核 -->
        <el-submenu index="2-2">
          <template slot="title">基础资源</template>
          <el-menu-item index="2-2-1">不知道</el-menu-item>
        </el-submenu>
        <!-- 数据预警 -->
        <el-menu-item index="2-3">数据预警</el-menu-item>
        <!-- 数据定义 -->
        <el-submenu index="2-4">
          <template slot="title">数据定义</template>
          <el-menu-item index="2-4-1">不知道</el-menu-item>
        </el-submenu>
        <!-- 技术配置 -->
        <el-submenu index="2-5">
          <template slot="title">技术配置</template>
          <el-menu-item index="2-5-1">不知道</el-menu-item>
        </el-submenu>
        <!-- 信息分配 -->
        <el-submenu index="2-6">
          <template slot="title">信息分配</template>
          <el-menu-item index="2-6-1">不知道</el-menu-item>
        </el-submenu>
        <!-- 信息配置 -->
        <el-submenu index="2-7">
          <template slot="title">信息配置</template>
          <router-link :to="{ name: 'configuration' }">
            <el-menu-item index="2-7-1">案卡填录规则定义</el-menu-item>
          </router-link>
        </el-submenu>
      </el-submenu>
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
  }
}
</script>
<style lang="less" scoped>
#Nav {
  width: 150px;
  height: 100%;
  overflow: auto;
  margin: auto;
  background: #1655b9;
}
</style>
