/*
 * @Author: Jesse-HePeng
 * @Date: 2019-09-05 17:02:36
 * @Last Modified by: HePeng
 * @Last Modified time: 2019-12-18 10:10:56
 */
import cookies from '../../package/cookie.js'
export default {
  state: {
    userInfo: {
      userName: ""
    },
    userInfo: {
      corpId: 100000,
      corpName: '浙江',
      deptId: '',
      deptName: ''
    },
    title: "vue前端模板", // 头部等地方的 title名称
    indexActive: "example" // 导航index 当页面刷新 导航自动定位
  },
  getters: {
    getCookie() {
      return cookies.getCookie("token"); // 从cookie 返回token
    },
    getUserInfo: state => {
      // encodeURIComponent() 如果需要传入中文的话，需要encode一下
      let userInfo = JSON.stringify({
        userId: state.userInfo.userid || "",
        // userName: state.userInfo.userName || '',
        corpId: state.corpInfo.corpId || "",
        // corpName: state.corpInfo.corpName || '',
        deptId: state.corpInfo.deptId || ""
        // deptName: state.corpInfo.deptName || ''
      });
      return userInfo;
    }
  },
  mutations: {
    GET_USER(state, _DATA) {
      state.userInfo = _DATA;
    },
    GET_ACTIVE(state, _DATA) {
      state.indexActive = _DATA;
    }
  },
  actions: {
    clearCookie() {
      cookies.deleteCookie("token");
    },
    setUser({ commit }, _DATA) {
      commit("GET_USER", _DATA);
    },
    setActive({ commit }, _DATA) {
      commit("GET_ACTIVE", _DATA);
    }
  }
};
