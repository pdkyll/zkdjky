export function backLook(checkedIds, menuList) {
  /**
   * entrance 程序入口
   * @param  {Array} checkedIds     返回值包含父级id的list
   * @param  {Array} menuList       资源集
   * @return {Array}                去除父级id的数组
   */
  function entrance(checkedIds, menuList) {
    //深拷贝checkedIds
    let checkedIdsCopy = arrDeepCopy(checkedIds);
    //执行
    return execute(checkedIds, checkedIdsCopy, menuList)
  }

  /**
   * execute 执行去掉未选中全部子集子集的父级id
   * @param  {Array} checkedIds     返回值包含父级id的list
   * @param  {Array} checkedIdsCopy 深拷贝返回值包含父级id的list
   * @param  {Array} menuList       资源集
   * @return {Array}                去除父级id的数组
   */
  function execute(checkedIds, checkedIdsCopy, menuList) {
    //遍历选中资源id
    for (let checkedId of checkedIds) {
      //获取子集id数组
      let childList = findAllChild(checkedId, menuList);
      //查询子集是否为空
      if (childList) {
        execute(childList, checkedIdsCopy, menuList)
      }
      //如果返回权限列表id集中不包含某个id的所有子集则删除这个id及其父级
      if (!isContained(checkedIds, childList)) {
        //从选中资源id(checkedIds)中删除某个id所有父级id
        deleteParentId(checkedIdsCopy, checkedId, menuList);
      }

    }
    return checkedIdsCopy;
  }

  /**
   * findAllChild 返回一个id的所有子集
   * @param  {Number} id       资源id
   * @param  {Array} menuList  资源集
   * @return {Object}          如果有子集返回子集id的list,如果没有子集则返回null
   */
  function findAllChild(id, menuList) {
    let childList = [];
    //遍历menu资源集并存入childList
    for (let menu of menuList) {
      if (menu.pcode == id) {
        childList.push(menu.id);
      }
    }
    if (childList.length > 0) {
      return childList;
    } else {
      return null;
    }
  }

  /**
   * deleteParentId 从选中深拷贝资源id(checkedIdsCopy)中删除某个id的所有级联父级id
   * @param  {Array} checkedIdsCopy 深拷贝的接口返回值包含子集和父级id数组
   * @param  {Array} checkedId      子元素id
   * @param  {Array} menuList       资源集数组
   */
  function deleteParentId(checkedIdsCopy, id, menuList) {
    //获取menu对象
    let menuObj = findMenuById(id, menuList);
    //如果有父级并且checkedIdsCopy是否包含父级id则从checkedIdsCopy中删除
    if (menuObj.pcode) {
      deleteParentId(checkedIdsCopy, menuObj.pcode, menuList);
      //查询checkedIdsCopy是否包含父级id
      let index = ignoreTypeIndexOf(menuObj.pcode, checkedIdsCopy);
      //从数组中删除pcode
      if (index > -1) {
        checkedIdsCopy.splice(index, 1);
      }
    }
  }

  /**
   * findMenuById 通过id在menuList中查询并获取某个menu对象
   * @param  {number} id        资源的id
   * @param  {Array} 	menuList  资源集数组
   * @return {Object}	menu      通过id寻找的一个menu对象
   */
  function findMenuById(id, menuList) {
    for (let menu of menuList) {
      if (menu.id == id) {
        return menu;
      }
    }
  }

  /**
   * isContained 判断参数中的第一个数组是否包含第二个数组的所有值
   * @param  {Array}  arrayMore 第一个数组
   * @param  {Array}  arrayLess 第二个数组
   * @return {Boolean}  是否被包含,是返回true,不是返回false
   */
  function isContained(arrayMore, arrayLess) {
    if (!(arrayMore instanceof Array) || !(arrayLess instanceof Array)) {
      return false;
    }
    if (arrayMore.length < arrayLess.length) {
      return false;
    }
    var aStr = arrayMore.toString();
    for (var i = 0, len = arrayLess.length; i < len; i++) {
      if (aStr.indexOf(arrayLess[i]) == -1) {
        return false;
      }
    }
    return true;
  }
  /**
   * ignoreTypeIndexOf 不区分字符串和数字类型判断某个数组中是否包含某个数字
   * @param  {Number} value 一个数字
   * @param  {Array}  array 一个数组
   * @return {Number}      包含返回下标（index）否则返回 -1
   */
  function ignoreTypeIndexOf(value, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == value) {
        return i;
      }
    }
    return -1;
  }
  /**
   * arrDeepCopy 深拷贝一个数组
   * @param  {Array} source 	被拷贝的数组
   * @return {Array} sourceCopy 拷贝的数组
   */
  function arrDeepCopy(source) {
    var sourceCopy = [];
    for (var item in source) {
      sourceCopy[item] = typeof source[item] === 'object' ? arrDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
  }

  return entrance(checkedIds, menuList)
}
