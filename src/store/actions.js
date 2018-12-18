/**
 * Created by zhangxin on 2018/11/13.
 */
import {
  login,
  login2,
  logout,
  /*角色*/
  roles,
  getUserForRoles,
  delUserForRoles,
  insertUserForRoles,
  updateUserForRoles,
  makeCompanySelect,
  updateUserEcho,
  /*用户*/
  users,
  getUserForUsers,
  delUserForUsers,
  insertUserForUsers,
  updateUserForUsers,
   /*公示信息*/
  publicMsg,
  linkDownload,
  /*部门设置*/
  getDepartment,
  /**
   * 公司设置
   */
  providerManage,
  providerManageDel,
  providerManageInsert,
  providerManageUpdate,
  /**
   * 部门设置
   */
  providerManageCmpAndDep,
  insertDepartment,
  providerManageFindNameId,
  providerManageByCode,
  /**
   * 公示管理
   */
  publicInformationList,
  publicInformationUpdate,
  publicInformationDelete,
  publicInformationUpload,
  /*历史数据*/
  historyTree,
  getHistoryCompany,
  getHistoryInfoByTableName,
  getHistoryNotesByTableName,
  getFinanceList,
  getFinanceTable,
  getFinanceDetails,
  /*新建指标*/
  newNorm,
  getNormSelect,
  getNormTable,
  publishNorm,
  unPublishNorm,
  subscriberNorm,
  unSubscriberNorm,
  deleteIndicators,
  previewNorm,
  /*关注信息*/
  getAttentionList,
  attentionLike,
  attentionNotLike,
  cancelAllAttention,
  /*获取权限*/
  getJurisdiction
} from '../api'

