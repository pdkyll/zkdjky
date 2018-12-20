/**
 * Created by zhangxin on 2018/11/18.
 */
<template>
 <!--<div class="login">
  <div class="login-info">
    <h3 class="login-title"><span>正大健康云平台</span></h3>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
      <el-form-item label="" prop="userName">
        <el-input v-model="ruleForm.userName" class="underline-input" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password" >
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" class="underline-input" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="mt-50">
        <el-button type="login" @click="submitForm('ruleForm')">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
 </div>-->
 <div class="box loginWrap">
    <div class="loginContent">
      <div class="logoBox">
        <div class="logoIcon"></div>
        <h3 class="platformName">正大健康云平台</h3>
      </div>
      <div class="formBox">
	  	<!--<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="formBody demo-ruleForm">
	      <el-form-item class="fromField" label="" prop="userName">
	        <el-input v-model="ruleForm.userName" class="inpIcon userInput underline-input" placeholder="账号"></el-input>
	      </el-form-item>
	      <el-form-item class="fromField topBor" label="" prop="password" >
	        <el-input type="password" v-model="ruleForm.password" autocomplete="off" class="inpIcon userPsw underline-input" placeholder="密码"></el-input>
	      	<span class="signIn" @click="submitForm('ruleForm')"></span>
	      </el-form-item>
		</el-form>-->
		<div class="formBody demo-ruleForm">
	      <div class="fromField" label="">
	      	<i></i>
	        <input v-model="ruleForm.userName" class="inpIcon userInput underline-input" placeholder="账号" @blur="useName" @keyup.enter="submitLogin">
	      </div>
	      <div class="fromField topBor">
	      	<i></i>
	        <input type="password" v-model="ruleForm.password" autocomplete="off" @blur="password" class="inpIcon userPsw underline-input" placeholder="密码" @keyup.enter="submitLogin">
	      	<span class="signIn" @click="submitLogin"></span>
	      </div>
		</div>
		<div class="tips">
	      	<i v-show="tipsShow"></i>
	      	<span v-show="tipsShow">{{tips}}</span>
	      </div>
        <div class="formTip">
          <!--<div class="saveLogin">
              <em></em><span class="labelText">保持我的登录状态</span>
          </div>-->
          <div class="borderLinear"></div>
          <p class="subTip">温馨提示：如果忘记密码请联系管理员为您重置密码。</p>
        </div>
      </div>
    </div>
  	<div class="zdbq">@&nbsp;&nbsp;2017正大制药集团&nbsp; 版权所有</div>
 </div>
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
    return {
      tipsShow:false,
      tips:'',
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(this.ruleForm.userName, this.ruleForm.password)
        } else {
          return false;
        }
      });
    },
    useName(){
    	if(!this.ruleForm.userName){
    		this.tipsShow = true,
      		this.tips = '请输入你的账户'
    	}else{
    		this.tipsShow = false,
      		this.tips = ''
    	}
    },
    password(){
    	if(!this.ruleForm.password){
    		this.tipsShow = true,
      		this.tips = '请输入你的密码'
    	}else{
    		this.tipsShow = false,
      		this.tips = ''
    	}
    },
    submitLogin(){
    	if(!this.ruleForm.userName){
    		this.tipsShow = true,
      		this.tips = '请输入你的账户'
    	}else if(!this.ruleForm.password){
    		this.tipsShow = true,
      		this.tips = '请输入你的密码'
    	}else{
    		this.tipsShow = false,
      		this.tips = '',
    		this.login(this.ruleForm.userName, this.ruleForm.password)
    	}

    },
    /*获取权限*/
    getJurisdiction(){
      let _this = this
      //GET_JURISDICTION
      let header = {
        accessToken:  sessionStorage.getItem('accessToken'),
        projectId: sessionStorage.getItem('projectId')
      }
      let param = {}
      this.$store.dispatch('GET_JURISDICTION', { param, header }).then((res, req) => {
        sessionStorage.setItem('userPermissions',res.data.data)
        _this.$nextTick(() => {
          _this.$router.push('/home')
        })
      }).catch((error) => {
        console.error(error)
      })
    },
    login (user, pass) {
      let _this = this
      var password = sha1(pass)
      let param = {
        accountName: user,
        accountPasswd: password
      }
      this.$store.dispatch('LOGIN', { param }).then((res, req) => {
        if (res.code === 16000003) {
          let data = res.data.datas
          let name = {
            name:data.accountName,
            type:data.tenantName,
            phone:data.telephone==null?'暂无':data.telephone,
            email: data.email==null?'暂无':data.email,
            companyName:res.data.companyName==null?'暂无':res.data.companyName,
            departmentName: res.data.departmentName==null?'暂无':res.data.departmentName,
          }
          this.$store.dispatch('USER_MASSAGE', { name })
          sessionStorage.setItem('isOk', res.code)
          sessionStorage.setItem('accountId', data.accountId)
          sessionStorage.setItem('accessToken', data.accessToken)
          sessionStorage.setItem('projectId', '0ba94f86769c42a4aba6282834aee3b9')
          /*用于水印显示的session存储*/
          sessionStorage.setItem('userName', data.accountName)
          sessionStorage.setItem('userType', data.tenantName)
          sessionStorage.setItem('company', res.data.companyName)
          sessionStorage.setItem('department', res.data.departmentName)
          let userMsg = JSON.stringify(name);
          sessionStorage.setItem('userMsg', userMsg)
          this.getJurisdiction()
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
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
  .mt-50{
    margin-top: 50px;
  }
  .login,
  .login-info{
    color: #fff;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
  .login{
    position: relative;
    background-image: url("../../assets/login_bg.jpg");
    .login-info{
      position: absolute;
      right: 0;
      padding: 200px 120px 0;
      width: 39.53%;
      background-image: url("../../assets/login_bg_info.jpg");
    }
    .login-title{
      margin-top: 20px;
      margin-bottom: 30px;
      span,
      &:before{
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
      }
      &:before{
        content: ' ';
        width: 6px;
        height: 20px;
        background-color: #d6ef21;
      }
    }
  }
  /*2018/12/18 GXB start*/
  .box{
    width: 100%;
    height: 100%;
    background: url("../../assets/login/healthycloud_bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    overflow: hidden;
  }
  .loginWrap{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logoIcon{
    width:112px;
    height:112px;
    background: url('../../assets/login/zd_logo.png') no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .platformName{
    color: #fff;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
  }
  .formBody{
    position: relative;
    background-color: #fff;
    border: 1px solid #c8c8c8;
    border-radius: 10px;
    padding: 0 1px;
  }
  .fromField{
    position: relative;
    margin-bottom: 0;
  }
  .fromField i{
  	position: absolute;
  	top:2px;
  	left: 4px;
  	width:34px;
  	height:35px;
  	background: url('../../assets/login/login_username.png') no-repeat;
  }
  .topBor i{
  	background: url('../../assets/login/login_password.png') no-repeat;
  }
  .loginWarningBox{
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .loginWarningBox .arrow-top{
    position: absolute;
    left: 50%;
    top: -1px;
    margin-left: -5px;
    background-color: #83a1d4;
  }
  .loginWarningText{
    display: inline-block;
    background-color: #83a1d4;
    border: 1px solid #385ba5;
    color: #fff;
    border-radius: 10px;
  }
  .loginWarningText span{
    display: inline-block;
    background: url('/appIcon/mark_icon.png') no-repeat left center;
    margin: 0 50px;
  }
  .inpIcon{
    background-repeat: no-repeat;
    background-position: 9px center;
    color: #666;
    height: 100%;
    border: 0;
    border-radius: 10px;
  }
  .signIn{
    position: absolute;
    right: 15px;
    width: 25px;
    height: 25px;
    top:12px;
    background: url('../../assets/login/login_land.png') no-repeat center center;
    cursor: pointer;
  }
  .topBor{
    border-top: 1px solid #b9b8b8;
  }
  .userInput{
    font-size: 16px;
    width: 378px;
    height:49px;
    padding: 0 50px 0 50px;
    outline: none;
  }
  .underline-input>input{
  	border: none;
  }
  .userPsw{
    font-size: 16px;
    width: 378px;
    height:49px;
    padding: 0 0 0 50px;
    outline: none;
  }
  .tips{
  	color:#fff;
  	height:30px;
  	font-size: 14px;
  	padding-top: 6px;
  	box-sizing: border-box;
  }
  .tips i{
  	display: inline-block;
  	width:22px;
  	height:24px;
  	background: url('../../assets/login/login_warning.png');
  	vertical-align: middle;
  }
  .tips span{
  	display: inline-block;
  	vertical-align: middle;
  	margin-left: 4px;
  }
  .formTip{
    margin-top: 83px;
    color: #fff;
    text-align: center;
    font-size:12px
  }
  .saveLogin em{
	display: inline-block;
	width:16px;
	height: 16px;
	background: url(../../assets/login/login_nochecked.png) no-repeat;
	background-size: 100% 100%;
	vertical-align: middle;
	margin-right: 8px;
  }
  .saveLogin span{
  	display: inline-block;
  	vertical-align: middle;
  	font-size: 14px;
  }
  .zdbq{
  	position: absolute;
  	bottom: 20px;
	font-size: 12px;
	color:#fff;
   }
  .borderLinear{
     margin: 10px 0 14px 0;
     height: 1px;
     background: linear-gradient(to right, transparent, #fff, transparent);
   }
  .uiCheckbox{
    position: relative;
  }
  .uiCheckbox input{
    position: relative;
  }
  .uiCheckbox input:before{
    content: "";
    display: inline-block;
    background-color: #fff;
    border: 1px solid #c9c9c9;
    cursor: pointer;
    position: absolute;
  }
  .uiCheckbox input:checked:after{
    content: "";
    display: inline-block;
    border: 1px solid #2d489a;
    background: url('/appIcon/checked_icon.png') no-repeat center center;
    background-color: #355fc6;
    background-size: 100% 100%;
    position: absolute;
    cursor: pointer;
  }
/*2018/12/18 GXB end*/
</style>
<style lang="scss">
  .underline-input{
    >input{
      color: #666;
      height:100%;
      padding-left: 0;
      border: none;
      /*border-bottom: 1px solid #dadde3;*/
      box-shadow: none;
      border-radius: 0;
      background-color: transparent !important;
      &::-webkit-input-placeholder {color: #666;}
      &:-moz-placeholder {color:#666;}
      &::-moz-placeholder {color:#666;}
      &:-ms-input-placeholder {color:#666;}
      &:hover,
      &:focus{
        border-bottom-color: #bfd046;
        &::-webkit-input-placeholder {color: #666;}
        &:-moz-placeholder {color:#666;}
        &::-moz-placeholder {color:#666;}
        &:-ms-input-placeholder {color:#666;}
      }
    }
  }
  .el-button--login{
    width: 100%;
    color: #fff;
    border-radius: 10px;
    font-size: 18px;
    border-color: #d5d655;
    background-image: linear-gradient(to right, #b7cc41,#d5d655);
    &:hover,
    &:focus{
      color: #fff;
      border-color: #d5d655;
     }
  }
</style>
