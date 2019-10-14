/*
 * @Author: HePeng
 * @Date: 2019-09-08 14:56:01
 * @Last Modified by: Jesse-HePeng
 * @Last Modified time: 2019-09-10 14:57:05
 */
// npm install vue-cookies --save
import VueCookies from 'vue-cookies'

export default {
  getCookie (key) {
    return VueCookies.get(key)
  },
  setCookie (key, value) {
    VueCookies.set(key, value)
  },
  deleteCookie (key) {
    VueCookies.remove(key)
  },
  isCookie (key) {
    VueCookies.isKey(key)
  },
  hasKeys () {
    return VueCookies.keys()
  }
}
