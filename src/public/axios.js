// 引用axios
import {
  Message,
  Loading
} from 'element-ui' // 引入elm组件
import store from '../store/index' // 通过vuex 来存储 token等信息
import axios from 'axios'
// import global from '../api/global' // 通过global来 进行baseURL
let loadingInstance // 请求遮罩
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
    // baseURL: global.baseUrl,
    data: data || null,
    params: params || null,
    withCredentials: false,
    // timeout: 1000,
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
  loadingInstance = Loading.service({
    lock: true,
    text: '努力拉取中 ~>_<~',
    background: 'rgba(0, 0, 0, 0.7)'
  })
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
  loadingInstance.close()
  if (error.response !== undefined) {
    if (error.response.status === 401) {
      // 401 未登录 跳转到login页
      // window.location.href = `login?redirect=http://${window.location.host}/${window.location.hash}`
    } else if (error.response.status === 400 || error.response.status === 500) {
      // 参询 强哥意见 将部分保存信息放入 details，无限时打印 方便开发调试
      if (error.response.data.details) {
        Message.error({
          showClose: true,
          message: error.response.data.details,
          type: 'warning',
          duration: 0
        })
      }
      Message.error(error.response.data.message)
    } else {
      Message.error(error.message)
    }
  }
  return Promise.reject(error)
})
