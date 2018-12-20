<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm">
        <el-form-item label="公司名称" class="ml-10 no-mb" v-if="$store.getters.getPermissions.indexOf('queryDivisionalManagement')>-1">
          <el-select size="small" v-model="ruleForm.companyName" placeholder="请选择公司名称" @change="search_param_list">
            <el-option label="全部" value="all"></el-option>
            <el-option v-for="item in optionData" :key="'opt' + item.code" :label="item.companyName" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right" v-if="$store.getters.getPermissions.indexOf('addDivisionalManagement')>-1">
          <el-button class="join-btn" size="small" @click="add_BM">
            <i class="el-icon-plus"></i>
            新建部门
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt-20">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%">
        <el-table-column
          :resizable=false
          prop="name"
          label="公司名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="departmentName"
          label="部门名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="description"
          label="备注">
        </el-table-column>
        <el-table-column
          :resizable=false
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="xg(scope.row)" v-if="$store.getters.getPermissions.indexOf('editDivisionalManagement')>-1">修改</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="$store.getters.getPermissions.indexOf('delDivisionalManagement')>-1">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fy-box">
        <el-pagination
          background
          v-show="pageShow"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size=pageSize
          layout="total, prev, pager, next"
          :total=totalCount>
        </el-pagination>
      </div>
    </div>
    <!--弹框新建部门-->
    <el-dialog
      title="新建部门"
      :visible.sync="dialog_bm"
      width="30%"
      :before-close="bmClose">
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleFormModule" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司名称" prop="companyName">
          <el-select size="small" style="width: 100%" v-model="ruleFormModule.companyName" placeholder="请选择公司" @change="gs_change">
            <el-option v-for="items in optionData" :key="'opt' + items.id" :label="items.companyName" :value="items.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-select
            size="small"
            style="width: 100%"
            v-model="ruleFormModule.departmentName"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入回车添加一个部门，可输入多个">
            <el-option
              v-for="item in departmentList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据代码">
          <el-select
            size="small"
            style="width: 100%"
            v-model="ruleFormModule.cpcc"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入回车添加一个部门，可输入多个">
            <el-option
              v-for="item in cpccList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门备注">
          <el-input type="textarea" v-model.trim="ruleFormModule.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelInsert('ruleFormModule')">取 消</el-button>
        <el-button type="primary" @click="insert_BM('ruleFormModule')">确 定</el-button>
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
      <el-form :model="updateForm" :rules="rules"  ref="updateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司名称">
          <el-input type="text" :disabled="true" v-model.trim="updateCompanyName"></el-input>
          <input type="hidden" v-model="updateForm.id">
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model.trim="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="部门备注">
          <el-input type="textarea" v-model.trim="updateForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_xg = false">取 消</el-button>
        <el-button type="primary" @click="insert_xg()">确 定</el-button>
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
        optionData: [],
        pageShow:true,
        ruleForm: {
          companyName: 'all'
        },
        departmentList: [],
        companyList:[],
        cpccList:[],
        ruleFormModule: {
          desc: '',
          cpcc:[],
          departmentName: [],
          companyName: ''
        },
        updateCompanyName: '',
        updateForm: {
          id: '',
          name: '',
          cpcc:'',
          description: ''
        },
        rules: {
          companyName: [
            { required: true, message: '请选择公司', trigger: 'change' }
          ],
          departName: [
            { required: true, message: '请选择部门', trigger: 'blur' }
          ],
          cpcc: [
            { required: true, message: '请输入数据代码', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '部门名字不能为空', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        },
        pageNum:1,
        pageSize:10,
        totalCount:0,
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

      /*添加部门相关的函数*/
      handleClose_tag (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },
      /*初始化部门表格*/
      search_list(){
        let _this = this
        _this.loading = true
        let param = {
          pagenum: _this.pageNum,
          pagesize:_this.pageSize
        }
        let header = {
          accountId: sessionStorage.getItem('accountId'),
          accessToken: sessionStorage.getItem('accessToken'),
          projectId :sessionStorage.getItem('projectId'),
        }
        _this.$store.dispatch('PROVIDER_MANAGE_CMP_AND_DEP', { param, header }).then((res, req) => {
          if(res.data.code === 16000003){
            _this.tableData = []
            _this.totalCount = res.data.data.totalNum
            let resultData = res.data.data.viewResult || []
            for(let i = 0; i<resultData.length;i++){
              _this.tableData.push({
                name: resultData[i].companyName,
                description: resultData[i].description,
                createTime: resultData[i].createTime,
                id: resultData[i].id,
                departmentName: resultData[i].departmentName
              })
            }
          }else{
            console.error('接口错误')
          }
          _this.$nextTick(() => {
            _this.loading = false
          })
        }).catch((error) => {
          console.error(error)
        })
      },
      handleSizeChange (val) {
        this.pageNum = val
        this.search_list()
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.search_list()
      },
      /**
       * 传公司code进行查询部门
       */
      search_param_list () {
        let _this = this
        if(_this.ruleForm.companyName === 'all'){
          _this.pageShow = true
          _this.search_list()
          return
        }else{
          _this.pageShow = false
        }
        let param = {
          code: _this.ruleForm.companyName,
        }
        let header = {
          accountId: sessionStorage.getItem('accountId'),
          accessToken: sessionStorage.getItem('accessToken'),
          projectId :sessionStorage.getItem('projectId'),
        }
        _this.$store.dispatch('PROVIDER_MANAGE_BY_CODE', { param, header }).then((res, req) => {
          console.log(res)
          _this.tableData = []
          if(res.data.code !== 16000003){
            return
          }
          let resultData = res.data.data || []

          let optionSelected = _this.optionData.filter(function (item,index) {
            return item.code === _this.ruleForm.companyName
          })
          for(let i = 0; i<resultData.length;i++){
            _this.tableData.push({
              name: optionSelected[0].companyName,
              description: resultData[i].description,
              createTime: resultData[i].create_time,
              id: resultData[i].id,
              departmentName: resultData[i].name
            })
          }
          _this.$notify({
            title: '提示信息',
            message: res.data.code === 16000003 ? '部门列表加载成功' : '部门列表加载失败',
            type: res.data.code === 16000003 ? 'success' : 'error',
            duration: '2000'
          })
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
        let _this = this
        let param = {
          ids: _this.deleteId
        }
        let header = {
          accountId: sessionStorage.getItem('accountId'),
          accessToken: sessionStorage.getItem('accessToken'),
          projectId :sessionStorage.getItem('projectId'),
        }
        _this.$store.dispatch('PROVIDER_MANAGE_DEL', { param, header }).then((res, req) => {
          _this.$notify({
            title: '提示信息',
            message: res.code !== 16000003 ? res.message : '部门删除成功',
            type: res.code === 16000003 ? 'success' : 'error',
            duration: '2000'
          })
          _this.search_list()
          _this.dialogDelete = false
        }).catch((error) => {
          console.error(error)
        })
      },
      /*获取公司下拉菜单*/
      getCompanyList () {
        let _this = this
        let param = {
          type:'0,2',
          pagenum: "1",
          pagesize:"10000"
        }
        let header = {
          accountId: sessionStorage.getItem('accountId'),
          accessToken: sessionStorage.getItem('accessToken'),
          projectId :sessionStorage.getItem('projectId'),
        }
        _this.$store.dispatch('PROVIDER_MANAGE_FIND_NAME_ID', {param, header}).then(res => {
          if(res.data.code === 16000003){
            _this.optionData = res.data.data
          }
        }).catch(error => {
            console.error(error)
        })
      },
      gs_change(){
//        let companyName = this.ruleFormModule.companyName
//        let selectCompanyArr = this.companyList.filter((item,index) => {
//          return item.id === companyName
//        })
//        this.bm_id = selectCompanyArr[0].id
//        this.bm_code=selectCompanyArr[0].code
//        console.log(selectCompanyArr[0].code,selectCompanyArr[0].id)
      },
      /*新增部门*/
      insert_BM(formName){
        let _this = this
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.dialog_bm = false
            let optionSelected = _this.optionData.filter(function (item,index) {
              return item.id === _this.ruleFormModule.companyName
            })
            let param = {
              "type": 1,
              "address":"",
              "contact":"test",
              "create_by":"sjm",
              "description": _this.ruleFormModule.desc,
              "cPCC":_this.ruleFormModule.cpcc,
              "level":2,
              "id": _this.ruleFormModule.companyName,  //父及Id
              //"name":"tttt",   //name不可重复
              "depNames": _this.ruleFormModule.departmentName,   //数组
              "code": optionSelected[0].code,   //父及code
              "pcode":"1",  //固定参数
              "pid":1, //固定参数
              "paramType":1,
              "postcode":"",
              "telephone":"13011455214"
            }
            let header = {
              accountId: sessionStorage.getItem('accountId'),
              accessToken: sessionStorage.getItem('accessToken'),
              projectId :sessionStorage.getItem('projectId'),
            }
            this.$store.dispatch('INSERT_DEPARTMENT', { param, header }).then((res, req) => {
              if(res.code === 16000003){
                _this.search_list()
                _this.ruleFormModule.desc= ''
                _this.ruleFormModule.departmentName= []
                _this.ruleFormModule.companyName= ''
                _this.$refs[formName].resetFields()
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
            return false;
          }
        });
      },
      add_BM () {
        this.dialog_bm = true
        /*获取下拉菜单*/
      },
      bmClose () {
        this.dialog_bm = false
        this.$refs['ruleFormModule'].resetFields()
      },
      cancelInsert(formName){
        this.dialog_bm = false
        this.$refs[formName].resetFields()
      },
      /*修改公司*/
      xg(val){
        this.updateCompanyName = val.name
        this.updateForm.id = val.id
        this.updateForm.name = val.departmentName
        this.updateForm.description = val.description
        this.dialog_xg = true
      },
      xgClose(){
        this.dialog_xg = false
      },
      insert_xg(){
        let _this = this
        let param = {
          name: "",
          telephone: "13012455623",
          contact: "张三",
          description: "",
          update_by: "岸本齐史",
          address: "菁蓉镇"
        }
        param = Object.assign({}, param, _this.updateForm)
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
      }
    },
    created(){
      this.getCompanyList()
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
