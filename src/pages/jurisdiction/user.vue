<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item label="角色" class="ml-10 no-mb">
          <el-select size="small" v-model="ruleForm.companyName" placeholder="选择角色">
            <el-option label="全部" value="all"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right no-mb">
          <el-button class="join-btn" size="small" @click="onSubmit">
            <i class="el-icon-plus"></i>
            新建用户
          </el-button>
        </el-form-item>
        <el-form-item class="pull-right no-mb">
          <el-input
            size="small"
            placeholder="输入统计表名称"
            suffix-icon="el-icon-search"
            style="width: 100%"
            v-model="ruleForm.input">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt-20">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          :resizable=false
          prop="name"
          label="用户名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="tel"
          label="用户电话">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="email"
          label="用户邮箱">
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
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">停用</el-button>
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
        <el-form-item label="用户名(ID)" prop="name">
          <el-input v-model="ruleFormModule.name"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="pass">
          <el-input v-model="ruleFormModule.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass2">
          <el-input v-model="ruleFormModule.pass2"></el-input>
        </el-form-item>
        <el-form-item label="角色选择" prop="region">
          <el-select v-model="ruleFormModule.region" style="width: 100%" placeholder="请选择类型" @change="region_change">
            <el-option :label="item" :value="item" v-for="item in ruleFormModule.regionList" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司选择" prop="region">
          <el-select v-model="ruleFormModule.gs" style="width: 100%" placeholder="请选择类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门选择" prop="region">
          <el-select v-model="ruleFormModule.bm" style="width: 100%" placeholder="请选择类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色备注" prop="desc">
          <el-input type="textarea" v-model="ruleFormModule.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
export default{
  data () {
    return {
      msg: '123',
      dialogVisible: false,
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
        bm: '',
        region: '123',
        regionList: [
          '123',
          '456'
        ]
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
        region: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
      /*列表*/
      pageNum:1,
      pageSize:5,
      totalCount:10,
      tableData: []
    }
  },
  methods: {
    onSubmit () {
      this.dialogVisible = true
      console.log(this.ruleForm.companyName, this.ruleForm.date1, this.ruleForm.date2)
    },
    handleClick (row) {
      console.log(row)
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
    users () {
      let param = {
        type: '1',
        pageNumber:this.pageNum,
        pageSize:this.pageSize
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('USERS', { param, header }).then((res, req) => {
        this.tableData = []
        console.log(res)
        if(res !== null && res.data.code == 0 ){
          this.totalCount = res.data.result.total
          for(let i =0 ;i<res.data.result.datas.length;i++){
            this.tableData.push({
              name:res.data.result.datas[i].accountName,
              tel:res.data.result.datas[i].telephone,
              email:res.data.result.datas[i].email,
              gs:res.data.result.datas[i].extendedProperties !==null?JSON.parse(res.data.result.datas[i].extendedProperties).company:'',
              bm:res.data.result.datas[i].extendedProperties !==null?JSON.parse(res.data.result.datas[i].extendedProperties).company:'',
              zhmc:res.data.result.datas[i].tenantName,
              time:res.data.result.datas[i].updateTime
            })
          }
        }

      }).catch((error) => {
        console.error(error)
      })
    },
  },
  mounted () {
    this.users()
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
