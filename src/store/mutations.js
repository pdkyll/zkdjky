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
