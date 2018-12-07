/**
 * Created by zhangxin on 2018/11/14.
 */
<template>
  <el-container>
    <el-aside width="200px" style="background-color: #222e26;">
      <a class="logo" href="javascript:void(0);">
        <img src="../../assets/logo.png" width="142" height="25" alt="LOGO" />
      </a>
      <el-menu class="el-menu-jky"
         background-color="#222e26"
         text-color="#fff"
         active-text-color="#fff"
        :default-active="activeIndex"
        @select="handleSelect">
        <!--<router-link to="publicInformation">
          <el-menu-item index="1"><i class="el-icon-menu"></i>公示信息</el-menu-item>
        </router-link>-->
        <!--<router-link to="attention">
          <el-menu-item index="2"><i class="el-icon-menu"></i>关注信息</el-menu-item>
        </router-link>
        <router-link to="dataLink">
          <el-menu-item index="3"><i class="el-icon-menu"></i>数据链接管理</el-menu-item>
        </router-link>
        <router-link to="joinUp">
          <el-menu-item index="4"><i class="el-icon-menu"></i>接入任务管理</el-menu-item>
        </router-link>
        <router-link to="">
          <el-menu-item index="5"><i class="el-icon-menu"></i>接入警告</el-menu-item>
        </router-link>
        <router-link to="">
          <el-menu-item index="6"><i class="el-icon-menu"></i>数据治理管理</el-menu-item>
        </router-link>-->
        <!--<router-link to="user">-->
          <!--<el-menu-item index="7"><i class="el-icon-menu"></i>用户管理</el-menu-item>-->
        <!--</router-link>-->
        <!--<router-link to="role">-->
          <!--<el-menu-item index="8"><i class="el-icon-menu"></i>角色管理</el-menu-item>-->
        <!--</router-link>-->
        <router-link to="management">
          <el-menu-item index="1"><i class="el-icon-menu"></i>公示管理</el-menu-item>
        </router-link>
        <!--<router-link to="moneyData">-->
          <!--<el-menu-item index="10"><i class="el-icon-menu"></i>财务数据</el-menu-item>-->
        <!--</router-link>-->
        <router-link to="historyData">
          <el-menu-item index="2"><i class="el-icon-menu"></i>历史数据</el-menu-item>
        </router-link>
        <router-link to="newNorm">
          <el-menu-item index="3"><i class="el-icon-menu"></i>新建指标</el-menu-item>
        </router-link>
        <!--<router-link to="company">-->
          <!--<el-menu-item index="13"><i class="el-icon-menu"></i>公司设置</el-menu-item>-->
        <!--</router-link>-->
        <!--<router-link to="department">-->
          <!--<el-menu-item index="14"><i class="el-icon-menu"></i>部门设置</el-menu-item>-->
        <!--</router-link>-->
        <!--<router-link to="moneyData1">-->
          <!--<el-menu-item index="15"><i class="el-icon-menu"></i>财务数据1</el-menu-item>-->
        <!--</router-link>-->
        <router-link to="pzlb">
          <el-menu-item index="4"><i class="el-icon-menu"></i>凭证列表</el-menu-item>
        </router-link>
        <el-submenu index="">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="company">
              <el-menu-item index="5"><i class="el-icon-menu"></i>公司管理</el-menu-item>
            </router-link>
            <router-link to="department">
              <el-menu-item index="6"><i class="el-icon-menu"></i>部门管理</el-menu-item>
            </router-link>
            <router-link to="role">
              <el-menu-item index="7"><i class="el-icon-menu"></i>角色管理</el-menu-item>
            </router-link>
            <router-link to="user">
              <el-menu-item index="8"><i class="el-icon-menu"></i>用户管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
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
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
/**
 * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
 * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
 * import loginButton from './components/loginButton.vue';
 */
export default{
  data () {
    return {
      activeIndex: '1',
      title_list: [
        '公示管理',
        '历史数据',
        '新建指标',
        '凭证列表',
        '公司管理',
        '部门管理',
        '角色管理',
        '用户管理',
        '公示信息',
        '关注信息',
        '数据链接管理',
        '接入任务管理',
        '接入警告',
        '数据治理管理',
        '财务数据',
        '财务数据1',
      ],
      menuTitle: '公示管理'
    }
  },
  components: {},
  methods: {
    handleSelect (key, keyPath) {
      var vm = this
      sessionStorage.setItem('key', key)
      vm.menuTitle = vm.title_list[key - 1]
    }
  },
  mounted () {
    let vm = this
    this.activeIndex = sessionStorage.getItem('key')
    vm.menuTitle = vm.title_list[this.activeIndex - 1]
  }
}
</script>
<style scoped lang="scss">
  .el-header,
  .el-main {
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
    .el-menu-item,
    .el-submenu__title{
      color: #fff;
      border-left: 5px solid transparent;
    }
    .el-menu-item:focus,
    .el-menu-item:hover,
    .is-opened .el-submenu__title,
    .el-submenu__title:hover,
    .el-submenu__title:focus,
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
