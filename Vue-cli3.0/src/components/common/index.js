/*
 * @Author: HePeng
 * @Date: 2020-04-26 17:29:09
 * @Last Modified by:   HePeng
 * @Last Modified time: 2020-04-26 17:29:09
 */
import Vue from 'vue'
const commonComponentsContext = require.context('./', true, /\.vue$/)
commonComponentsContext.keys().forEach(key => {
  const ctrl =
    commonComponentsContext(key).default || commonComponentsContext(key)
  Vue.component(`api-${key.replace(/(\.\/|\.vue)/g, '')}`, ctrl)
})
