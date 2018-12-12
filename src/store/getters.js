/**
 * Created by zhangxin on 2018/11/13.
 */
export default {
  getCompanyArr (state){
    const {companyArr} = state
    return companyArr
  },
  /**
   * 获取公共头部的信息
   * @param state
   * @returns {*}
   */
  getPublicName (state) {
    const { publicName } = state
    return publicName
  },

  getUserMassage (state) {
    const { userName,userType} = state
    return { userName,userType}
  }
}
