<template>
  <div id="configuration">
    <statistics></statistics>
    <div class="fd-configuration_leftCont">
      <rule-list></rule-list>
      <definition></definition>
    </div>
  </div>
</template>

<script>
import statistics from '@/components/Configuration_information/statistics.vue'
import ruleList from '@/components/Configuration_information/ruleList.vue'
import definition from '@/components/Configuration_information/definition.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    statistics,
    ruleList,
    definition
  }
}
</script>

<style lang="less" scoped>
  #configuration {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: -webkit-box;

    .fd-configuration_leftCont {
      flex: 1;
      padding-left: 10px;
      height: 100%;
    }
  }
</style>
