/**
 * Created by zhangxin on 2018/11/18.
 */
<template>
  <el-container class="home" v-loading="loading">
    <el-header>
      <!--<el-dropdown class="nav-bar-right">
        <div class="head-img-box">
          <span class="circle-bg">
            <img src="../../assets/headimg.png" alt="head-img">
          </span>
          <span>{{userName}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>十大大 ： 苏打飒飒大苏打萨达萨达撒旦</el-dropdown-item>
          <el-dropdown-item>{{userType}}</el-dropdown-item>
          <el-dropdown-item>
            <div @click="logout" style="display: inline-block;width: 100%;height: 100%">退出</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
      <el-popover
        class="nav-bar-right"
        placement="bottom"
        width="300"
        trigger="click">
        <div class="downBox">
          <div class="downBoxImg">
            <span class="circleImage">
              <img src="../../assets/login/headimg.png" alt="head-img">
            </span>
           <p class="userText">{{userName}}</p>
          </div>
          <p class="userLab">
            <span class="mr-20">
              用户电话：
            </span>
            {{userPhone}}
          </p>
          <p class="userLab">
            <span class="mr-20">
              用户邮箱：
            </span>
            {{userEmail}}
          </p>
          <p class="userLab">
            <span class="mr-20">
              所属公司：
            </span>
            {{companyName}}
          </p>
          <p class="userLab">
            <span class="mr-20">
              所属部门：
            </span>
            {{departmentName}}
          </p>
          <el-button type="primary" @click="dialog=true">修改密码</el-button>
          <el-button type="primary" @click="logout">退出登陆</el-button>
        </div>
        <div class="head-img-box" slot="reference">
          <span class="circle-bg">
            <img src="../../assets/login/headimg.png" alt="head-img">
          </span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </el-popover>
    </el-header>
    <el-main>
      <ul class="menu">
        <li v-if="$store.getters.getPermissions.indexOf('formulaSetting')>-1">
          <!--:to="{path:'/LayoutNoLeft', query:{flag:'公示信息'}}"-->
          <div  @click="frameLink('LayoutNoLeft')" class="menu-item">
            <!--<img src="@/assets/monitor.png" alt="">-->
            <img src="@/assets/home/home_public.png" alt="">
          </div>
          <p>公示信息</p>
        </li>
        <li v-if="$store.getters.getPermissions.indexOf('informationAttention')>-1">
          <div @click="frameLink('LayoutNoLeft/attention')"  class="menu-item">
            <!--<img src="@/assets/rss.png" alt="">-->
            <img src="@/assets/home/home_attention.png" alt="">
          </div>
          <p>关注信息</p>
        </li>
        <!--<li>
          <div @click="frameData" class="menu-item">
            <img src="@/assets/custom_reports.png" alt="">
          </div>
          <p>数据管理</p>
        </li>-->
        <li v-if="$store.getters.getPermissions.indexOf('dataStatistics')>-1">
          <div @click="frameLink('historyData')" class="menu-item">
            <!--<img src="@/assets/bar_chart.png" alt="">-->
            <img src="@/assets/home/home_data.png" alt="">
          </div>
          <p>数据统计</p>
        </li>
        <!--<li>
          <div @click="frameLink('management')" class="menu-item">
            <img src="@/assets/file_cabinet.png" alt="">
          </div>
          <p>公示管理</p>
        </li>-->
        <!--<li>
          <div @click="frameLink('company')"  class="menu-item">
            <img src="@/assets/document_console.png" alt="">
          </div>
          <p>权限管理</p>
        </li>-->
      </ul>
      <div class="management_wrap">
      	<div class="management">
	      	<ul>
	      		<li v-if="$store.getters.getPermissions.indexOf('dataManagement')>-1">
	          		<div @click="frameData" class="menu-item">
		            	<img src="@/assets/home/desk_data.png" alt="">
		          	</div>
		          	<p>数据管理</p>
	        	</li>
		        <li v-if="$store.getters.getPermissions.indexOf('formulaManagement')>-1">
		            <div @click="frameLink('management')" class="menu-item">
		              <img src="@/assets/home/desk_public.png" alt="">
		            </div>
		            <p>公示管理</p>
		        </li>
		        <li v-if="$store.getters.getPermissions.indexOf('authorityManagement')>-1">
			        <div @click="frameLink('company')"  class="menu-item">
			          <img src="@/assets/home/desk_power.png" alt="">
			        </div>
			        <p>权限管理</p>
		        </li>
		        <li>
			        <div @click=""  class="menu-item">
			          <img src="@/assets/home/desk_use.png" alt="">
			        </div>
			        <p>应用管理</p>
		        </li>
		        <li>
			        <div @click="frameLink('personCenter')"  class="menu-item">
			          <img src="@/assets/home/desk_person.png" alt="">
			        </div>
			        <p>个人中心</p>
		        </li>
	      	</ul>
	      </div>
      </div>

    </el-main>
    <!--弹框修改密码-->
    <el-dialog
      title="新建部门"
      :visible.sync="dialog"
      width="30%"
      :before-close="closeDialog">
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleFormModule" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPass">
          <el-input v-model.trim="ruleFormModule.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input v-model.trim="ruleFormModule.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="againPass">
          <el-input v-model.trim="ruleFormModule.againPass"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdatePass('ruleFormModule')">取 消</el-button>
        <el-button type="primary" @click="updatePass('ruleFormModule')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="frameBox" v-show="frameShow" id="frameBox">
        <div class="frameTit">
          <div class="iBox clearFix">
            <!--<i class="iconfont icon-cross pull-right titBtn ml-10" @click="closeFrame"></i>
            <i class="iconfont icon--quanbubiankuang pull-right titBtn ml-10" @click="bigFrame"></i>
            <i class="iconfont icon-jianhao pull-right titBtn ml-10" @click="smallFrame"></i>-->
            <span>{{partName}}</span>
            <i class="iconfont icon-cross1 pull-right titBtn ml-10" @click="closeFrame"></i>
            <i class="iconfont icon--quanbubiankuang1 pull-right titBtn ml-10" @click="bigFrame"></i>
            <i class="iconfont icon-jianhao1 pull-right titBtn ml-10" @click="smallFrame"></i>
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
import {sha1} from '@/assets/js/HashEncrypt.min'
export default{
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleFormModule.againPass !== '') {
          this.$refs.ruleFormModule.validateField('againPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleFormModule.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      partName:'',
      msg: '首页',
      rouPath:'',
      frameShow:false,
      frameDom:'',
      frame:'',
      loading:false,
      userName:'',
      userType:'',
      userPhone:'',
      userEmail:'',
      departmentName:'',
      companyName:'',
      wrapper:'',
      /*修改密码弹框*/
      dialog: false,
      ruleFormModule:{
        oldPass:'',
        pass:'',
        againPass:''
      },
      rules: {
        oldPass: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        againPass: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
        ],
      },
      aaa: false,
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
      this.wrapper = 'wrapper'
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
      }else if(urlPath == 'personCenter'){
      	this.partName = '个人中心';
      	name = '个人中心';
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
      this.frame.src= 'http://daas-website.tpaas.youedata.com'
      /**测试地址
       * http://daas-website.tpaas.youedata.com
       */
      /**线上地址
       * http://10.220.1.6:31246
       */
      setTimeout(function () {
        window.frames[0].postMessage(data, 'http://daas-website.tpaas.youedata.com');
        vm.loading = false
        vm.frameShow = true
      },1000)

    },
    closeFrame(){
      this.frameDom.style.width = '90%'
      this.frameDom.style.height = '80%'
      this.frameDom.style.transition='all .2s linear'
      this.frameShow = false
      this.frame.src = ''
      this.wrapper = ''
    },
    bigFrame(){
      if(this.frameDom.style.width=='100%'){
        this.frameDom.style.width = '90%'
        this.frameDom.style.height = '80%'
        this.frameDom.style.transition='all .2s linear'
        this.wrapper = 'wrapper'
      }else{
        this.frameDom.style.width = '100%'
        this.frameDom.style.height = '100%'
        this.frameDom.style.transition='all .2s linear'
        this.wrapper = ''
      }
      let data = {
        resize:true
      }
      window.frames[0].postMessage(data, '*');
    },
    smallFrame(){
      if(this.frameDom.style.width=='100%'){
        this.frameDom.style.width = '90%'
        this.frameDom.style.height = '80%'
        this.frameDom.style.transition='all .2s linear'
        this.wrapper = 'wrapper'
      }else{
        this.frameDom.style.width = '90%'
        this.frameDom.style.height = '80%'
        this.frameDom.style.transition='all .2s linear'
        this.frameShow = false
        this.frame.src = ''
        this.wrapper = ''
      }
    },

    /*退出登陆*/
    logout(){
      let _this = this
      let header = {
        accessToken:sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('LOGOUT', { header }).then((res, req) => {
        if(res.code == 16000003){
          sessionStorage.clear()
          this.$router.push('/login')
        }
        _this.$notify({
          title: '提示信息',
          message: res.msg,
          type: res.code === 16000003 ? 'success' : 'error',
          duration: '2000'
        })
      }).catch((error) => {
        console.error(error)
      })
    },

    /*修改密码相关*/
    closeDialog () {
      this.dialog_bm = false
      this.$refs['ruleFormModule'].resetFields()
    },
    updatePass(formName){
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let newPass= sha1(_this.ruleFormModule.pass)
          let oldPass= sha1(_this.ruleFormModule.oldPass)
          let param = {
            oldPasswd:oldPass,
            accountPasswd:newPass,
            accountId:sessionStorage.getItem('accountId')
          }
          let header = {
            accessToken: sessionStorage.getItem('accessToken')
          }
          let urlData = sessionStorage.getItem('accountId')
          this.$store.dispatch('UPDATE_USER_FOR_USERS', {param, header, urlData}).then(res => {
            console.log(res)
            if(res !== null && res.code == 16000003){
              this.dialog = false
            }
            _this.$notify({
              title: '提示信息',
              message: res.msg,
              type: res.code === 16000003 ? 'success' : 'error',
              duration: '1000'
            })
          }).catch(error=>{
            console.error(error);
          })
        } else {
          return false;
        }
      });
    },
    cancelUpdatePass(formName){
      this.dialog = false
      this.$refs[formName].resetFields()
    },
  },
  created (){
    this.userName = this.$store.state.userName
    this.userType = this.$store.state.userType
    this.userPhone = this.$store.state.userPhone
    this.userEmail = this.$store.state.userEmail
    this.departmentName= this.$store.state.departmentName
    this.companyName = this.$store.state.companyName
    let personCenter = {
    	userName:this.$store.state.userName,
    	userPhone:this.$store.state.userPhone,
    	userEmail:this.$store.state.userEmail,
    	departmentName:this.$store.state.departmentName,
    	companyName:this.$store.state.companyName
    }
    personCenter = JSON.stringify(personCenter);
    sessionStorage.setItem('personCenter',personCenter)
  },
  mounted () {
    let _this = this
    this.frameDom = document.getElementById('frameBox')
    this.frame = document.getElementById('frame')
    this.removeKey()
    let userPermissionsStr = sessionStorage.getItem('userPermissions')
    let permissions = userPermissionsStr.split(',')
    _this.$store.dispatch('SET_USER_PERMISSIONS', {permissions})
  }
}
</script>
<style scoped lang="scss">
.downBox{
  text-align: center;
  color: #6A6A6A;
  .userLab{
    text-align: left;
    margin: 0 0 20px 35px;
  }
}
.downBoxImg{
  width: 100%;
  height: 150px;
  margin: 0 auto 20px;
  border-bottom: 1px solid #ccc;
  .circleImage{
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    img{
      width: 99%;
      height: 99%;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
}
.el-main{
  position: relative;
  padding: 0;
}
.management_wrap{
	width:100%;
	position: absolute;
	bottom: 0;
}
.management{
	width: 859px;
	height:auto;
	background: url("../../assets/home/home_desk.png") no-repeat 0 70px;
	margin:0 auto
}
.management ul{
	display: flex;
	justify-content: space-around;
	position: relative;
	width:780px;
	margin:0 auto
}
.management ul li{
	text-align: center;
	color:#fff;
	font-size: 14px;
	padding-bottom: 40px;
}
.management ul li img{
	width:83px;
	height:83px;

}
.home{
  height: 100%;
  /*background-image: url("../../assets/home_bg.jpg");*/
  background-image:url("../../assets/home/home_bg.png");
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
  padding:0 20px;
  /*display: flex;
  flex-direction: row;
  flex-wrap: wrap;*/
  /*align-items: center;
  align-content: center;*/
  li{
    /*flex: 0 0 16.6%;*/
    /*margin-bottom: 20px;*/
   	width:170px;
    text-align: center;
    margin-bottom: 20px;
    .menu-item{
      display: inline-block;
      /*padding: 20px;*/
      /*margin-bottom: 15px;*/
      width: 140px;
      /*height: 140px;*/
      height: 90px;
      /*background: rgba(49,49,49,0.24);*/
      /*box-shadow: 0 0 36px rgba(#999, .24) ;*/
      /*border-radius: 32px;*/
      img{
        display: inline-block;
        /*width: 100%;*/
       width:83px;
       height:83px;
      }
      +p{
        color: #fff;
        text-align: center;
        /*font-size: 24px;*/
       font-size: 14px;
      }
    }
  };
  li:hover .menu-item{
    /*background: rgba(46,46,46,0.5);
    box-shadow: 0 0 36px rgba(#bfd046, .9) ;*/
  }
}
/*.frameBox{
  background: #f5f5f5;
  width: 90%;
  height: 80%;
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  margin:auto;
  .frameTit{
    width: 100%;
    height: 5%;
    background: #bfd046;
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
        color: white;
        font-size: 16px;
      }
      i:hover{
        color: #999;
      }
    }
  }
  .frame{
    width: 100%;
    height: 94.5%;
  }

}*/
/*  2018/12/19  gxb change*/
.frameBox{
  width: 90%;
  height: 80%;
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  margin:auto;
  .frameTit{
    width: 100%;
    height: 60px;
    background: url(../../assets/iframeIcon/ifram_header.png) no-repeat;
    background-size: 100% 100%;
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
      text-align: center;
      color:#fff;
      span{
      	display: inline-block;
      	width: 100%;
      	text-align: center;
      	font-size: 18px;
      	font-weight: bold;
      }
      i{
      	display: inline-block;
      	position: absolute;
      	width:20px;
      	height:20px;
      	right: 16px;
      	top:0
      }
      .icon-cross1 {
      	background: url(../../assets/iframeIcon/ifram_close.png) no-repeat;
      }
      .icon--quanbubiankuang1{
      	background: url(../../assets/iframeIcon/ifram_changeBig.png) no-repeat;
      	right: 56px;
      }
      .icon-jianhao1 {
      	background: url(../../assets/iframeIcon/ifram_changeSmall.png) no-repeat;
      	right: 96px;
      }
    }
  }
  .frame{
    width: 100%;
    height: 94.5%;
  }

}
</style>
