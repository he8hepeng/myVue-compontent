/*
 * @Author: Jesse-HePeng
 * @Date: 2019-09-05 17:02:36
 * @Last Modified by: HePeng
 * @Last Modified time: 2019-09-19 22:04:50
 */
import cookies from '../../public/cookie.js'
export default {
  state: {
    userInfo: {
      userName: ''
    },
    title: '统一业务应用系统', // 头部等地方的 title名称
    indexActive: '1'
  },
  getters: {
    getCookie () {
      return cookies.getCookie('token')
    }
  },
  mutations: {
    GET_USER (state, _DATA) {
      state.userInfo = _DATA
    },
    GET_ACTIVE (state, _DATA) {
      state.indexActive = _DATA
    }
  },
  actions: {
    setUser ({ commit }, _DATA) {
      commit('GET_USER', _DATA)
    },
    setActive ({ commit }, _DATA) {
      commit('GET_ACTIVE', _DATA)
    }
  }
}