export default {
  /**
   * 设置公司的列表的数据
   * @param commit
   * @param state
   * @param companyArr
   * @constructor
   */
  SET_COMPANY_STATE:({commit, state}, {companyArr}) => {
    commit('COMMIT_COMPANY', {companyArr})
    return
  },
  /**
   * 存储权限的状态
   * @param commit
   * @param state
   * @param companyArr
   * @constructor
   */
  SET_USER_PERMISSIONS:({commit, state}, {permissions}) => {
    commit('USER_PERMISSIONS', {permissions})
    return
  },
  /**
   * iframe内公共头部
   * @param commit
   * @param state
   * @param name
   * @constructor
   */
  PUBLIC_HEADER_TYPE:({commit, state}, {name}) =>{
    commit('SET_PUBLIC_NAME',{name})
    return
  },
  /**
   * 存储用户信息
   * @param commit
   * @param state
   * @param name
   * @constructor
   */
  USER_MASSAGE:({commit, state}, {name}) =>{
    commit('SET_USER_MASSAGE',{name})
    return
  },
  /**
   * 登陆接口
   * @param commit
   * @param state
   * @param param
   * @returns {Promise.<TResult>}
   * @constructor
   */
  LOGIN: ({commit, state}, {param}) => {
    return login(param).then((res, req) => {
      return res
    })
  },
  /**
   * 退出接口
   * @param commit
   * @param state
   * @param param
   * @returns {Promise.<TResult>}
   * @constructor
   */
  LOGOUT: ({commit, state}, {header}) => {
    return logout(header).then((res, req) => {
      return res
    })
  },

  LOGIN2: ({commit, state}, {param}) => {
    return login2(param).then((res, req) => {
      return res
    })
  },
  /**
   * 角色管理的列表展示
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  ROLES: ({commit, state}, {param, header}) => {
    return roles(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 角色管理的根据角色查询用户
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_USER_FOR_ROLES: ({commit, state}, {param, header, urlData}) => {
    return getUserForRoles(param, header, urlData).then((res, req) => {
      return res
    })
  },
  /**
   * 角色管理-删除角色
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  DEL_USER_FOR_ROLES: ({commit, state}, {param, header}) => {
    return delUserForRoles(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 角色管理-新增角色
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  INSERT_USER_FOR_ROLES: ({commit, state}, { param, header}) => {
    return insertUserForRoles(param, header).then((res, req) => {
      return res
    })
  },

  /**
   * 角色管理-修改角色是回显权限
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>|*}
   * @constructor
   */
  UPDATE_USER_ECHO: ({commit, state}, { param, header}) => {
    return updateUserEcho( param, header).then((res, req) => {
      return res
    })
  },

  /**
   * 角色管理-修改角色
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  UPDATE_USER_FOR_ROLES: ({commit, state}, { param, header}) => {
    console.log(param)
    return updateUserForRoles( param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 角色管理-获取公司选择的列表
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  MAKE_COMPANY_SELECT: ({commit, state}, { param, header}) => {
    return makeCompanySelect( param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 用户管理的列表展示
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  USERS: ({commit, state}, {param, header}) => {
    return users(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 用户管理的根据角色查询用户
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_USER_FOR_USERS: ({commit, state}, {param, header, urlData}) => {
    return getUserForUsers(param, header, urlData).then((res, req) => {
      return res
    })
  },
  /**
   * 用户管理-删除角色
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  DEL_USER_FOR_USERS: ({commit, state}, { header, urlData}) => {
    return delUserForUsers( header, urlData).then((res, req) => {
      return res
    })
  },
  /**
   * 用户管理-新增角色
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  INSERT_USER_FOR_USERS: ({commit, state}, { param, header}) => {
    return insertUserForUsers( param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 用户管理-修改角色
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  UPDATE_USER_FOR_USERS: ({commit, state}, {param, header, urlData}) => {
    return updateUserForUsers(param, header, urlData).then((res, req) => {
      return res
    })
  },
  /**
   * 公示信息-列表展示
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  PUBLIC_MSG: ({commit, state}, {param, header}) => {
    return publicMsg(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 公示信息-链接下载文件
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  LINK_DOWNLOAD: ({commit, state}, {param, header}) => {
    return linkDownload(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 公司管理-删除公司
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>|*}
   * @constructor
   */
  PROVIDER_MANAGE_DEL: ({commit, state}, {param, header}) => {
    return providerManageDel(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 公司管理-添加公司
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>|*}
   * @constructor
   */
  PROVIDER_MANAGE_INSERT: ({commit, state}, {param, header}) => {
    return providerManageInsert(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 公司管理-修改公司信息
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>|*}
   * @constructor
   */
  PROVIDER_MANAGE_UPDATE: ({commit, state}, {param, header}) => {
    return providerManageUpdate(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 部门管理-查询部门列表
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  PROVIDER_MANAGE_CMP_AND_DEP: ({commit, state}, {param, header}) => {
    return providerManageCmpAndDep(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 部门管理-根据code查询部门列表
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  PROVIDER_MANAGE_BY_CODE: ({commit, state}, {param, header}) => {
    return providerManageByCode(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 公司设置-获取公司
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  PROVIDER_MANAGE: ({commit, state}, {param, header}) => {
    return providerManage(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 获取部门
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_DEPARTMENT: ({commit, state}, {param, header}) => {
    return getDepartment(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 部门管理-批量添加部门
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  INSERT_DEPARTMENT: ({commit, state}, {param, header}) => {
    return insertDepartment(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 部门管理-下拉框里的公司名字
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  PROVIDER_MANAGE_FIND_NAME_ID: ({commit, state}, {param, header}) => {
    return providerManageFindNameId(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 公示管理-列表
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  PUBLIC_INFORMATION_LIST: ({commit, state}, {param, header}) => {
    return publicInformationList(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 公示管理-修改公司信息
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  PUBLIC_INFORMATION_UPDATE: ({commit, state}, {param, header, urlData}) => {
    return publicInformationUpdate(param, header, urlData).then((res, req) => {
      return res
    })
  },
  /**
   * 公示管理-删除公示信息
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  PUBLIC_INFORMATION_DELETE: ({commit, state}, {param, header, urlData}) => {
    return publicInformationDelete(param, header, urlData).then((res, req) => {
      return res
    })
  },
  PUBLIC_INFORMATION_UPLOAD: ({commit, state}, {param, header}) => {
    return publicInformationUpload(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 历史数据-获取树形菜单
   * @param commit
   * @param state
   * @returns {Promise.<TResult>|*}
   * @constructor
   */
  HISTORY_TREE: ({commit, state}, {param,header}) => {
    return historyTree(param,header).then((res, req) => {
      return res
    })
  },
  /**
   * 历史数据-获取公司列表
   * @param commit
   * @param state
   * @returns {Promise.<TResult>|*}
   */
  GET_HISTORY_COMPANY: ({commit, state}, {param,header}) => {
    return getHistoryCompany(param,header).then((res, req) => {
      return res
    })
  },
  /**
   * 历史数据-获取表格列表信息
   * @param commit
   * @param state
   * @param param
   * @returns {Promise.<TResult>|*}
   */
  GET_HISTORY_INFO_BY_TABLE_NAME: ({commit, state}, {param,header}) => {
    return getHistoryInfoByTableName(param,header).then((res, req) => {
      return res
    })
  },
  /**
   * 历史数据-获取表格表头数据
   * @param commit
   * @param state
   * @param param
   * @returns {Promise.<TResult>|*}
   */
  GET_HISTORY_NOTES_BY_TABLE_NAME: ({commit, state}, {param,header}) => {
    return getHistoryNotesByTableName(param,header).then((res, req) => {
      return res
    })
  },
  /**
   * 凭证列表-平台公司的列表
   * @param commit
   * @param state
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_FINANCE_LIST: ({commit, state}) => {
    return getFinanceList().then((res, req) => {
      return res
    })
  },
  /**
   * 凭证列表-公司的凭证信息
   * @param commit
   * @param state
   * @param param
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_FINANCE_TABLE: ({commit, state}, {param, header}) => {
    return getFinanceTable(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 凭证列表-单条凭证信息的详细内容
   * @param commit
   * @param state
   * @param param
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_FINANCE_DETAILS: ({commit, state}, {param, header}) => {
    return getFinanceDetails(param, header).then((res, req) => {
      return res
    })
  },

  /**
   * 新建指标
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  NEW_NORM: ({commit, state}, {param, header}) => {
    return newNorm(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 新建指标-获取逻辑指标库下拉菜单
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_NORM_SELECT: ({commit, state}, {param, header}) => {
    return getNormSelect(param, header).then((res, req) => {
      return res
    })
  },

  /**
   * 新建指标-获取表格展示
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_NORM_TABLE: ({commit, state}, {param, header}) => {
    return getNormTable(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 新建指标-发布指标
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  PUBLISH_NORM: ({commit, state}, {param, header, urlData}) => {
    return publishNorm(param, header, urlData).then((res, req) => {
      return res
    })
  },
  /**
   * 新建指标-取消发布指标
   * @param commit
   * @param state
   * @param param
   * @param header
   * @param urlData
   * @returns {Promise.<TResult>}
   * @constructor
   */
  UN_PUBLISH_NORM: ({commit, state}, {param, header, urlData}) => {
    return unPublishNorm(param, header, urlData).then((res, req) => {
      return res
    })
  },
  /**
   * 新建指标-订阅指标
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  SUBSCRIBER_NORM: ({commit, state}, {param, header}) => {
    return subscriberNorm(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 新建指标-预览图表
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>|*}
   * @constructor
   */
  PREVIEW_NORM: ({commit, state}, {param, header}) => {
    return previewNorm(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 新建指标-取消订阅指标
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  UN_SUBSCRIBER_NORM: ({commit, state}, {param, header}) => {
    return unSubscriberNorm(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 新建指标-删除指标
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  DELETE_INDICATORS: ({commit, state}, {param, header}) => {
    return deleteIndicators(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 关注信息-获取列表
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_ATTENTION_LIST: ({commit, state}, {param, header}) => {
    return getAttentionList(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 关注信息-点赞
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  ATTENTION_LIKE: ({commit, state}, {param, header}) => {
    return attentionLike(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 关注信息-取消点赞
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  ATTENTION_NOT_LIKE: ({commit, state}, {param, header}) => {
    return attentionNotLike(param, header).then((res, req) => {
      return res
    })
  },
  /**
   * 关注信息-取消全部订阅
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  CANCEL_ALL_ATTENTION: ({commit, state}, {param, header}) => {
    return cancelAllAttention(param, header).then((res, req) => {
      return res
    })
  },

  /**
   * 获取权限列表
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>}
   * @constructor
   */
  GET_JURISDICTION: ({commit, state}, {param, header}) => {
  return getJurisdiction(param, header).then((res, req) => {
    return res
  })
}
}
