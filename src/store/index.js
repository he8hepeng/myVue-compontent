import Vue from 'vue'
import Vuex from 'vuex'
import publics from './modules/public' // 全局数据
import configurationInformation from './modules/Configuration_information' // 案卡定义
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    publics,
    configurationInformation
  }
})
