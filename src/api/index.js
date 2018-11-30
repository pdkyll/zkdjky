/**
 * Created by zhangxin on 2018/11/13.
 */
import { createAPI } from './create_api'
const api = createAPI()
/**
 * 请求登录接口
 * @param param
 * @returns {*}
 */
export function login (param) {
  return api.post('/apis/v1/session', param)
}
/**
 *
 * @param param
 * @returns {*|Promise}
 */
export function login2 (param) {
  return api.post('/login2', param)
}

/**
 * 角色列表展示
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function roles (param, header) {
  return api.get('/apis/v1/roles', param, header)
}

/**
 * 角色管理-根据角色查询用户
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function getUserForRoles (param, header, urlData) {
  console.log(param, header, urlData)
  return api.get(`/apis/v1/roles/${urlData[0]}/datarole/${urlData[1]}`, param, header)
}

/**
 * 角色管理-删除角色
 * @param header
 * @param urlData
 * @returns {*|Promise}
 */
export function delUserForRoles ( header, urlData) {
  return api.delete(`/apis/v1/roles/${urlData}`, {}, header)
}

/**
 * 角色管理-新增角色
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function insertUserForRoles ( param, header) {
  return api.post('/apis/v1/roles', param, header)
}

/**
 * 角色管理-修改角色
 * @param param
 * @param header
 * @returns {*}
 */
export function updateUserForRoles ( param, header) {
  return api.put('/apis/v1/roles', param, header)
}

/**
 * 角色管理-公司选择列表获取
 * @param param
 * @param header
 * @returns {*}
 */
export function makeCompanySelect ( param, header) {
  return api.get('/apis/v1/resources', param, header)
}



/**
 * 用户列表展示
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function users (param, header) {
  return api.get('/apis/v1/accounts', param, header)
}

/**
 * 用户管理-根据角色查询用户
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function getUserForUsers (param, header, urlData) {
  console.log(param, header, urlData)
  return api.get(`/apis/v1/roles/${urlData[0]}/datarole/${urlData[1]}`, param, header)
}

/**
 * 用户管理-删除角色
 * @param header
 * @param urlData
 * @returns {*|Promise}
 */
export function delUserForUsers ( header, urlData) {
  return api.delete(`/apis/v1/accounts/${urlData}`, {}, header)
}

/**
 * 用户管理-新增角色
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function insertUserForUsers ( param, header) {
  return api.post('/apis/v1/accounts', param, header)
}

/**
 * 用户管理-修改角色
 * @param param
 * @param header
 * @returns {*}
 */
export function updateUserForUsers ( param, header) {
  return api.put('/apis/v1/accounts', param, header)
}



/*
公司设置providerManage
*/
export function providerManage (param, header) {
  return api.get('/apis/v2/daas/meta/providerManage', param, header)
}
/*
公司设置-删除数据del
*/
export function providerManageDel (param, header) {
  return api.delete('/apis/v2/daas/meta/providerManage/del', param, header)
}
/*
公司设置-新增数据insert
*/
export function providerManageInsert (param, header) {
  return api.post('/apis/v2/daas/meta/providerManage/insert', param, header)
}
/**
 * 历史数据-树形结构
 * @returns {*|Promise}
 */
export function historyTree () {
  return api.get('/apis/history/tree')
}
/**
 * 历史数据-列表信息展示
 * @param param
 * @returns {*|Promise}
 */
export function getHistoryInfoByTableName (param) {
  return api.post('/apis/history/getHistoryInfoByTableName', param)
}
/**
 * 历史数据-列表头展示
 * @param param
 * @returns {*|Promise}
 */
export function getHistoryNotesByTableName (param) {
  return api.post('/apis/history/getHistoryNotesByTableName', param)
}
/**
 * 历史数据-公司信息
 * @returns {*|Promise}
 */
export function getHistoryCompany () {
  return api.get('/apis/history/getHistoryCompany')
}
/**
 * 凭证列表-平台公司的列表
 * @returns {*|Promise}
 */
export function getFinanceList () {
  return api.get('/apis/getFinanceList')
}
/**
 * 凭证列表-公司的凭证信息
 * @returns {*|Promise}
 */
export function getFinanceTable (param) {
  return api.post('/apis/getFinanceTableList', param)
}
/**
 * 凭证列表-单条凭证信息的详细内容
 * @param param
 * @returns {*|Promise}
 */
export function getFinanceDetails (param) {
  return api.post('/apis/getFinanceDetails', param)
}
