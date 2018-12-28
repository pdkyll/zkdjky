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
    const { userName,userType,userPhone, userEmail, companyName, departmentName} = state
    return { userName,userType,userPhone, userEmail, companyName, departmentName}
  },
  getPermissions (state) {
    const { permissions } = state
    return permissions
  },
  /*获取预览echart数据*/
  getChartData(state){
    const {chartsData} = state
    return chartsData
  }
}
