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
 * 请求推出接口
 * @param param
 * @returns {*|Promise}
 */
export function logout (header) {
  return api.delete('/apis/v1/session',{}, header)
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
  return api.get(`/apis/v1/roles/${urlData[0]}/datarole/${urlData[1]}`, param, header)
}

/**
 * 角色管理-删除角色
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function delUserForRoles (param, header) {
  return api.delete_data('/apis/v1/rolesAndPermissions', param, header)
}

/**
 * 角色管理-新增角色
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function insertUserForRoles ( param, header) {
  return api.post('/apis/v1/rolesAndPermissions', param, header)
}
/**
 * 角色管理-修改角色回显权限
 * @param param
 * @param header
 * @returns {*}
 */
export function updateUserEcho ( param, header) {
  return api.get('/apis/v1/role/permissions', param, header)
}

/**
 * 角色管理-修改角色
 * @param param
 * @param header
 * @returns {*}
 */
export function updateUserForRoles ( param, header) {
  return api.put('/apis/v1/rolesAndPermissions', param, header)
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
export function updateUserForUsers ( param, header, urlData) {
  return api.put(`/apis/v1/accounts/${urlData}`, param, header)
}

/**
 * 公示信息-列表展示
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function publicMsg (param, header) {
  return api.get('/apis/publicInformation/publicInformation', param, header)
}

/**
 * 公示信息-下载文件
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function linkDownload (param, header) {
  return api.get('/apis/publicInformation/linkDownload', param, header)
}

/*
公司设置providerManage
*/
export function providerManage (param, header) {
  return api.get('/apis/v2/daas/meta/providerManage', param, header)
}
/**
 * 公司设置-获取部门的下拉菜单
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function getDepartment (param, header) {
  return api.get('/apis/v2/daas/meta/providerManageByCode', param, header)
}
/**
 * 公司设置-修改公司信息
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function providerManageUpdate (param, header) {
  return api.put('/apis/v2/daas/meta/providerManage/update', param, header)
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
 * 部门设置-查询部门列表
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function providerManageCmpAndDep (param, header) {
  return api.get('/apis/v2/daas/meta/providerManageCmpAndDep', param, header)
}
/**
 * 部门设置-根据公司的code获取部门列表
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function providerManageByCode (param, header) {
  return api.get('/apis/v2/daas/meta/providerManageByCode', param, header)
}
/**
 * 部门设置-批量插入部门
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function insertDepartment (param, header) {
  return api.post('/apis/v2/daas/meta/providerManage/insertDepartment', param, header)
}
/**
 * 部门设置-获取公司列表
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function providerManageFindNameId (param, header) {
  return api.get('/apis/v2/daas/meta/providerManageFindNameId', param, header)
}
/**
 * 公示管理-列表
 * @returns {*|Promise}
 */
export function publicInformationList(param, header) {
  return api.get('/apis/publicInformation/list', param, header)
}
/**
 * 公示管理-修改公示信息
 * @param param
 * @param header
 * @param urlData
 * @returns {*|Promise}
 */
export function publicInformationUpdate(param, header, urlData) {
  return api.get(`/apis/publicInformation/up/${urlData}`, param, header)
}
/**
 * 公示管理-删除公示信息
 * @param param
 * @param header
 * @param urlData
 * @returns {*|Promise}
 */
export function publicInformationDelete(param, header, urlData) {
  return api.get(`/apis/publicInformation/del/${urlData}`, param, header)
}
/**
 * 公示管理-添加公示信息
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function publicInformationUpload(param, header) {
  return api.get(`/apis/publicInformation/uploadFiles`, param, header)
}
/**
 * 历史数据-树形结构
 * @returns {*|Promise}
 */
export function historyTree (param, header) {
  return api.get('/apis/history2/tree2', param, header)
}
/**
 * 历史数据-列表信息展示
 * @param param
 * @returns {*|Promise}
 * getHistoryInfoByTableName  原接口
 */
export function getHistoryInfoByTableName (param,header) {
  return api.post('/apis/history2/getHistoryInfo', param,header)
}
/**
 * 历史数据-列表头展示
 * @param param
 * @returns {*|Promise}
 * getHistoryNotesByTableName   之前的接口
 */
export function getHistoryNotesByTableName (param,header) {
  return api.post('/apis/history2/getHistoryHeadTableInfo', param,header)
}
/**
 * 历史数据-公司信息
 * @returns {*|Promise}
 */
export function getHistoryCompany (param,header) {
  return api.get('/apis/history/getHistoryCompany', param,header)
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
export function getFinanceTable (param, header) {
  return api.post('/apis/getFinanceTableList', param, header)
}
/**
 * 凭证列表-单条凭证信息的详细内容
 * @param param
 * @returns {*|Promise}
 */
export function getFinanceDetails (param, header) {
  return api.get('/apis/getFinanceDetails', param, header)
}

/**
 * 新建指标
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function newNorm (param, header) {
  return api.post('/apis/dataStatisticsService/statistical', param, header)
}

/**
 * 新建指标-获取逻辑指标库
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function getNormSelect (param, header) {
  return api.get('/apis/dataStatisticsService/logic', param, header)
}
/**
 * 新建指标-获取表格
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function getNormTable (param, header) {
  return api.get('/apis/dataStatisticsService/statisticalSubscriptionList', param, header)
}

/**
 * 新建指标-指标名称校验
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function NameValidator (param, header) {
  return api.get('/apis/dataStatisticsService/checkStatisticalName', param, header)
}
/**
 * 新建指标-发布指标
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function publishNorm(param, header, urlData) {
  return api.get(`/apis/dataStatisticsService/releaseIndicators/${urlData}`, param, header)
}

/**
 * 新建指标-取消发布
 * @param param
 * @param header
 * @param urlData
 * @returns {*|Promise}
 */
export function unPublishNorm(param, header, urlData) {
  return api.get(`/apis/dataStatisticsService/unpublishIndex/${urlData}`, param, header)
}

/**
 * 新建指标-订阅指标
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function subscriberNorm(param, header) {
  return api.get('/apis/dataStatisticsService/subscriptionMetrics', param, header)
}

/**
 * 新建指标-预览图表
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function previewNorm(param, header) {
  return api.post('/apis/dataStatisticsService/preview', param, header)
}

/**
 * 新增指标-取消订阅
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function unSubscriberNorm(param, header) {
  return api.get('/apis/dataStatisticsService/unsubscribeMetrics', param, header)
}

/**
 * 删除指标
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function deleteIndicators(param, header) {
  return api.get('/apis/dataStatisticsService/deleteIndicators', param, header)
}

/**
 * 关注信息-获取列表展示
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function getAttentionList(param, header) {
  return api.get('/apis/dataStatisticsService/findSubscriptionList', param, header)
}

/**
 * 关注信息-点赞
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function attentionLike(param, header) {
  return api.get('/apis/dataStatisticsService/thumbUpIndex', param, header)
}

/**
 * 关注信息-取消点赞
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function attentionNotLike(param, header) {
  return api.get('/apis/dataStatisticsService/cancelThumbUp', param, header)
}

/**
 * 关注信息-取消全部订阅
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function cancelAllAttention(param, header) {
  return api.get('/apis/dataStatisticsService/cancelAllSubscriptionMetrics', param, header)
}

/**
 * 获取权限列表
 * @param param
 * @param header
 * @returns {*|Promise}
 */
export function getJurisdiction(param, header) {
  return api.get('/apis/v1/account/permissions', param, header)
}
