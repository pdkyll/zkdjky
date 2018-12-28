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
      departmentName:''
    },
    actions,
    mutations,
    getters
  })
}
