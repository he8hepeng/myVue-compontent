/*
 * @Author: HePeng
 * @Date: 2019-08-04 17:29:09
 * @Last Modified by: HePeng
 * @Last Modified time: 2020-05-28 10:53:51
 */
import Vue from 'vue'
const commonComponentsContext = require.context('./', true, /\.vue$/)
commonComponentsContext.keys().forEach(key => {
  const ctrl =
    commonComponentsContext(key).default || commonComponentsContext(key)
  Vue.component(`api-${key.replace(/(\.\/|\.vue)/g, '')}`, ctrl)
})
