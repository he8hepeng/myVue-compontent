/*
 * @Author: HePeng
 * @Date: 2019-09-12 16:06:15
 * @Last Modified by: Jesse-HePeng
 * @Last Modified time: 2019-09-12 16:33:21
 */
export default {
  state: {
    statistics: {
    },
    definition: {
      item: {},
      isShow: false
    },
    ruleList: {
      item: {},
      isShow: false
    }
  },
  getters: {},
  mutations: {
    GET_FEFINITION_SHOW (state, { _isShow, _item }) {
      state.definition.item = _item
      state.definition.isShow = _isShow
    },
    GET_RULELIST_SHOW (state, { _isShow, _item }) {
      state.definition.item = _item
      state.ruleList.isShow = _isShow
    }
  },
  actions: {
    setDefinShow ({ commit }, _DATA) {
      commit('GET_FEFINITION_SHOW', _DATA)
    },
    setRuleShow ({ commit }, _DATA) {
      commit('GET_RULELIST_SHOW', _DATA)
    }
  }
}
