/**
 * Created by zhangxin on 2018/11/13.
 */
import {
  login,
  login2,
  /*角色*/
  roles,
  getUserForRoles,
  delUserForRoles,
  insertUserForRoles,
  updateUserForRoles,
  makeCompanySelect,
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
} from '../api'

export default {
  LOGIN: ({commit, state}, {param}) => {
    return login(param).then((res, req) => {
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
  DEL_USER_FOR_ROLES: ({commit, state}, { header, urlData}) => {
    return delUserForRoles( header, urlData).then((res, req) => {
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
    return insertUserForRoles( param, header).then((res, req) => {
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
  /* 公示信息-列表展示
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
   * 公司管理-公司列表
   * @param commit
   * @param state
   * @param param
   * @param header
   * @returns {Promise.<TResult>|*}
   * @constructor
   */
  PROVIDER_MANAGE: ({commit, state}, {param, header}) => {
    return providerManage(param, header).then((res, req) => {
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
  HISTORY_TREE: ({commit, state}) => {
    return historyTree().then((res, req) => {
      return res
    })
  },
  /**
   * 历史数据-获取公司列表
   * @param commit
   * @param state
   * @returns {Promise.<TResult>|*}
   */
  GET_HISTORY_COMPANY: ({commit, state}) => {
    return getHistoryCompany().then((res, req) => {
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
  GET_HISTORY_INFO_BY_TABLE_NAME: ({commit, state}, {param}) => {
    return getHistoryInfoByTableName(param).then((res, req) => {
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
  GET_HISTORY_NOTES_BY_TABLE_NAME: ({commit, state}, {param}) => {
    return getHistoryNotesByTableName(param).then((res, req) => {
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

}
