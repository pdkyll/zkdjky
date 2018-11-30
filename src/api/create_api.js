/**
 * Created by zhangxin on 2018/11/13.
 */
import axios from 'axios'
/**
 * 转换参数形式
 * @param data
 * @returns {string}
 */
let transformRequest = function (data) {
  // let ret = ''
  // for (let it in data) {
  //   ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  // }
  // return ret.substring(0, ret.length - 1)
  return JSON.stringify(data)
}
/**
 * 抽象接口请求方法
 * @returns {*}
 */
export function createAPI () {
  axios.defaults.withCredentials = true
  axios.defaults.timeout = 60000
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  // axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'
  axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8'
  axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'
  axios.interceptors.response.use(res => {
    if (res.status >= 200 && res.status < 400) {
      return res
    }
    return Promise.reject(res)
  }, err => {
    return Promise.reject(new Error({err: err}))
  })
  let api = {
    /**
     * get请求
     * @param target  请求地址
     * @param params  请求参数
     * @returns {Promise}
     */
    get (target, params = {}, header = {}) {
      // let token = getCookie('AUTHENTICATE_TOKEN') || undefined
      let suffix = Object.keys(params).map(name => {
        return `${name}=${params[name]}`
      }).join('&')

      let urls = suffix.length > 0 ? `${target}?${suffix}` : `${target}`
      // let urls = (suffix.length>0 ? `${target}?${suffix}&` : `${target};`) + !token ? ``:`JSESSIONID=${token}`
      return new Promise((resolve, reject) => {
        let headers = { projectId: '0ba94f86769c42a4aba6282834aee3b9'}
        let objKeyLen = Object.keys(header).length
        if (objKeyLen > 0) {
          headers = Object.assign({}, headers, header)
        }
        axios.get(urls, { headers }).then(res => {
          resolve(res)
        }).then(err => {
          reject(err)
        })
      })
    },
    /**
     * post请求
     * @param target  请求地址
     * @param params  请求参数
     * @returns {Promise}
     */
    post (target, params = {}, header = {}) {
      // let token = getCookie('AUTHENTICATE_TOKEN')
      return new Promise((resolve, reject) => {
        let headers = {projectId: '0ba94f86769c42a4aba6282834aee3b9'}
        let objKeyLen = Object.keys(header).length
        if (objKeyLen > 0) {
          headers = Object.assign({}, headers, header)
        }
        axios.post(target, typeof params !== 'string' ? transformRequest(params) : params, {headers}).then(res => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    put (target, params = {}, header = {}) {
      let headers = { projectId: '0ba94f86769c42a4aba6282834aee3b9'}
      let objKeyLen = Object.keys(header).length
      if (objKeyLen > 0) {
        headers = Object.assign({}, headers, header)
      }
      return new Promise((resolve, reject) => {
        axios.put(target, params,{headers}).then(res => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    delete (target, params = {}, header = {}) {
      return new Promise((resolve, reject) => {
        let headers = { projectId: '0ba94f86769c42a4aba6282834aee3b9'}
        let objKeyLen = Object.keys(header).length
        if (objKeyLen > 0) {
          headers = Object.assign({}, headers, header)
        }
        axios.delete(target, {params, headers}).then(res => {
          console.log(params, headers)
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
  return api
}
