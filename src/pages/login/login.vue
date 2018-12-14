/**
 * Created by zhangxin on 2018/11/18.
 */
<template>
 <div class="login">
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
    login (user, pass) {
      let _this = this
      var password = sha1(pass)
      let param = {
        accountName: user,
        accountPasswd: password
      }
      this.$store.dispatch('LOGIN', { param }).then((res, req) => {
        if (res.code === 16000003) {
          console.log(res.data)
          let data = res.data.datas
          let name = {
            name:data.accountName,
            type:data.tenantName,
            phone:data.telephone==null?'暂无':data.telephone,
            email: data.email==null?'暂无':data.email,
          }
          this.$store.dispatch('USER_MASSAGE', { name })
          sessionStorage.setItem('isOk', res.code)
          sessionStorage.setItem('accountId', data.accountId)
          sessionStorage.setItem('accessToken', data.accessToken)
          /*用于水印显示的session存储*/
          sessionStorage.setItem('userName', data.accountName)
          sessionStorage.setItem('userType', data.tenantName)
          this.$router.push('/home')
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
</style>
<style lang="scss">
  .underline-input{
    >input{
      color: #fff;
      padding-left: 0;
      border: none;
      border-bottom: 1px solid #dadde3;
      box-shadow: none;
      border-radius: 0;
      background-color: transparent !important;
      &::-webkit-input-placeholder {color: #fff;}
      &:-moz-placeholder {color:#fff;}
      &::-moz-placeholder {color:#fff;}
      &:-ms-input-placeholder {color:#fff;}
      &:hover,
      &:focus{
        border-bottom-color: #bfd046;
        &::-webkit-input-placeholder {color: #bfd046;}
        &:-moz-placeholder {color:#bfd046;}
        &::-moz-placeholder {color:#bfd046;}
        &:-ms-input-placeholder {color:#bfd046;}
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
