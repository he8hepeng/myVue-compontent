/*
 * @Author: hepeng
 * @Date: 2019-10-03 16:09:43
 * @Last Modified by: HePeng
 * @Last Modified time: 2019-10-30 15:24:46
 */
export default {
  /**
    * 数字扁平化  1234567890 -> 1,234,567,890
    *
    * @param {*} num
    * @returns string
  */
  _formatNum (num) {
    return JSON.stringify(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  /**
    * 判断属性是否存在与对象上
    *
    * @param {*} _obj 对象
    * @param {*} _key 属性
    * @returns Boolean
  */
  _hasKey (_obj, _key) {
    return _obj.hasOwnProperty(_key)
  },
  /**
    * 数组去重
    *
    * @param {*} _array 数组
    * @returns Array
  */
  _removeDuplication (_array) {
    return [...new Set(_array)]
  },
  /**
    * 排序
    *
    * @param {*} _array 数组
    * @param {string} [_type=true] 默认不传 或true 为升序 不然则为降序
    * @returns Array
  */
  _sortArray (_array, _type = true) {
    return _array.sort((a, b) => {
      if (_type) {
        return a - b
      } else {
        return b - a
      }
    })
  },
  /**
    * 判断数组中是否包含值
    *
    * @param {*} _array 数组
    * @param {*} _item 值
    * @returns Boolean
  */
  _includes (_array, _item) {
    return _array.includes(_item)
  },
  /**
    * 求和 数组
    *
    * @param {*} _array 必须数组以及 数字
    * @returns Array
  */
  _summation (_array) {
    return _array.reduce(function (prev, cur) {
      return prev + cur
    }, 0)
  }

}
