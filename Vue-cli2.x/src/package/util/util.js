/*
 * @Author: hepeng
 * @Date: 2019-09-30 18:09:43
 * @Last Modified by: hepeng
 * @Last Modified time: 2019-09-30 19:06:48
 */

import timeUtil from './timeUtil.js' // 时间类工具
import tool from './tool.js' // 返回数据类工具
import match from './match.js' // 正则类工具
export default {
  ...timeUtil,
  ...tool,
  ...match
}
