<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline clearFix" @submit.native.prevent>
        <el-form-item v-if="$store.getters.getPermissions.indexOf('queryUserManagement')>-1" class="no-mb" label="用户名称">
          <el-input
            size="small"
            placeholder="输入用户名称"
            @change="searchUser"
            style="width: 100%"
            v-model.trim="ruleForm.input">
          </el-input>
        </el-form-item>
        <el-form-item v-if="$store.getters.getPermissions.indexOf('queryUserManagement')>-1">
          <el-button type="primary" size="small" @click="search" class="green-btn">查询</el-button>
        </el-form-item>
        <el-form-item class="pull-right no-mb" v-if="$store.getters.getPermissions.indexOf('addUserManagement')>-1">
          <el-button class="join-btn" size="small" @click="onSubmit">
            <i class="el-icon-plus"></i>
            新建用户
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt-20">
      <el-table
        v-loading="loading"
        :data="tableData"
        :header-cell-style="{background:'#f0f1f1'}"
        style="width: 100%">
        <el-table-column
          :resizable=false
          align="center"
          prop="name"
          label="用户名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          align="center"
          prop="region"
          label="用户角色">
        </el-table-column>
        <el-table-column
          :resizable=false
          align="center"
          prop="gs"
          label="公司">
        </el-table-column>
        <el-table-column
          :resizable=false
          align="center"
          prop="bm"
          label="部门">
        </el-table-column>
        <el-table-column
          :resizable=false
          align="center"
          prop="zhmc"
          label="租户名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          align="center"
          prop="time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          :resizable=false
          align="center"
          prop="desc"
          label="用户备注">
        </el-table-column>
        <el-table-column
          :resizable=false
          align="center"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="usering(scope.row)">{{scope.row.useType}}</el-button>
            <el-button @click="updateClick(scope.row)" type="text" size="small" v-if="$store.getters.getPermissions.indexOf('editUserManagement')>-1">修改</el-button>
            <el-button type="text" size="small" @click="removeClick(scope.row)" v-if="$store.getters.getPermissions.indexOf('delUserManagement')>-1">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fy-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size=pageSize
          layout="total, prev, pager, next"
          :total=totalCount>
        </el-pagination>
      </div>
    </div>
    <!--弹框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model.trim="ruleFormModule.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="pass">
          <el-input v-model.trim="ruleFormModule.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass2">
          <el-input v-model.trim="ruleFormModule.pass2"></el-input>
        </el-form-item>
        <el-form-item label="角色选择" prop="region">
          <el-select v-model="ruleFormModule.region" style="width: 100%" placeholder="请选择类型" @change="region_change">
            <el-option :label="item.name" :value="item.name"  v-for="item in ruleFormModule.regionList" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司选择" prop="gs">
          <el-select v-model="ruleFormModule.gs" style="width: 100%" placeholder="请选择类型" @change="gsChange">
            <el-option :label="item.name" :value="item.code" v-for="item in ruleFormModule.gsList" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门选择" prop="bm">
          <el-select v-model="ruleFormModule.bm" style="width: 100%" placeholder="请选择类型">
            <el-option :label="item.name" :value="item.code" v-for="item in ruleFormModule.bmList" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input type="textarea" v-model.trim="ruleFormModule.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelInsert('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="insertUser('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--弹框删除列表项-->
    <el-dialog
      title="提示信息"
      :visible.sync="dialogDelete"
      width="30%"
      :before-close="deleteClose">
      <p>是否删除该数据？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="delUserForUsers">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改列表项-->
    <el-dialog
      title="修改"
      :visible.sync="dialog_xg"
      width="30%"
      :before-close="xgClose">
      <el-form :model="ruleFormModuleUpdate" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="ruleFormModuleUpdate.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="ruleFormModuleUpdate.pass" :disabled="true" placeholder="******"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" >
          <el-input v-model="ruleFormModuleUpdate.pass2" :disabled="true" placeholder="******"></el-input>
        </el-form-item>
        <el-form-item label="角色选择">
          <el-select  v-model="ruleFormModuleUpdate.region" style="width: 100%" placeholder="请选择类型" @change="region_change">
            <el-option :label="item.name" :value="item.name" v-for="item in ruleFormModuleUpdate.regionList" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司选择">
          <el-select v-model="ruleFormModuleUpdate.gs" style="width: 100%" placeholder="请选择公司" @change="gsChange_upData">
            <el-option :label="item.name" :value="item.code" v-for="item in ruleFormModuleUpdate.gsList" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门选择">
          <el-select v-model="ruleFormModuleUpdate.bm" style="width: 100%" placeholder="请选择部门" @change="bmChange_upData">
            <el-option :label="item.name" :value="item.code" v-for="item in ruleFormModuleUpdate.bmList" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input type="textarea" v-model.trim="ruleFormModuleUpdate.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_xg = false">取 消</el-button>
        <el-button type="primary" @click="yh_xg('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--弹框显示是否停用-->
    <el-dialog
      title="提示信息"
      :visible.sync="dialogUse"
      width="30%"
      :before-close="useClose">
      <p>是否停用此账户？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUse = false">取 消</el-button>
        <el-button type="primary" @click="updateUse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {sha1} from '@/assets/js/HashEncrypt.min'
export default{
  data () {
    return {
      loading:true,
      ruleForm: {
        companyName: '',
        date1: '',
        date2: '',
        input: ''
      },
      ruleFormModule: {
        name: '',
        pass: '',
        pass2: '',
        type: '',
        desc: '',
        gs: '',
        gsList:[],
        bm: '',
        bmList:[],
        region: '',
        regionList: [],
      },
      ruleFormModuleUpdate: {
        name: '',
        pass: '',
        pass2: '',
        type: '',
        desc: '',
        gs: '',
        gsCode:'',
        gsList:[],
        bm: '',
        bmCode:'',
        bmList:[],
        region: '',
        regionList: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pass2: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        gs: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        bm: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },
      /*列表*/
      pageNum:1,
      pageSize:10,
      totalCount:0,
      tableData: [],
      /*删除相关的参数*/
      dialogDelete:false,
      use_id:'',
      /*修改的相关参数*/
      dialog_xg:false,
      xg_id:'',
      /*新建用户*/
      dialogVisible: false,
      /*停用启用*/
      dialogUse:false,
      useCode:'',
    }
  },
  methods: {
    onSubmit () {
      this.dialogVisible = true

    },
    handleClose () {
      this.$refs['ruleForm'].resetFields()
      this.dialogVisible = false
    },
    handleSizeChange (val) {
      this.pageNum = val
      this.users()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.users()
    },
    region_change (val) {
      this.ruleFormModule.region = val
    },
    /*用户列表展示*/
    users () {
      this.loading = true
      let _this = this
      let param = {
        pageNumber:this.pageNum,
        pageSize:this.pageSize,
        accountNames:this.ruleForm.input,
        filter:'status!=2'
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('USERS', { param, header }).then((res, req) => {
        console.log(res)
        this.tableData = []
        if(res !== null && res.data.code == 16000003 ){
          this.totalCount = res.data.data.totalNum
          this.pageNum = res.data.data.pageNum
          let tableList = res.data.data.datas
          for(let i =0 ;i<tableList.length;i++){
            let str = res.data.data.datas[i].extendedProperties
            let obj = JSON.parse(str) || ''
            this.tableData.push({
              name:tableList[i].accountName,
              /*tel:res.data.result.datas[i].telephone,
              email:res.data.result.datas[i].email,*/
              gs:obj.company == undefined?'':obj.companyName,
              bm:obj.department== undefined?'':obj.departmentName,
              region:obj.region== undefined?'':obj.region,
              gsCode:obj.company == undefined?'':obj.company,
              bmCode:obj.company == undefined?'':obj.department,
              zhmc:tableList[i].tenantName,
              time:tableList[i].updateTime,
              id:tableList[i].accountId,
              useType:tableList[i].status == 1?'停用':'启用',
              useCode:tableList[i].status + '',
              desc:tableList[i].description==null?'':tableList[i].description,
            })
          }
        }
        _this.$nextTick(() => {
          _this.loading = false
        })
      }).catch((error) => {
        console.error(error)
      })
    },
    /*模糊查询用户*/
    searchUser(val){
      this.ruleForm.input = val
    },
    search(){
      this.pageNum = 1
      console.log(this.pageNum)
      this.users()
      /*this.loading = true
      let param = {
        pageNumber:this.pageNum,
        pageSize:this.pageSize,
        accountNames:this.ruleForm.input,
        filter:'status=1'
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('USERS', { param, header }).then((res, req) => {
        this.tableData = []
        if(res !== null && res.data.code == 16000003 ){
          this.totalCount = res.data.data.totalNum
          let tableList = res.data.data.datas
          for(let i =0 ;i<tableList.length;i++){
            let str = res.data.data.datas[i].extendedProperties
            let obj = JSON.parse(str) || ''
            this.tableData.push({
              name:tableList[i].accountName,
              /!*tel:res.data.result.datas[i].telephone,
              email:res.data.result.datas[i].email,*!/
              gs:obj.company == undefined?'':obj.company,
              bm:obj.department== undefined?'':obj.department,
              region:obj.region== undefined?'':obj.region,
              zhmc:tableList[i].tenantName,
              time:tableList[i].updateTime,
              id:tableList[i].accountId,
              desc:tableList[i].description,
            })
          }
        }
        this.loading = false
      }).catch((error) => {
        console.error(error)
      })*/
    },
    /*删除用户*/
    removeClick(val){
      this.use_id = val.id
      this.dialogDelete = true
    },
    deleteClose(){
      this.dialogDelete = false
    },
    delUserForUsers(){
      let _this = this
      this.dialogDelete = false
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      let urlData =  this.use_id
      this.$store.dispatch('DEL_USER_FOR_USERS', { header, urlData}).then(res => {
        if(res !== null && res.code == 16000003){
          _this.users()
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
    },
    /*修改的相关参数*/
    /*修改角色*/
    updateClick (row) {
      this.xg_id = row.id
      this.ruleFormModuleUpdate.gsCode = row.gsCode
      this.ruleFormModuleUpdate.bmCode = row.bmCode
      this.ruleFormModuleUpdate.name = row.name
      this.ruleFormModuleUpdate.region = row.region
      this.ruleFormModuleUpdate.desc = row.desc
      this.ruleFormModuleUpdate.gs = row.gs
      this.ruleFormModuleUpdate.bm = row.bm
      this.dialog_xg = true
      /*获取当前公司的部门信息*/
      let vm = this

      let param = {
        type:'',
        code:row.gsCode
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.ruleFormModuleUpdate.bmList = []
      this.$store.dispatch('GET_DEPARTMENT', { param, header }).then((res, req) => {
        if(res !== null && res.data.code == 16000003 ){
          for(let i =0 ;i<res.data.data.length;i++){
            this.ruleFormModuleUpdate.bmList.push({
              name:res.data.data[i].name,
              code:res.data.data[i].code
            })
          }
          console.log( this.ruleFormModuleUpdate.bmList)
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    xgClose(){
      this.dialog_xg = false
    },
    yh_xg(formName){
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let roleId = ''
          for(let i = 0;i<this.ruleFormModuleUpdate.regionList.length;i++){
            if(this.ruleFormModuleUpdate.regionList[i].name == this.ruleFormModuleUpdate.region){
              roleId = this.ruleFormModuleUpdate.regionList[i].value
            }
          }
          let extendedProperties = {
            "company" : this.ruleFormModuleUpdate.gsCode,
            "department" : this.ruleFormModuleUpdate.bmCode,
            "region" : this.ruleFormModuleUpdate.region,
            "roleId" : roleId,
            "projectId":sessionStorage.getItem('projectId')
          }
          extendedProperties = JSON.stringify(extendedProperties)
          let param = {
            "extendedProperties": extendedProperties,
            "description": this.ruleFormModuleUpdate.desc,
          }
          let header = {
            accessToken: sessionStorage.getItem('accessToken')
          }
          let urlData =  this.xg_id
          this.$store.dispatch('UPDATE_USER_FOR_USERS', {param, header, urlData}).then(res => {
            if(res !== null && res.code == 16000003){
              _this.ruleFormModuleUpdate.pass = ''
              _this.ruleFormModuleUpdate.pass2 = ''
              _this.users()
              this.dialog_xg = false
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
    /*新建用户*/
    insertUserForUsers(){
      let _this = this
      let roleId = ''
      for(let i = 0;i<this.ruleFormModule.regionList.length;i++){
        if(this.ruleFormModule.regionList[i].name == this.ruleFormModule.region){
          roleId = this.ruleFormModule.regionList[i].value
        }
      }
      let extendedProperties = {
        "company" : this.ruleFormModule.gs,
        "department" : this.ruleFormModule.bm,
        "region" : this.ruleFormModule.region,
        "roleId" : roleId,
        "projectId":sessionStorage.getItem('projectId')
      }
      console.log(extendedProperties)
      extendedProperties = JSON.stringify(extendedProperties)
      let pass = this.ruleFormModule.pass
      pass = sha1(pass)
      let param = {
        "accountName": this.ruleFormModule.name,
        "accountPasswd": pass,
        "description": this.ruleFormModule.desc,
        "extendedProperties": extendedProperties,
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      let urlData =  this.use_id
      this.$store.dispatch('INSERT_USER_FOR_USERS', { param, header}).then(res => {
        if(res !== null && res.code == 16000003){
          _this.users()
          this.dialogVisible = false
          _this.ruleFormModule.name = ''
          _this.ruleFormModule.pass = ''
          _this.ruleFormModule.pass2 = ''
          _this.ruleFormModule.type = ''
          _this.ruleFormModule.desc = ''
          _this.ruleFormModule.gs = ''
          _this.ruleFormModule.bm = ''
          _this.ruleFormModule.region = ''
        }
        _this.$notify({
          title: '提示信息',
          message: res.msg,
          type: res.code === 16000003 ? 'success' : 'error',
          duration: '2000'
        })
      }).catch(error=>{
        console.error(error);
      })
    },
    insertUser(formName){
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.insertUserForUsers()
          _this.dialogVisible = false
        } else {
          return false;
        }
      });
    },
    cancelInsert(formName){
      this.dialogVisible = false
      this.$refs[formName].resetFields()
    },
    /*获取角色-公司-部门下拉菜单*/
    getRegion(){
      let param = {
        pageNumber:1,
        pageSize:1000,
        filter:'status=1',
        type:'1',
        extend:true
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.ruleFormModule.regionList = []
      this.$store.dispatch('ROLES', { param, header }).then((res, req) => {
        if(res !== null && res.data.code == 16000003 ){
          for(let i =0 ;i<res.data.data.datas.length;i++){
            this.ruleFormModule.regionList.push({
              name:res.data.data.datas[i].rolename,
              value:res.data.data.datas[i].id
            })
            this.ruleFormModuleUpdate.regionList.push({
              name:res.data.data.datas[i].rolename,
              value:res.data.data.datas[i].id
            })
          }
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    getCompany(){
      let param = {
        type:'0,2',
        pageSize:100000,
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.ruleFormModule.gsList = []
      this.ruleFormModuleUpdate.gsList = []
      this.$store.dispatch('PROVIDER_MANAGE', { param, header }).then((res, req) => {
        if(res !== null && res.data.code == 16000003 ){
          for(let i =0 ;i<res.data.data.viewResult.length;i++){
            this.ruleFormModule.gsList.push({
              name:res.data.data.viewResult[i].companyName,
              code:res.data.data.viewResult[i].code
            })
            this.ruleFormModuleUpdate.gsList.push({
              name:res.data.data.viewResult[i].companyName,
              code:res.data.data.viewResult[i].code
            })
          }
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    /*选择公司以后获取部门*/
    gsChange(val){
      let vm = this
      let code = ''
      for(let i = 0;i<vm.ruleFormModule.gsList.length;i++){
        if(vm.ruleFormModule.gsList[i].code == val){
          code = vm.ruleFormModule.gsList[i].code
        }
      }
      let param = {
        type:'',
        code:code
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.ruleFormModule.bmList = []
      this.$store.dispatch('GET_DEPARTMENT', { param, header }).then((res, req) => {

        if(res !== null && res.data.code == 16000003 ){
          for(let i =0 ;i<res.data.data.length;i++){
            this.ruleFormModule.bmList.push({
              name:res.data.data[i].name,
              code:res.data.data[i].code
            })
          }
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    gsChange_upData(val){
      console.log(val)
      this.ruleFormModuleUpdate.gsCode = val
      let param = {
        type:'',
        code: this.ruleFormModuleUpdate.gsCode
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.ruleFormModuleUpdate.bmList = []
      this.$store.dispatch('GET_DEPARTMENT', { param, header }).then((res, req) => {
        if(res !== null && res.data.code == 16000003 ){
          for(let i =0 ;i<res.data.data.length;i++){
            this.ruleFormModuleUpdate.bmList.push({
              name:res.data.data[i].name,
              code:res.data.data[i].code
            })
          }
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    bmChange_upData(val){
      this.ruleFormModuleUpdate.bmCode = val
      console.log(val)
    },
    /*用户停用启用*/
    useClose(){
      this.dialogUse = false
    },
    usering(row){
      this.dialogUse = true
      this.use_id = row.id
      if(row.useCode == '0'){
        this.useCode = '1'
      }else{
        this.useCode = '0'
      }
    },
    updateUse(){
      this.loading = true
      let _this = this
      let param = {
        "status":this.useCode
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      let urlData =  this.use_id
      this.$store.dispatch('UPDATE_USER_FOR_USERS', {param, header, urlData}).then(res => {
        if(res !== null && res.code == 16000003){
          _this.users()
          this.dialogUse = false
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
      this.dialogUse = false
    }
  },
  mounted () {
    this.users()
    this.getCompany()
    this.getRegion()
  }
}
</script>
<style scoped lang="scss">
	.el-form-item{
		margin-bottom: 0;
	}
  .join-btn{
    width: 150px;
    color: white;
    border-color: #d5d655;
    background-image: linear-gradient(to right, #b7cc41,#d5d655);
    &:hover,
    &:focus{
      color: white;
      border-color: #d5d655;
      background-image: linear-gradient(to right, #b7cc41,#d5d655);
    }
  }
  .shadow-box{
    padding: 10px 5px;
    box-shadow: 0 0 29px rgba(#b1c4d0, .48);
  }
</style>
