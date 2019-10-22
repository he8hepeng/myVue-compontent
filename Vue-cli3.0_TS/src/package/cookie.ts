/*
 * @Author: HePeng
 * @Date: 2019-09-08 14:56:01
 * @Last Modified by: Jesse-HePeng
 * @Last Modified time: 2019-09-10 14:57:05
 */
// npm install vue-cookies --save
import VueCookies from 'vue-cookies'

console.log(VueCookies)

const cookies = {
  getCookie(key: string): any {
    return VueCookies.get(key)
  },
  setCookie(key: string, value: any) {
    VueCookies.set(key, value)
  },
  deleteCookie(key: string): void {
    VueCookies.remove(key)
  },
  isCookie(key: string): void {
    VueCookies.isKey(key)
  },
  hasKeys(): boolean {
    return VueCookies.keys()
  },
}

export default cookies
