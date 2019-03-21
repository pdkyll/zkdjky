/**
 * Created by zhangxin on 2018/11/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      chartsData:'',
      publicName:'',
      companyArr: [],
      permissions:[],
      userName:'',
      userType:'',
      userPhone:'',
      userEmail:'',
      companyName:'',
      departmentName:'',
      /*create_api登陆失效跳转
      *本地环境跳转:http://localhost:8080
      *正式环境跳转:http://10.220.1.10:8002
      *测试环境跳转:http://healthcloudweb.tpaas.youedata.com/login
      */
      login_url:'http://10.220.1.10:8002',
      /*数据管理地址
      *正式环境跳转:http://10.220.1.6:31246
      *测试环境跳转:http://daas-website.tpaas.youedata.com
      */
      data_url:'http://10.220.1.6:31246'
    },
    actions,
    mutations,
    getters
  })
}
