/**
 * Created by zhangxin on 2018/11/13.
 */
import axios from 'axios'
import { Notification } from 'element-ui';
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
    if(res.data.code == 11030113 || res.code == 11030113){
        Notification({
          title: '提示信息',
          message: 'token失效请重新登陆',
          type: 'error',
          duration: '2000'
        })
        setTimeout(function () {
          sessionStorage.clear()
          history.go(0)
          //parent.location.href="http://localhost:8080";
          //正式环境跳转  http://10.220.1.6:30940
          parent.location.href="http://10.220.1.6:30940";
          //测试环境跳转 http://healthcloudweb.tpaas.youedata.com/login
          //parent.location.href="http://healthcloudweb.tpaas.youedata.com/login";
        },2000)
        return false
      }
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
    /**
     * put请求
     * @param target
     * @param params
     * @param header
     * @returns {Promise}
     */
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
    /**
     * delete请求 通过URL传参
     * @param target
     * @param params
     * @param header
     * @returns {Promise}
     */
    delete (target, params = {}, header = {}) {
      return new Promise((resolve, reject) => {
        let headers = { projectId: '0ba94f86769c42a4aba6282834aee3b9'}
        let objKeyLen = Object.keys(header).length
        if (objKeyLen > 0) {
          headers = Object.assign({}, headers, header)
        }
        axios.delete(target, { params, headers }).then(res => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    /**
     * delete请求，后台接收对象类型的参数
     * @param target
     * @param params
     * @param header
     * @returns {Promise}
     */
    delete_data (target, params = {}, header = {}) {
      return new Promise((resolve, reject) => {
        let headers = { projectId: '0ba94f86769c42a4aba6282834aee3b9'}
        let objKeyLen = Object.keys(header).length
        if (objKeyLen > 0) {
          headers = Object.assign({}, headers, header)
        }
        axios.delete(target, { data:params, headers }).then(res => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
  return api
}
