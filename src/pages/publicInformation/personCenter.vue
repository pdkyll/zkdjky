<template>
   <el-container>
    <el-container>
      <el-main>
      	 <div v-if="showUser">
      		<div class="downBoxImg">
            <span class="circleImage">
              <img src="../../assets/login/headimg.png" alt="head-img">
            </span>
          </div>
          <!--<p class="userLab">
            <span class="mr-20">
              用户电话：
            </span>
            {{userMsg.phone}}
          </p>-->
          <p class="userLab">
            <!--<span class="mr-20">
              用户邮箱：
            </span>-->
            {{userMsg.email}}
          </p>
          <p class="userText">{{userMsg.name}}</p>
          <p class="userLab">
            {{userMsg.companyName}}
          </p>
          <p class="userLab">
             {{userMsg.departmentName}}
          </p>
          <div class="changePassword">
          	<p @click="changePassword">修改密码</p>
          	<i @click="changePassword"></i>
          </div>
          <div class="layout">
          	<p @click="logout">退出</p>
          </div>
      	</div>
         <div v-else>
         	<ul>
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
         	</ul>
         	<div class="btn">
         		<p @click="sureChange('ruleFormModule')">修改</p>
         		<p @click="changePassword">返回</p>
         	</div>
         </div>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
	import {sha1} from '@/assets/js/HashEncrypt.min'
export default {
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
    	userMsg:{},
    	showUser:true,
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
    }
  },
  methods: {
    logout(){
      let _this = this
      let header = {
        accessToken:sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('LOGOUT', { header }).then((res, req) => {
//      this.$router.push('/login')
        _this.$notify({
          title: '提示信息',
          message: res.msg,
          type: res.code === 16000003 ? 'success' : 'error',
          duration: '2000'
        })
        let loginOut = 'layout';
		    window.parent.postMessage(loginOut,'*');
      }).catch((error) => {
        console.error(error)
      })
    },
    changePassword(){
    	this.showUser = !this.showUser
    },
    sureChange(formName){
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
    }
  },
  beforeCreate(){
  },
  mounted(){
    this.userMsg = JSON.parse(sessionStorage.getItem('userMsg'));
  }
}
</script>

<style scoped lang="scss">
  .el-header,
  .el-main {
    background-color: #fafafa;
    font-size: 14px;
    color:#323341
  }
  .el-main .downBoxImg{
  	text-align: center;
  }
  .el-main div>p{
  	width:100%;
  	height: 24px;
  	line-height: 24px;
  	text-align: center;
  }
  .el-main .changePassword{
  	width:481px;
  	height:auto;
  	margin:95px auto 80px;
  	position: relative;
  	cursor: pointer;
  }
  .el-main .changePassword i{
  	position: absolute;
  	right: 10px;
  	top: 7px;
  	width:20px;
  	height:18px;
  	background: url(../../assets/iframeIcon/next_type.png) no-repeat;
  }
  .el-main .changePassword p{
  	width:100%;
  	height: 32px;
  	line-height: 32px;
  	font-size: 16px;
  	color:#323341;
  	background: #f1f3f8;
  	border: 1px solid #bbbfcf;
  	border-radius: 6px;
  	text-indent: 18px;
  }

  .el-main .layout{
  	width:481px;
  	height:auto;
  	margin:0 auto 100px;
  	cursor:pointer;
  }
  .el-main .layout p{
  	width:100%;
  	height: 44px;
  	line-height: 44px;
  	border-radius: 22px;
  	box-sizing: border-box;
  	font-size: 16px;
  	color:#fff;
  	background: #bad115;
  	text-align: center;
  }
  .downBoxImg img{
  	width:68px;
  	height:68px;
  	margin: 120px auto 10px
  }
/*修改密码页面*/
 .el-main>div ul{
 	margin-top: 120px;
 }
 .el-main>div ul .el-form-item{
 	width: 540px;
 	margin-bottom: 20px;
 	margin: 0 auto 20px;
 }
 .el-main>div ul .el-form-item .el-input__inner{
 	width:446px;
 	height:30px;
 	border: 1px solid #bbbfcf;
 	border-radius: 4px;
 	text-indent: 18px;
 	color:#323341;
 	font-size: 16px;
 	background:#f1f3f8
 }
 .el-main>div .tips{
 	font-size: 12px;
 	width:540px;
 	margin:0 auto;
 	text-indent: 4px;
 	color:red
 }
 .el-main>div .btn{
 	border-top: 1px solid #dadeea;
 	width:800px;
 	margin: 100px auto 20px;
 	padding-top: 80px;
 }
 .el-main>div .btn p{
 	width:481px;
 	height:44px;
 	line-height: 44px;
 	text-align: center;
 	color:#FFFFFF;
 	font-size: 16px;
 	margin:0 auto;
 	background: #bad115;
 	border-radius: 22px;
 	cursor: pointer;
 }
 .el-main>div .btn p:last-of-type{
 	margin-top: 20px;
 	color:#bad115;
 	border:1px solid #bad115;
 	background: #fff;
 }
</style>
