/**
 * Created by zhangxin on 2018/11/13.
 */
import Vue from 'vue'

export default {
  /**
   * 示例代码，用于基本类型值改变时
   * @param state
   * @param ids
   * @constructor
   */
  SET_LIST: (state, {ids}) => {
    state.string = ids
  },
  /**
   * 添加公司
   * @param state
   * @param companyArr
   * @constructor
   */
  COMMIT_COMPANY: (state, {companyArr}) =>{
    state.companyArr = companyArr
  },
  /**
   * 添加用户权限的状态
   * @param state
   * @param permissions
   * @constructor
   */
  USER_PERMISSIONS: (state, {permissions}) =>{
    state.permissions = permissions
  },
  /**
   * iframe打开更改公共头部信息
   * @param state
   * @param name
   * @constructor
   */
  SET_PUBLIC_NAME :(state, {name}) => {
    state.publicName = name
  },
  /**
   * 登陆成功存储用户信息
   * @param state
   * @param name
   * @param type
   * @constructor
   */
  SET_USER_MASSAGE :(state, {name}) => {
    state.userName = name.name
    state.userType = name.type
    state.userPhone = name.phone
    state.userEmail = name.email
    state.companyName = name.companyName
    state.departmentName = name.departmentName
  },

  /**
   * 存储预览的echart数据
   * @param state
   * @param data
   * @constructor
   */
  SET_CHARTS_DATA :(state, {data}) => {
    state.chartsData = data
  },
  /**
   * 示例代码，用于引用类型(数组/对象)值改变时
   * Vue.set(target, key, value)
   * target  要改的数据源（数组/对象）
   * key     要改的具体值
   * value   重新赋的值
   * @param state
   * @param items
   * @constructor
   */
  SET_ITEMS: (state, {items}) => {
    items.forEach((item, index) => {
      if (item) {
        Vue.set(state.array, index, item)
      }
    })
  }
}
