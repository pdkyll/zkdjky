
<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item label="公司名称" class="ml-10 no-mb">
          <el-select size="small" v-model="ruleForm.companyName" placeholder="请选择活动区域">
            <el-option label="江苏天晴" value="jiangsu"></el-option>
            <el-option label="南京天晴" value="nanjing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button class="join-btn" size="small" @click="add_BM()">
            <i class="el-icon-plus"></i>
            新建部门
          </el-button>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button class="join-btn" size="small" @click="add_GS()">
            <i class="el-icon-plus"></i>
            新建公司
          </el-button>
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
          label="单位名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="type"
          label="单位类型">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="description"
          label="单位描述">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="create_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          :resizable=false
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="xg(scope.row)">修改</el-button>
            <el-button type="text" size="small">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fy-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <!--弹框新建公司-->
    <el-dialog
      title="新建公司"
      :visible.sync="dialog_gs"
      width="30%"
      :before-close="gsClose">
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="ruleFormModule.name"></el-input>
        </el-form-item>
        <el-form-item label="公司备注" prop="desc">
          <el-input type="textarea" v-model="ruleFormModule.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_gs = false">取 消</el-button>
        <el-button type="primary" @click="insert_GS">确 定</el-button>
      </span>
    </el-dialog>
    <!--弹框新建部门-->
    <el-dialog
      title="新建部门"
      :visible.sync="dialog_bm"
      width="30%"
      :before-close="bmClose">
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司名称">
          <el-select size="small" style="width: 100%" v-model="ruleFormModule.companyName" placeholder="请选择活动区域" @change="gs_change">
            <el-option  v-for="item in companyList" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="bm_name"></el-input>
        </el-form-item>
        <el-form-item label="部门备注">
          <el-input type="textarea" v-model="bm_desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_bm = false">取 消</el-button>
        <el-button type="primary" @click="insert_BM">确 定</el-button>
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
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="xg_gsmc"></el-input>
        </el-form-item>
        <el-form-item label="单位描述" prop="name">
          <el-input v-model="xg_gsms"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_xg = false">取 消</el-button>
        <el-button type="primary" @click="insert_xg">确 定</el-button>
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
      ruleForm: {
        companyName: '',
        date1: '',
        date2: '',
        input: ''
      },
      companyList:[],
      ruleFormModule: {
        name: '',
        desc: '',
        companyName: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        companyName: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ]
      },
      tableData: [],
      bm_name:'',
      bm_desc:'',
      bm_id:'',
      bm_code:'',
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

    region_change (val) {
      console.log(val)
    },
    handleChange (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },

    /*添加部门相关的函数*/
    handleClose_tag (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    /*初始化表格*/
    search_list(){
      let param = {
        type:'1'
      }
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('PROVIDER_MANAGE', { param, header }).then((res, req) => {
        this.tableData = []
        console.log(res)
        for(let i = 0; i<res.data.result.datas.length;i++){
          this.tableData.push({
            name:res.data.result.datas[i].name,
            description:res.data.result.datas[i].description,
            create_time:res.data.result.datas[i].create_time,
            id:res.data.result.datas[i].id,
            type:res.data.result.datas[i].type=='0'?'公司':'部门'
          })
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    deleteClose(){
      this.dialogDelete = false
    },
    handleClick (row) {
      this.dialogDelete = true
      this.deleteId = row.id
    },
    /*删除某条数据的方法*/
    delete_data(){
      let param = {
        ids: this.deleteId
      }
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('PROVIDER_MANAGE_DEL', { param, header }).then((res, req) => {
        console.log(res)
        this.search_list()
        this.dialogDelete = false
        /*this.tableData = []
        for(let i = 0; i<res.data.result.datas.length;i++){
          this.tableData.push({
            name:res.data.result.datas[i].name,
            description:res.data.result.datas[i].description,
            create_time:res.data.result.datas[i].create_time,
            id:res.data.result.datas[i].id,
          })
        }*/
      }).catch((error) => {
        console.error(error)
      })
    },
    /*新增公司*/
    insert_GS(){
      let _this = this
      this.dialog_gs = false
      let param = {
        "address":"",
        "contact":"sjm",
        "create_by":"sjm",
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
        if(res.code == 200){
          _this.search_list()
        }
        _this.$notify({
          title: '提示信息',
          message: res.message,
          type: res.code === 200 ? 'success' : 'error',
          duration: '1000'
        })
        console.log(res)
      }).catch((error) => {
        console.error(error)
      })
    },
    add_GS () {
      this.dialog_gs = true
    },
    gsClose () {
      this.dialog_gs = false
    },
    /*新增部门*/
    insert_BM(){
      let _this = this
      this.dialog_bm = false
      let param = {
        "address":"",
        "contact":"sjm",
        "create_by":"sjm",
        "description":this.bm_desc,
        "level":2,
        "id":this.bm_id,
        "name":this.bm_name,
        "code":this.bm_code,
        "pcode":1,
        "pid":1,
        "paramType":1,
        "postcode":"",
        "telephone":"13012455623",
        "type":1
      }
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('PROVIDER_MANAGE_INSERT', { param, header }).then((res, req) => {
        if(res.code == 200){
          _this.search_list()
        }
        console.log(res)
        _this.$notify({
          title: '提示信息',
          message: res.message,
          type: res.code === 200 ? 'success' : 'error',
          duration: '1000'
        })
        console.log(res)
      }).catch((error) => {
        console.error(error)
      })
      console.log(this.bm_name,this.bm_desc)
    },
    add_BM () {
      this.dialog_bm = true
      /*获取下拉菜单*/
      let param = {
        type:'0'
      }
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('PROVIDER_MANAGE', { param, header }).then((res, req) => {
        this.companyList = []
        for(let i=0;i<res.data.result.datas.length;i++){
          if(res.data.result.datas[i].type ==0){
            this.companyList.push({
              name:res.data.result.datas[i].name,
              id:res.data.result.datas[i].id,
              code:res.data.result.datas[i].code
            })
          }
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    bmClose () {
      this.dialog_bm = false
    },
    gs_change(){
      let companyName = this.ruleFormModule.companyName
      let selectCompanyArr = this.companyList.filter((item,index) => {
        return item.id === companyName
      })
      this.bm_id = selectCompanyArr[0].id
      this.bm_code=selectCompanyArr[0].code
      console.log(selectCompanyArr[0].code,selectCompanyArr[0].id)
    },
    /*修改公司*/
    xg(val){
      console.log(val)
      this.xg_gsmc = val.name
      this.xg_gsms = val.description
      this.dialog_xg = true
    },
    xgClose(){
      this.dialog_xg = false
    },
    insert_xg(){
      this.dialog_xg = false
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
