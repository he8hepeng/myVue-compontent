/*
 * @Author: HePeng
 * @Date: 2020-04-27 09:40:13
 * @Last Modified by:   HePeng
 * @Last Modified time: 2020-04-27 09:40:13
 */
import Vue from 'vue'

// el-table 触底自动触发
Vue.directive('FDload', {
  bind (el, binding) {
    const dom = el.querySelector('.el-table__body-wrapper')
    dom.addEventListener('scroll', function () {
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= 0) {
        binding.value()
      }
    })
  }
})

// 自动选中
Vue.directive('FDfocus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
