/**
 * Created by zhangxin on 2018/11/18.
 */
<template>
  <el-container class="home">
    <el-header>
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
          <el-dropdown-item><router-link to="/login">退出</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <ul class="menu">
        <li>
          <router-link :to="{path:'/LayoutNoLeft', query:{flag:'公示信息'}}" target="_blank" class="menu-item">
            <img src="@/assets/archive.png" alt="">
          </router-link>
          <p>公示信息</p>
        </li>
        <li>
          <router-link :to="{path:'LayoutNoLeft/attention', query:{flag:'关注信息'}}" target="_blank" class="menu-item">
            <img src="@/assets/rss.png" alt="">
          </router-link>
          <p>关注信息</p>
        </li>
        <li>
          <router-link to="publicInformation" target="_blank" class="menu-item">
            <img src="@/assets/custom_reports.png" alt="">
          </router-link>
          <p>数据管理</p>
        </li>
        <li>
          <router-link to="" class="menu-item" target="_blank">
            <img src="@/assets/bar_chart.png" alt="">
          </router-link>
          <p>数据统计</p>
        </li>
        <li>
          <router-link to="publicInformation" target="_blank" class="menu-item">
            <img src="@/assets/file_cabinet.png" alt="">
          </router-link>
          <p>公示管理</p>
        </li>
        <li>
          <router-link to="" class="menu-item" target="_blank">
            <img src="@/assets/document_console.png" alt="">
          </router-link>
          <p>权限管理</p>
        </li>
      </ul>
    </el-main>
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
      msg: '首页'
    }
  },
  components: {},
  methods: {
    removeKey () {
      sessionStorage.removeItem('key')
    }
  },
  mounted () {
    this.removeKey()
  }
}
</script>
<style scoped lang="scss">
.el-main{
  position: relative;
}
.home{
  height: 100%;
  background-image: url("../../assets/home_bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  .nav-bar-right {
    float: right;
  }
}
.head-img-box {
  color: #fff;
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
.menu{
  position: absolute;
  top:0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  li{
    flex: 0 0 16.6%;
    margin-bottom: 20px;
    text-align: center;
    a{
      display: inline-block;
      padding: 20px;
      margin-bottom: 15px;
      width: 140px;
      height: 140px;
      background: rgba(49,49,49,0.24);
      box-shadow: 0 0 36px rgba(#999, .24) ;
      border-radius: 32px;
      img{
        display: inline-block;
        width: 100%;
      }
      +p{
        color: #fff;
        text-align: center;
        font-size: 24px;
      }
    }
  };
  li:hover a{
    background: rgba(46,46,46,0.5);
    box-shadow: 0 0 36px rgba(#bfd046, .9) ;
  }
}
  .frameBox{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right:0;
    bottom: 0;
    margin:auto;
    .frame{
      width: 100%;
      height: 100%;
    }
  }
</style>
