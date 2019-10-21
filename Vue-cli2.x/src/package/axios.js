// 引用axios
import {
  Message,
  Loading
} from 'element-ui' // 引入elm组件
import store from '../store/index' // 通过vuex 来存储 token等信息
import axios from 'axios'
let loadingInstance // 请求遮罩
let modelIndex = 0 // 并发 蒙层计数
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/**
 *
 *
 * @param {any} method 方法
 * @param {any} url 地址
 * @param {any} data 实体类body
 * @param {any} params url数据
 * @param {any} success 正确回调
 * @param {any} failure 错误回调
 */
function apiAxios (method, url, data, params, success, failure) {
  if (params && typeof params !== 'string') {
    params = filterNull(params)
  }
  axios({
    method: method === 'postG' ? 'POST' : method,
    url: url,
    data: data || null,
    params: params || null,
    withCredentials: false,
    timeout: 1000, // 最大请求时间 1S
    headers: {
      'X-HTTP-Method-Override': method === 'postG' ? 'get' : '',
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    if (res.status === 204) {
      res.data = {
        message: '成功'
      }
    }
    success(res.data.data)
  }).catch(function (err) {
    if (failure) {
      failure(err)
    }
  })
}
// 返回在vue模板中的调用接口
export default {
  // get请求
  get: function (url, data, params, success, failure) {
    return apiAxios('GET', url, data, params, success, failure)
  },
  // post请求
  post: function (url, data, params, success, failure) {
    return apiAxios('POST', url, data, params, success, failure)
  },
  // patch请求
  patch: function (url, data, params, success, failure) {
    return apiAxios('PATCH', url, data, params, success, failure)
  },
  // put请求
  put: function (url, data, params, success, failure) {
    return apiAxios('PUT', url, data, params, success, failure)
  },
  // delete
  delete: function (url, data, params, success, failure) {
    return apiAxios('DELETE', url, data, params, success, failure)
  },
  // 增加 postG请求 按后台要求 get请求在某些情况 需要传实体body so 添加postG请求
  postG: function (url, data, params, postdata, success, failure) {
    return apiAxios('postG', url, data, params, success, failure)
  }
}
// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  if (modelIndex === 0) {
    loadingInstance = Loading.service({
      lock: true,
      text: '努力拉取中 ~>_<~',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  modelIndex++
  config.headers.common['token'] = store.getters.getCookie // 每次发送之前 从vuex拿token携带
  return config
}, error => {
  return Promise.reject(error)
})
// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  loadingInstance.close()
  // 与后台沟通 204没有实体类 但前台需要实体类用以 promise回调 so 我们自己搞 按照各业务 可以删除或修改
  if (response.status === 204) {
    response.data = {
      content: []
    }
  }
  return response
}, error => {
  modelIndex--
  if (modelIndex === 0) {
    loadingInstance.close()
  }
  let errMsg = ''
      if (err && err.response.status) {
        switch (err.response.status) {
          case 401:
            errMsg = '登录状态失效，请重新登录'
            // localStorage.removeItem('tsToken')
            // router.push('/login')
            break
          case 403:
            errMsg = '拒绝访问'
            break

          case 408:
            errMsg = '请求超时'
            break

          case 500:
            errMsg = '服务器内部错误'
            break

          case 501:
            errMsg = '服务未实现'
            break

          case 502:
            errMsg = '网关错误'
            break

          case 503:
            errMsg = '服务不可用'
            break

          case 504:
            errMsg = '网关超时'
            break

          case 505:
            errMsg = 'HTTP版本不受支持'
            break

          default:
            errMsg = err.response.data.msg
            break
        }
      } else {
        errMsg = err
      }

      Message.error(errMsg)
      return Promise.reject(errMsg)
})
