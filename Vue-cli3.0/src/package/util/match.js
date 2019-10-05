/*
 * @Author: hepeng  正则
 * @Date: 2019-10-04 00:10:10
 * @Last Modified by: hepeng
 * @Last Modified time: 2019-10-04 00:10:10
 * @returns Boolean
 */

export default {
  _phone (_phone) { // 验证手机号
    return /^1[3|4|5|8][0-9]\d{4,8}$/.test(_phone)
  },
  _name (_name) { // 姓名
    return /^[\u4E00-\u9FA5]{2,4}$/.test(_name)
  },
  _Illegal_Character (_string) { // 非法字符
    return /^[a-zA-Z0-9]+$/.test(_string)
  },
  _idcard (_id) { // 身份证号
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(_id)
  }
}
