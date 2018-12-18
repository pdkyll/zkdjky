<template>
  <el-container>
    <el-container>
      <el-header style="height: auto">
        <div>
            <div class="left-logo">
              <img src="@/assets/green-logo.png" alt="">
            </div>
        </div>
        <div class="nav-menu-title">
          <span class="menu-title">{{title}}</span>
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
      title: '',
      userPermissions: []
    }
  },
  components: {},
  methods: {
  },
  created (){
    let userPermissionsStr = sessionStorage.getItem('userPermissions')
    this.userPermissions = userPermissionsStr.split(',')
    let permissions = this.userPermissions
    this.$store.dispatch('SET_USER_PERMISSIONS', {permissions})
  },
  mounted () {
    /*获取用户信息并通过水印方法显示到屏幕上*/
    let userName = sessionStorage.getItem('userName')
    let userType = sessionStorage.getItem('userType')
    let company = sessionStorage.getItem('company')
    let department = sessionStorage.getItem('department')
    //let massage = userName + '-' + userType + '-' + company + '-' + department
    let massage = '正大健康云平台' + '-' + userName
    Watermark.set(massage)
    this.title = window.sessionStorage.getItem('publicName')
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
    margin-top: 10px;
    margin-bottom: 10px;
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
  .left-logo{
    display: inline-block;
    line-height: 60px;
    img{
      vertical-align: middle;
    }
  }
</style>
