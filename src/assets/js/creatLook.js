export function creatLook(permissionList, menuList){
  /*
    permissionList 传递的参数
    menuList 资源列表
    此方法用于如果子集被选中，自动添加父级选中
 */
  function ckeckedParent(permissionList, menuList) {
    //父级选中list
    let newPermissionList = new Array();
    //遍历选中的权限
    for (let checked of permissionList) {
      //被选中的资源id
      let checkedId = checked.menuid;
      //加入子
      newPermissionList.push(checked);
      //调用寻找父级方法
      findParent(checkedId, menuList, newPermissionList)
    }
    //返回改造完的新的权限传参列表
    return newPermissionList;
  }

  /*
      向上寻找父级，并添加父级选中状态到新的权限传参列表
   */
  function findParent(checkedId, menuList, newPermissionList) {
    //遍历每个资源
    for (let menu of menuList) {
      //如果选中的id等于资源的id获取父级id(pcode)
      if (checkedId == menu.id) {
        //父级id
        let pcode = menu.pcode;
        //组建选中对象
        let checkedObj = { "checked": "1", "menuid": pcode };
        //判断不空的情况传值
        if (pcode && !contains(newPermissionList, checkedObj)) {
          newPermissionList.push(checkedObj);
        }
        //递归查询pcode
        findParent(pcode, menuList, newPermissionList);
      }
    }
  }

  /*
      判断某个新的权限列表中中是否包含某个已经选中对象
   */
  function contains(newPermissionList, checkedObj) {
    for (let ele of newPermissionList) {
      if (ele.menuid == checkedObj.menuid) {
        return true;
      }
    }
    return false;
  }

  return ckeckedParent(permissionList, menuList)
}
