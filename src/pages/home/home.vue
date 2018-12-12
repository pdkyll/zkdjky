/**
 * Created by zhangxin on 2018/11/18.
 */
<template>
  <el-container class="home" v-loading="loading">
    <el-header>
      <el-dropdown class="nav-bar-right">
        <div class="head-img-box">
          <span class="circle-bg">
            <img src="../../assets/headimg.png" alt="head-img">
          </span>
          <span>{{userName}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{userType}}</el-dropdown-item>
          <el-dropdown-item>
            <div @click="logout" style="display: inline-block;width: 100%;height: 100%">退出</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <ul class="menu">
        <li>
          <!--:to="{path:'/LayoutNoLeft', query:{flag:'公示信息'}}"-->
          <div  @click="frameLink('LayoutNoLeft')" class="menu-item">
            <img src="@/assets/monitor.png" alt="">
          </div>
          <p>公示信息</p>
        </li>
        <li>
          <div @click="frameLink('LayoutNoLeft/attention')" class="menu-item">
            <img src="@/assets/rss.png" alt="">
          </div>
          <p>关注信息</p>
        </li>
        <li>
          <div @click="frameData" class="menu-item">
            <img src="@/assets/custom_reports.png" alt="">
          </div>
          <p>数据管理</p>
        </li>
        <li>
          <div @click="frameLink('historyData')" class="menu-item">
            <img src="@/assets/bar_chart.png" alt="">
          </div>
          <p>数据统计</p>
        </li>
        <li>
          <div @click="frameLink('management')" class="menu-item">
            <img src="@/assets/file_cabinet.png" alt="">
          </div>
          <p>公示管理</p>
        </li>
        <li>
          <div @click="frameLink('company')"  class="menu-item">
            <img src="@/assets/document_console.png" alt="">
          </div>
          <p>权限管理</p>
        </li>
      </ul>
    </el-main>
    <div class="frameBox" v-show="frameShow" id="frameBox">
      <div class="frameTit">
        <div class="iBox clearFix">
          <i class="iconfont icon-cross pull-right titBtn ml-10" @click="closeFrame"></i>
          <i class="iconfont icon--quanbubiankuang pull-right titBtn ml-10" @click="bigFrame"></i>
          <i class="iconfont icon-jianhao pull-right titBtn ml-10" @click="smallFrame"></i>
        </div>
      </div>
      <iframe src="/LayoutNoLeft" class="frame" id="frame" frameborder="0"></iframe>
    </div>
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
      msg: '首页',
      rouPath:'',
      frameShow:false,
      frameDom:'',
      frame:'',
      loading:false,
      userName:'',
      userType:''
    }
  },
  components: {},
  methods: {
    removeKey () {
      sessionStorage.removeItem('key')
    },
    frameLink(urlPath){
      let vm = this
      this.loading = true
      let name = ''
      if(urlPath == 'LayoutNoLeft'){
        name = '公示信息'
      }else if(urlPath == 'LayoutNoLeft/attention'){
        name = '关注信息'
      }else if(urlPath == 'historyData'){
        name = '历史数据'
      }else if(urlPath == 'management'){
        name = '公示管理'
      }else if(urlPath == 'company'){
        name = '公司管理'
      }
      this.frame.src= urlPath
      window.sessionStorage.setItem('publicName', name)
      /*this.$store.dispatch('PUBLIC_HEADER_TYPE', { name })*/
      this.frameShow = true
      setTimeout(function () {
        vm.loading = false
      },1000)
    },
    frameData(){
      let vm = this
      this.loading = true
      let data = {
        accountToken:  sessionStorage.getItem('accessToken'),
        accountId: sessionStorage.getItem('accountId')
      }
      this.frame.src= 'http://10.220.1.6:31246'
      setTimeout(function () {
        window.frames[0].postMessage(data, 'http://10.220.1.6:31246');
        vm.loading = false
        vm.frameShow = true
      },1000)

    },
    closeFrame(){
      this.frameDom.style.width = '1200px'
      this.frameDom.style.height = '500px'
      this.frameShow = false
      this.frame.src = ''
    },
    bigFrame(){
      if(this.frameDom.style.width=='100%'){
        this.frameDom.style.width = '1200px'
        this.frameDom.style.height = '500px'
      }else{
        this.frameDom.style.width = '100%'
        this.frameDom.style.height = '100%'
      }
      let data = {
        resize:true
      }
      window.frames[0].postMessage(data, '*');
    },
    smallFrame(){
      if(this.frameDom.style.width=='100%'){
        this.frameDom.style.width = '1200px'
        this.frameDom.style.height = '500px'
      }else{
        this.frameDom.style.width = '1200px'
        this.frameDom.style.height = '500px'
        this.frameShow = false
        this.frame.src = ''
      }
    },
    /*退出登陆*/
    logout(){
      let _this = this
      let header = {
        accessToken:sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('LOGOUT', { header }).then((res, req) => {
        this.$router.push('/login')
        _this.$notify({
          title: '提示信息',
          message: res.msg,
          type: res.code === 0 ? 'success' : 'error',
          duration: '1000'
        })
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  created (){
    this.userName = this.$store.state.userName
    this.userType = this.$store.state.userType
  },
  mounted () {
    this.frameDom = document.getElementById('frameBox')
    this.frame = document.getElementById('frame')
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
    .menu-item{
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
  li:hover .menu-item{
    background: rgba(46,46,46,0.5);
    box-shadow: 0 0 36px rgba(#bfd046, .9) ;
  }
}
.frameBox{
  background: #f5f5f5;
  width: 1200px;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  margin:auto;
  .frameTit{
    width: 100%;
    height: 5%;
    background: white;
    padding: .1% 0;
    position: relative;
    .iBox{
      height: 20px;
      position: absolute;
      top: 0;
      left: 0;
      right:0;
      bottom: 0;
      margin:auto;
      padding-right: 5px;
      i{
        color: black;
        font-size: 20px;
      }
      i:hover{
        background: #ccc;
        color: white;
      }
    }
  }
  .frame{
    width: 100%;
    height: 94.5%;
  }

}
</style>
