/**
 * Created by zhangxin on 2018/11/14.
 */
<template>
  <el-container>
    <el-aside width="220px" style="background-color: #fff;">
      <!--<a class="logo" href="javascript:void(0);">
        <img src="../../assets/logo.png" width="142" height="25" alt="LOGO" />
      </a>-->
      <el-menu class="el-menu-jky"
         background-color="#fff"
         text-color="#323341"
         active-text-color="#65af0d"
        :default-active="activeIndex"
        @select="handleSelect">
        <router-link v-if="!item.child && item.flag" v-for="(item, index) in menu_list" :to="item.pathUrl">
          <el-menu-item :index="index+''">
            <i class="iconfont" :class="item.iClass"></i>
            <span>{{item.name}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-if="item.child && item.flag" v-for="(item, index) in menu_list" index="">
          <template slot="title">
            <i class="iconfont" :class="item.iClass"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <router-link :to="child.pathUrl" v-for="(child, ind) in item.childrenList">
              <el-menu-item :index="index+ ind +''" v-if="child.flag">
                <i :class="child.iClass" class="iconfont"></i>
                <span>{{child.name}}</span>
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <!--<router-link to="publicInformation">
          <el-menu-item index="1"><i class="el-icon-menu"></i>公示信息</el-menu-item>
        </router-link>
        <router-link to="attention">
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
        </router-link>
        <router-link to="user">
          <el-menu-item index="7"><i class="el-icon-menu"></i>用户管理</el-menu-item>
        </router-link>
        <router-link to="role">
          <el-menu-item index="8"><i class="el-icon-menu"></i>角色管理</el-menu-item>
        </router-link>
        <router-link to="moneyData">
          <el-menu-item index="10"><i class="el-icon-menu"></i>财务数据</el-menu-item>
        </router-link>
        <router-link to="historyData">
          <el-menu-item index="2"><i class="el-icon-menu"></i>历史数据</el-menu-item>
        </router-link>
        <router-link to="newNorm">
          <el-menu-item index="3"><i class="el-icon-menu"></i>新建指标</el-menu-item>
        </router-link>
        <router-link to="company">
          <el-menu-item index="13"><i class="el-icon-menu"></i>公司设置</el-menu-item>
        </router-link>
        <router-link to="department">
          <el-menu-item index="14"><i class="el-icon-menu"></i>部门设置</el-menu-item>
        </router-link>
        <router-link to="moneyData1">
          <el-menu-item index="15"><i class="el-icon-menu"></i>财务数据1</el-menu-item>
        </router-link>
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
        </el-submenu>-->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="nav-menu-title">
          <span class="menu-title">{{menuTitle}}</span>
        </div>
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
import Watermark from '../../vendor/watermark'
export default{
  data () {
    return {
      activeIndex: '0',
      /*menu_list: [
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
      ],*/
      menu_list:[],
      title_list:[],
      menuTitle: '',
    }
  },
  components: {},
  methods: {
    handleSelect (key, keyPath) {
      let vm = this
      vm.menuTitle = vm.title_list[key]
    }
  },
  created (){
    let userPermissionsStr = sessionStorage.getItem('userPermissions')
    let permissions = userPermissionsStr.split(',')
    this.$store.dispatch('SET_USER_PERMISSIONS', {permissions})
  },
  mounted () {
    let vm = this
    /*获取用户信息并通过水印方法显示到屏幕上*/
    let userName = sessionStorage.getItem('userName')
    let userType = sessionStorage.getItem('userType')
    let company = sessionStorage.getItem('company')
    let department = sessionStorage.getItem('department')
    //let massage = userName + '-' + userType + '-' + company + '-' + department
    let massage =  '正大健康云平台'+ ' - ' + userName
    Watermark.set(massage)
    /*根据不同模块显示不同左侧菜单栏*/
    vm.menuTitle = sessionStorage.getItem('publicName')
    if(vm.menuTitle == '历史数据'){
      vm.title_list=['历史数据','财务凭证','财务指标','销售指标','产品指标','人事指标']
      vm.menu_list = [
        {
          name:'历史数据',
          pathUrl:'historyData',
          iClass:'icon-shuju3',
          child:false,
          flag:this.$store.getters.getPermissions.indexOf('historicalData')>-1?true:false
        },
        {
          name:'财务凭证',
          pathUrl:'pzlb',
          child:false,
          iClass:'icon-yewushouliliebiao',
          flag:this.$store.getters.getPermissions.indexOf('financialCertificate')>-1?true:false
        },
        {
          name:'指标统计',
          pathUrl:'newNorm',
          child:true,
          flag:this.$store.getters.getPermissions.indexOf('indexStatistics')>-1?true:false,
          childrenList:[
            {
              name:'财务指标',
              pathUrl:'newNorm',
              child:false,
              iClass:'icon-youxianzijin',
              flag:this.$store.getters.getPermissions.indexOf('financialIndex')>-1?true:false
            },
            {
              name:'销售指标',
              pathUrl:'developing',
              iClass:'icon-qiye',
              child:false,
              flag:this.$store.getters.getPermissions.indexOf('salesIndex')>-1?true:false
            },
            {
              name:'产品指标',
              pathUrl:'developing',
              child:false,
              iClass:'icon-shumogongjuiconshichangfenxi-',
              flag:this.$store.getters.getPermissions.indexOf('productIndex')>-1?true:false
            },
            {
              name:'人事指标',
              pathUrl:'developing',
              iClass:'icon-yezhukaifashang',
              child:false,
              flag:this.$store.getters.getPermissions.indexOf('personnelIndex')>-1?true:false
            }
          ],
          iClass:'icon-zhishu'
        },
      ]
    }
    else if(vm.menuTitle == '公示管理'){
      vm.title_list=['公示管理']
      vm.menu_list = [
        {
          name:'公示管理',
          pathUrl:'management',
          child:false,
          iClass:'icon-guanggaoxianxing',
          flag:this.$store.getters.getPermissions.indexOf('formulaManagement')>-1?true:false
        }
      ]
    }
    else if(vm.menuTitle == '公司管理'){
      vm.title_list=['公司管理','部门管理','角色管理','用户管理']
      vm.menu_list = [
        {
          name:'公司管理',
          pathUrl:'company',
          child:false,
          iClass:'icon-swticonjiudian',
          flag:this.$store.getters.getPermissions.indexOf('companyManagement')>-1?true:false
        },
        {
          name:'部门管理',
          pathUrl:'department',
          child:false,
          iClass:'icon-xingzheng',
          flag:this.$store.getters.getPermissions.indexOf('divisionalManagement')>-1?true:false
        },
        {
          name:'角色管理',
          pathUrl:'role',
          child:false,
          iClass:'icon-jiaose',
          flag:this.$store.getters.getPermissions.indexOf('roleManagement')>-1?true:false
        },
        {
          name:'用户管理',
          pathUrl:'user',
          child:false,
          iClass:'icon-men',
          flag:this.$store.getters.getPermissions.indexOf('userManagement')>-1?true:false
        }
      ]
    }
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
  .el-aside{
  	border-right: 1px solid #cbcdd1;
  }
  .el-menu-jky {
    background-color: transparent;
    padding-top: 10px;
    .el-menu-item,
    .el-submenu__title{
      color: #fff;
      height:40px;
      line-height: 40px;
      /*border-left: 5px solid transparent;*/
      i{
     	display: inline-block;
     	vertical-align: middle;
     	margin:0 16px 0 13px
      }
      span{
      	font-size: 16px;
      }
    }
    .el-menu-item:focus,
    .el-menu-item:hover,
    .is-opened .el-submenu__title,
    .el-submenu__title:hover,
    .el-submenu__title:focus,
    .el-menu-item.is-active{
      border-left-color: #bfd046;
      /*background-color: rgba(#bfd046, .1);*/
      background-color: #e9f4c7 !important;
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
