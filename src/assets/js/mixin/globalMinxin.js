/*
 * @Author: hepeng
 * @Date: 2019-10-04 00:10:10
 * @Last Modified by: HePeng
 * @Last Modified time: 2020-04-26 17:20:37
 */
import qs from 'qs'
export default {
  install (Vue) {
    Vue.mixin({
      methods: {
        /**
         * 参数格式化
         * @param {params} params
         */
        paramsSerializer (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        /**
         * 文件导出
         *
         * @param {any} res 文件流
         * @param {string} [_name='导出文件'] 文件名称
         * @param {string} [_type='.xls'] 文件尾缀 默认excel
         * @rerurns   {undefined}  无返回值
         */
        _blob (res, _name = '导出文件', _type = '.xls') {
          let _blolType
          switch (_type) {
            case '.xls':
              _blolType = 'application/vnd.ms-excel'
              break
            case '.doc':
              _blolType = 'application/msword'
              break
            case '.docx':
              _blolType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              break
            case '.xlsx':
              _blolType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              break
            case '.ppt':
              _blolType = 'application/vnd.ms-powerpoint'
              break
            case '.pptx':
              _blolType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
              break
            case '.zip':
              _blolType = 'application/octet-stream;charset=utf-8'
          }
          const blob = new Blob([res], {
            type: _blolType
          })
          const fileName = _name + _type
          this.$fileSaver.saveAs(blob, fileName)
        },
        /**
          * 公共的二次确认方法
          * 用于新建 删除等需要二次提示的功能
          * @param {any} _text 提示信息
          * @param {any} success 确认回调
          * @param {any} close 取消回调
          * @rerurns   {undefined}  无返回值
        */
        _confirmMessage (_text, success, close) {
          this.$confirm(_text, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            success()
          }).catch(() => {
            if (close) {
              close()
            }
          })
        },
        /**
          * 消息 提示
          *
          * @param {any} _type 状态 success / error
          * @param {any} _text 提示的信息
          * @param {any} _timer 时间 不传则为2000
          * @rerurns   {undefined}  无返回值
        */
        _messages (_type, _text, _timer) {
          this.$message({
            message: _text,
            type: _type,
            duration: _timer || 2000
          })
        },
        /**
          * 通过某个字段 删除数组中的对象
          *
          * @param {any} _List 目标数列
          * @param {any} _key 需 匹配的字段名
          * @param {any} _data 需 匹配的字段数据
          * @rerurns   {undefined}  无返回值
        */
        _removeListData (_List, _key, _data) {
          return this._.pullAllBy(_List, [_data], _key)
        },
        /**
          * 过滤
          *
          * @param {any} _List 目标数列
          * @param {any} _key 过滤的字段名称
          * @param {any} _data 过滤的字段数据
          * @rerurns   {undefined}  无返回值
        */
        _filter (_list, _key, _data) {
          return this._.filter(_list, [_key, _data])
        },
        /**
          * 两个对象进行枚举 判断对象差异
          *
          * @param {*} object
          * @param {*} base
          * @returns Object
        */
        _difference (object, base) {
          let _this = this
          function changes (object, base) {
            return _this._.transform(object, function (result, value, key) {
              if (!_this._.isEqual(value, base[key])) {
                result[key] = (_this._.isObject(value) && _this._.isObject(base[key])) ? changes(value, base[key]) : value
              }
            })
          }
          return changes(object, base)
        }
      }
    })
  }
}
