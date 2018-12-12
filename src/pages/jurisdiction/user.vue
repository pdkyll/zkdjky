<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline clearFix">
        <!--<el-form-item label="角色" class="ml-10 no-mb">
          <el-select size="small" v-model="ruleForm.companyName" placeholder="选择角色">
            <el-option label="全部" value="all"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item class="pull-right no-mb">
          <el-button class="join-btn" size="small" @click="onSubmit">
            <i class="el-icon-plus"></i>
            新建用户
          </el-button>
        </el-form-item>
        <el-form-item class="pull-right no-mb">
          <el-input
            size="small"
            placeholder="输入用户名称"
            @change="searchUser"
            suffix-icon="el-icon-search"
            style="width: 100%"
            v-model="ruleForm.input">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt-20">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          :resizable=false
          prop="name"
          label="用户名称">
        </el-table-column>
        <!--<el-table-column
          :resizable=false
          prop="tel"
          label="用户电话">
        </el-table-column>-->
        <el-table-column
          :resizable=false
          prop="region"
          label="用户角色">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="gs"
          label="公司">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="bm"
          label="部门">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="zhmc"
          label="租户名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          :resizable=false
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="updateClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" size="small" @click="removeClick(scope.row)">删除</el-button>
            <!--<el-button type="text" size="small">停用</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="fy-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
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
          <el-input v-model="ruleFormModule.name"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="pass">
          <el-input v-model="ruleFormModule.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass2">
          <el-input v-model="ruleFormModule.pass2"></el-input>
        </el-form-item>
        <el-form-item label="角色选择">
          <el-select v-model="ruleFormModule.region" style="width: 100%" placeholder="请选择类型" @change="region_change">
            <el-option :label="item" :value="item" v-for="item in ruleFormModule.regionList" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司选择">
          <el-select v-model="ruleFormModule.gs" style="width: 100%" placeholder="请选择类型" @change="gsChange">
            <el-option :label="item.name" :value="item.name" v-for="item in ruleFormModule.gsList" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门选择">
          <el-select v-model="ruleFormModule.bm" style="width: 100%" placeholder="请选择类型">
            <el-option :label="item.name" :value="item.name" v-for="item in ruleFormModule.bmList" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色备注" prop="desc">
          <el-input type="textarea" v-model="ruleFormModule.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertUser">确 定</el-button>
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
        <el-form-item label="登陆密码">
          <el-input v-model="ruleFormModuleUpdate.pass" placeholder="******"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="ruleFormModuleUpdate.pass2" placeholder="******"></el-input>
        </el-form-item>
        <el-form-item label="角色选择">
          <el-select :disabled="true" v-model="ruleFormModuleUpdate.region"  style="width: 100%" placeholder="请选择类型" @change="region_change">
            <el-option :label="item" :value="item" v-for="item in ruleFormModuleUpdate.regionList" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司选择">
          <el-select :disabled="true" v-model="ruleFormModuleUpdate.gs" style="width: 100%" placeholder="请选择公司" @change="gsChange">
            <el-option :label="item.name" :value="item.name" v-for="item in ruleFormModuleUpdate.gsList" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门选择">
          <el-select :disabled="true" v-model="ruleFormModuleUpdate.bm" style="width: 100%" placeholder="请选择部门">
            <el-option :label="item.name" :value="item.code" v-for="item in ruleFormModuleUpdate.bmList" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色备注">
          <el-input type="textarea" v-model="ruleFormModuleUpdate.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_xg = false">取 消</el-button>
        <el-button type="primary" @click="yh_xg">确 定</el-button>
      </span>
    </el-dialog>
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
      msg: '123',
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
        gsList:[],
        bm: '',
        bmList:[],
        region: '',
        regionList: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        pass2: [
          { required: true, message: '请输入密码', trigger: 'blur' }
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
      pageSize:5,
      totalCount:10,
      tableData: [],
      /*删除相关的参数*/
      dialogDelete:false,
      del_id:'',
      /*修改的相关参数*/
      dialog_xg:false,
      xg_id:'',
      /*新建用户*/
      dialogVisible: false,
    }
  },
  methods: {
    onSubmit () {
      this.dialogVisible = true
      this.getCompany()
    },
    handleClose () {
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
      console.log(val)
    },
    /*用户列表展示*/
    users () {
      this.loading = true
      let _this = this
      let param = {
        pageNumber:this.pageNum,
        pageSize:this.pageSize,
        filter:'status=1'
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('USERS', { param, header }).then((res, req) => {
        this.tableData = []
        if(res !== null && res.data.code == 0 ){
          this.totalCount = res.data.result.total
          let tableList = res.data.result.datas
          for(let i =0 ;i<tableList.length;i++){
            let obj = res.data.result.datas[i].extendedProperties || ''
            this.tableData.push({
              name:tableList[i].accountName,
              /*tel:res.data.result.datas[i].telephone,
              email:res.data.result.datas[i].email,*/
              gs:typeof obj == 'Object'? obj.company:'',
              bm:typeof obj == 'Object'?obj.department:'',
              region:typeof obj == 'Object'?obj.region:'',
              zhmc:tableList[i].tenantName,
              time:tableList[i].updateTime,
              id:tableList[i].accountId,
              desc:tableList[i].description,
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
      let param = {
        pageNumber:this.pageNum,
        pageSize:this.pageSize,
        accountNames:val,
        filter:'status=1'
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('USERS', { param, header }).then((res, req) => {
        this.tableData = []
        if(res !== null && res.data.code == 0 ){
          console.log(res)
          this.totalCount = res.data.result.total
          for(let i =0 ;i<res.data.result.datas.length;i++){
            this.tableData.push({
              name:res.data.result.datas[i].accountName,
              /*tel:res.data.result.datas[i].telephone,
              email:res.data.result.datas[i].email,*/
              gs:res.data.result.datas[i].extendedProperties !==null?JSON.parse(res.data.result.datas[i].extendedProperties).company:'',
              bm:res.data.result.datas[i].extendedProperties !==null?JSON.parse(res.data.result.datas[i].extendedProperties).department:'',
              zhmc:res.data.result.datas[i].tenantName,
              time:res.data.result.datas[i].updateTime,
              id:res.data.result.datas[i].accountId,
              desc:res.data.result.datas[i].description
            })
          }
        }

      }).catch((error) => {
        console.error(error)
      })
    },
    /*删除用户*/
    removeClick(val){
      console.log(val)
      this.del_id = val.id
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
      let urlData =  this.del_id
      this.$store.dispatch('DEL_USER_FOR_USERS', { header, urlData}).then(res => {
        if(res !== null && res.code == 0){
          _this.users()
        }
        _this.$notify({
          title: '提示信息',
          message: res.msg,
          type: res.code === 0 ? 'success' : 'error',
          duration: '1000'
        })
      }).catch(error=>{
        console.error(error);
      })
    },
    /*修改的相关参数*/
    /*修改角色*/
    insertUserForUsers(){
      let _this = this
      let extendedProperties = {
        "company" : this.ruleFormModule.gs,
        "department" : this.ruleFormModule.bm,
        "region" : this.ruleFormModule.region
      }
      extendedProperties = JSON.stringify(extendedProperties)
      let pass = this.ruleFormModule.pass
      pass = sha1(pass)
      let param = {
        "accountName": this.ruleFormModule.name,
        "accountPasswd": pass,
        "description": this.ruleFormModule.desc,
        "extendedProperties": extendedProperties,
      }
      console.log(param)
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      let urlData =  this.del_id
      this.$store.dispatch('INSERT_USER_FOR_USERS', { param, header}).then(res => {
        if(res !== null && res.code == 0){
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
          type: res.code === 0 ? 'success' : 'error',
          duration: '1000'
        })
      }).catch(error=>{
        console.error(error);
      })
    },
    updateClick (row) {
      this.xg_id = row.id
      console.log(row)
      this.ruleFormModuleUpdate.name = row.name
      this.ruleFormModuleUpdate.region = row.region
      this.ruleFormModuleUpdate.desc = row.desc
      this.ruleFormModuleUpdate.gs = row.gs
      this.ruleFormModuleUpdate.bm = row.bm
      this.dialog_xg = true
    },
    xgClose(){
      this.dialog_xg = false
    },
    yh_xg(){
      let _this = this
      let param = {
        accountPasswd: sha1(this.ruleFormModuleUpdate.pass),
        description: this.ruleFormModuleUpdate.desc
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      let urlData = this.xg_id
      this.$store.dispatch('UPDATE_USER_FOR_USERS', {param, header, urlData}).then(res => {
        if(res !== null && res.code == 0){
          _this.users()
          this.dialog_xg = false
          this.ruleFormModuleUpdate.pass=''
          this.ruleFormModuleUpdate.desc = ''
        }
        _this.$notify({
          title: '提示信息',
          message: res.msg,
          type: res.code === 0 ? 'success' : 'error',
          duration: '1000'
        })
      }).catch(error=>{
        console.error(error);
      })
    },
    /*新建用户*/
    insertUser(){
      this.dialogVisible = false
      this.insertUserForUsers()
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
        if(res !== null && res.data.code == 0 ){
          for(let i =0 ;i<res.data.result.datas.length;i++){
            this.ruleFormModule.regionList.push(res.data.result.datas[i].rolename)
          }
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    getCompany(){
      let param = {
        type:'0',
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.ruleFormModule.gsList = []
      this.$store.dispatch('PROVIDER_MANAGE', { param, header }).then((res, req) => {
        if(res !== null && res.data.code == 200 ){
          console.log(res)
          for(let i =0 ;i<res.data.data.length;i++){
            this.ruleFormModule.gsList.push({
              name:res.data.data[i].companyName,
              code:res.data.data[i].code
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
        if(vm.ruleFormModule.gsList[i].name == val){
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
        if(res !== null && res.data.code == 200 ){
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
    }
  },
  mounted () {
    this.users()
    this.getRegion()
  }
}
</script>
<style scoped lang="scss">
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
