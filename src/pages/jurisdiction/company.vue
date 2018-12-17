<template>
  <div>
    <div class="shadow-box clearFix">
        <el-button class="join-btn pull-right" size="small" @click="add_GS()">
          <i class="el-icon-plus"></i>
          新建公司
        </el-button>
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
          label="公司名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="cpcc"
          label="数据代码">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="description"
          label="备注">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="create_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          :resizable=false
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="xg(scope.row)">修改</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
    <!--弹框新建公司-->
    <el-dialog
      title="新建公司"
      :visible.sync="dialog_gs"
      width="30%"
      :before-close="gsClose">
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleFormModule" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="ruleFormModule.name"></el-input>
        </el-form-item>
        <el-form-item label="数据代码" prop="cpcc">
          <el-input v-model="ruleFormModule.cpcc"></el-input>
        </el-form-item>
        <el-form-item label="公司备注">
          <el-input type="textarea" v-model="ruleFormModule.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_gs = false">取 消</el-button>
        <el-button type="primary" @click="insert_GS('ruleFormModule')">确 定</el-button>
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
        <el-button type="primary" @click="delete_data">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改列表项-->
    <el-dialog
      title="修改"
      :visible.sync="dialog_xg"
      width="30%"
      :before-close="xgClose">
      <el-form ref="ruleFormUpdate" :rules="rules" :model="ruleFormUpdate" label-width="100px">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="ruleFormUpdate.name"></el-input>
        </el-form-item>
        <el-form-item label="公司描述">
          <el-input v-model="ruleFormUpdate.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_xg = false">取 消</el-button>
        <el-button type="primary" @click="insert_xg('ruleFormUpdate')">确 定</el-button>
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
      loading:true,
      companyList:[],
      ruleFormModule: {
        name: '',
        cpcc:'',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        cpcc: [
          { required: true, message: '请输入数据代码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      ruleFormUpdate:{
        name: '',
        description: ''
      },
      pageNum:1,
      pageSize:5,
      totalCount:0,
      tableData: [],
      xg_gsmc:'',
      xg_gsms:'',
      /*添加部门相关的函数*/
      dialog_gs: false,
      dialog_bm: false,
      dialog_xg:false,
      dialogDelete: false,
      deleteId : '',
    }
  },
  methods: {
    /*初始化表格*/
    search_list(){
      let _this = this
      _this.loading = true
      let param = {
        type:'0',
        pagenum: _this.pageNum,
        pagesize:_this.pageSize
      }
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      _this.$store.dispatch('PROVIDER_MANAGE', { param, header }).then((res, req) => {
        _this.tableData = []
        _this.totalCount = res.data.data.totalNum
        if(res.data.code === 16000003){
          let resultData = res.data.data.viewResult || []
          for(let i = 0; i<resultData.length;i++){
            _this.tableData.push({
              name: resultData[i].companyName,
              cpcc: resultData[i].cPCC,
              description: resultData[i].description,
              create_time: resultData[i].createTime,
              id: resultData[i].id,
            })
          }
          _this.$nextTick(() => {
            _this.loading = false
          })
        }else{
          console.log("接口错误")
        }

      }).catch((error) => {
        console.error(error)
      })
    },
    deleteClose(){
      this.dialogDelete = false
    },
    handleSizeChange (val) {
      this.pageNum = val
      this.search_list()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.search_list()
    },
    handleClick (row) {
      this.dialogDelete = true
      this.deleteId = row.id
    },
    /*新增公司*/
    insert_GS(formName){
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog_gs = false
          let param = {
            "address":"",
            "contact":"sjm",
            "create_by":"sjm",
            "cPCC":this.ruleFormModule.cpcc,
            "description":this.ruleFormModule.desc,
            "level":1,
            "id":1,
            "name":this.ruleFormModule.name,
            "code":"1",
            "pcode":0,
            "pid":0,
            "paramType":1,
            "postcode":"",
            "telephone":"13012455623",
            "type":0
          }
          let header = {
            accountId: sessionStorage.getItem('accountId'),
            accessToken: sessionStorage.getItem('accessToken')
          }
          this.$store.dispatch('PROVIDER_MANAGE_INSERT', { param, header }).then((res, req) => {
            if(res.code === 16000003){
              this.ruleFormModule.desc = ""
              this.ruleFormModule.name = ""
              this.ruleFormModule.cpcc = ""
              _this.search_list()
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
        } else {
          return false
        }
      })
    },
    add_GS () {
      this.dialog_gs = true
    },
    gsClose () {
      this.dialog_gs = false
    },
    /*修改公司*/
    xg(val){
      this.ruleFormUpdate.id = val.id
      this.ruleFormUpdate.name = val.name
      this.ruleFormUpdate.description = val.description
      this.dialog_xg = true
    },
    xgClose(){
      this.dialog_xg = false
    },
    /*修改公司信息*/
    insert_xg(formName){
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            name: "",
            telephone: "13012455623",
            contact: "张三",
            description: "",
            update_by: "岸本齐史",
            address: "菁蓉镇"
          }
          param = Object.assign({}, param, _this.ruleFormUpdate)
          let header = {
            accountId: sessionStorage.getItem('accountId'),
            accessToken: sessionStorage.getItem('accessToken')
          }
          _this.$store.dispatch('PROVIDER_MANAGE_UPDATE', { param, header }).then((res, req) => {
            _this.$notify({
              title: '提示信息',
              message: res.msg,
              type: res.code === 16000003 ? 'success' : 'error',
              duration: '2000'
            })
            if(res.code !== 16000003){
              return
            }
            _this.dialog_xg = false
            _this.search_list()
          }).catch((error) => {
            console.error(error)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /*删除某条数据的方法*/
    delete_data(){
      let _this = this
      let param = {
        ids: this.deleteId
      }
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('PROVIDER_MANAGE_DEL', { param, header }).then((res, req) => {
        if(res.code === 16000003){
          this.search_list()
          this.dialogDelete = false
        }else{
          console.log("接口错误")
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
  created(){
    this.search_list()
  },
  mounted () {
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
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
