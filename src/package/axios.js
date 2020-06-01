// 引用axios
import {
  Message,
  Loading
} from 'element-ui' // 引入elm组件
import store from '../store/index' // 通过vuex 来存储 token等信息
import axios from 'axios'
let loadingInstance // 请求遮罩
let modelIndex = 0 // 并发 蒙层计数
let repeatToken = false // 是否tap
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
 * @param {any} params 数据
 * @param {any} success 正确回调
 * @param {any} failure 错误回调
 */
function apiAxios(method, url, data, params, success, failure) {
  if (params && typeof params !== "string") {
    params = filterNull(params);
  }
  axios({
    method: method === "postG" ? "POST" : method,
    url: url,
    data: data || null,
    params: params || null,
    withCredentials: false,
    headers: {
      "X-HTTP-Method-Override": method === "postG" ? "get" : "",
      "Content-Type": "application/json"
    }
  })
    .then(function(res) {
      // if (res.status === 204) {
      //   res.data = {
      //     message: "成功"
      //   };
      // }
      success(res.data);
    })
    .catch(function(err) {
      if (failure) {
        failure(err);
      }
    });
}

/**
 *
 * 下载的接口
 * @param {any} method 方法
 * @param {any} url 地址
 * @param {any} data 实体类body
 * @param {any} params url数据
 * @param {any} success 正确回调
 * @param {any} failure 错误回调
 */
function apiAxiosDownload (method, url, data, params, success, failure) {
  if (params && typeof params !== 'string') {
    params = filterNull(params)
  }
  axios({
    method: 'POST',
    url: url,
    // baseURL: global.configUrl1,
    data: data || null,
    params: params || null,
    responseType: 'blob',
    withCredentials: false
  }).then(function (res) {
    console.log(res)
    success(res.data)
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
    return apiAxios('GET', url, params, success, failure)
  },
  // post请求
  post: function (url, data, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  // patch请求
  patch: function (url, data, params, success, failure) {
    return apiAxios('PATCH', url, params, success, failure)
  },
  // put请求
  put: function (url, data, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  // delete
  delete: function (url, data, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  // 增加 postG请求 按后台要求 get请求在某些情况 需要传实体body so 添加postG请求
  postG: function (url, data, params, postdata, success, failure) {
    return apiAxios('postG', url, params, success, failure)
  },
  // 下载的请求接口
  postDownload: function (url, data, params, success, failure) {
    return apiAxiosDownload('postG', url, data, params, success, failure)
  }
}
// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  // 为了解决 promise.all的 多个参数 无法计算遮罩 增加遮罩计数器
  if (modelIndex === 0) {
    loadingInstance = Loading.service({
      lock: true,
      text: '努力拉取中',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  modelIndex++
  config.headers.common['token'] = store.getters.getCookie // 每次发送之前 从vuex拿token携带
  // config.headers.common['User-Info'] = store.getters.getUserInfo // 将用户信息等数据 放到header中发给后台
  if (config.method == 'get') { // 发现ie下有从缓存拿数据的bug 所以在所有请求加上时间戳
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 添加一个响应拦截器
axios.interceptors.response.use(
  response => {
    closeLoding()
    // 与后台沟通 204没有实体类 但前台需要实体类用以 promise回调 so 我们自己搞 按照各业务 可以删除或修改
    if (response.status === 204) {
      response.data = {
        content: []
      }
    }
    return response
  },
  error => {
    closeLoding()
    if (error.response !== undefined) {
      if (
        error.config.responseType === 'blob' &&
        error.response.data.type === 'application/json'
      ) {
        let reader = new FileReader()
        reader.readAsText(error.response.data, 'utf-8')
        reader.onload = e => {
          Message.error(JSON.parse(reader.result))
        }
      } else {
        Message.error(error.response.data.message)
      }
    }
    return Promise.reject(error)
  }
)

function closeLoding () {
  modelIndex--
  if (modelIndex === 0) {
    if (loadingInstance) {
      if (repeatToken) {
        repeatToken = false
        // validateToken();
      }
      loadingInstance.close()
    }
  }
}

// 校验token 请维护自己项目的 路径地址
function validateToken () {
  apiAxios('GET', 'xxxx', {}, {
    _timer: new Date().getTime()
  }, function (res) {
    store.dispatch('setToken', res)
    repeatToken = true
  }, function (err) {
    redirectToLogin(err.response.data)
  })
}
// 重定向至登录
function redirectToLogin (url) {
  // Message({ message: '权限已过期，请重新登录！', type: 'error', duration: 1500 })
  store.dispatch('setToken', '')
  // 兼容部分IE11
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
  }

  setTimeout(() => {
    window.location.href = url + '/logout?redirect=' + window.location.origin
  }, 1300)
}
