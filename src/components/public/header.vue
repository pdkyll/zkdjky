<template>
    <div>
        <div class="nav-menu-title">
          <span class="menu-title">{{menuTitle}}</span>
        </div>
        <el-dropdown class="nav-bar-right">
          <div class="head-img-box">
            <span class="circle-bg">
              <img src="../../assets/headimg.png" alt="head-img">
            </span>
            <span>王小虎</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>普通用户</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
  menuTitle: '公示信息'
}
</script>

<style scoped lang="scss">
  .el-header{
    float: right;
    background-color: #fafafa;
  }
  .logo {
    padding-top: 80px;
    padding-bottom: 110px;
    display: block;
    text-align: center;
  }
  .el-menu-jky {
    background-color: transparent;
  .el-menu-item{
    color: #fff;
    border-left: 12px solid transparent;
  }
  .el-menu-item:focus,
  .el-menu-item:hover,
  .el-menu-item.is-active{
    border-left-color: #bfd046;
    background-color: rgba(#bfd046, .1);
  }
  }
  .head-img-box {
    color: #86898e;
    height: 60px;
    line-height: 60px;
  .circle-bg {
    width: 25px;
    height: 25px;
    line-height: 1;
  }
  .circle-bg,
  img {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #a4ca68;
    vertical-align: middle;
    border-radius: 12px;
  }
  }
  .nav-menu-title {
    float: left;
    line-height: 60px;
    font-size: 18px;
    color: #303030;
  &:before {
     margin-right: 8px;
     display: inline-block;
     content: ' ';
     width: 6px;
     height: 18px;
     vertical-align: middle;
     background-color: #a4ca68;
   }
  .menu-title {
    vertical-align: middle;
  }
  }
  .nav-bar-right {
    float: right;
  }
</style>
