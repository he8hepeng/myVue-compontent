// 引用axios
import {
  Message,
  Loading
} from 'element-ui' // 引入elm组件
// import store from '../store/index' // 通过vuex 来存储 token等信息
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
let loadingInstance: any // 请求遮罩
// 自定义判断元素类型JS
function toType (obj: string) {
  let _Null:any = {}
  return (_Null).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o: any) {
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
 * @param {String} method 方法
 * @param {String} url 地址
 * @param {object} data 实体类body
 * @param {object} params url数据
 * @param {any} success 正确回调
 * @param {any} failure 错误回调
 */
function apiAxios (method: any, url: string, data: object, params: object, success: any, failure: any) {
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
  }).then((res:any) {
    if (res.status === 204) {
      res.data = {
        message: '成功'
      }
    }
    success(res.data.data)
  }).catch((err:any) => {
    if (failure) {
      failure(err)
    }
  })
}
// 返回在vue模板中的调用接口
export default {
  // get请求
  get: function (url: string, data: object, params: object, success: any, failure: any) {
    return apiAxios('GET', url, data, params, success, failure)
  },
  // post请求
  post: function (url: string, data: object, params: object, success: any, failure: any) {
    return apiAxios('POST', url, data, params, success, failure)
  },
  // patch请求
  patch: function (url: string, data: object, params: object, success: any, failure: any) {
    return apiAxios('PATCH', url, data, params, success, failure)
  },
  // put请求
  put: function (url: string, data: object, params: object, success: any, failure: any) {
    return apiAxios('PUT', url, data, params, success, failure)
  },
  // delete
  delete: function (url: string, data: object, params: object, success: any, failure: any) {
    return apiAxios('DELETE', url, data, params, success, failure)
  },
  // 增加 postG请求 按后台要求 get请求在某些情况 需要传实体body so 添加postG请求
  postG: function (url: string, data: object, params: object, success: any, failure: any) {
    return apiAxios('postG', url, data, params, success, failure)
  }
}
// 添加一个请求拦截器
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  loadingInstance = Loading.service({
    lock: true,
    text: '努力拉取中 ~>_<~',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  // config.headers.common['token'] = store.getters.getCookie // 每次发送之前 从vuex拿token携带
  return config
}, (error: any) => {
  return Promise.reject(error)
})
// 添加一个响应拦截器
axios.interceptors.response.use((response: AxiosResponse) => {
  loadingInstance.close()
  // 与后台沟通 204没有实体类 但前台需要实体类用以 promise回调 so 我们自己搞 按照各业务 可以删除或修改
  if (response.status === 204) {
    response.data = {
      content: []
    }
  }
  return response
}, (error: any) => {
  loadingInstance.close()
  let errMsg = '';
  if (error && error.response.status) {
    switch (error.response.status) {
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
        errMsg = error.response.data.msg
        break
    }
  } else {
    errMsg = error
  }

  Message.error(errMsg)
  return Promise.reject(errMsg)
})
