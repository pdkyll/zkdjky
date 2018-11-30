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
            新建角色
          </el-button>
        </el-form-item>
        <el-form-item class="pull-right no-mb">
          <el-input
            size="small"
            placeholder="输入角色名称"
            suffix-icon="el-icon-search"
            style="width: 100%"
            @change="searchName"
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
          label="角色名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="description"
          label="角色备注">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="date"
          label="创建日期">
        </el-table-column>
        <el-table-column
          :resizable=false
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="updateClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
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
    <!--新增弹框-->
    <el-dialog
      title="新建角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleFormModule.name"></el-input>
        </el-form-item>
        <el-form-item label="角色备注" prop="desc">
          <el-input type="textarea" v-model="ruleFormModule.desc"></el-input>
        </el-form-item>
        <el-form-item label="公司选择">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="item in moduleData" :key="item.id" :title="item.tit" :name="item.id">
              <el-tree
                :data="item.children"
                show-checkbox
                :props="item.defaultProps">
              </el-tree>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertRole">确 定</el-button>
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
        <el-button type="primary" @click="delUserForRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改列表项-->
    <el-dialog
      title="修改"
      :visible.sync="dialog_xg"
      width="30%"
      :before-close="xgClose">
      <el-form ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称">
          <el-input v-model="xg_jsmc"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea" v-model="xg_jsms"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_xg = false">取 消</el-button>
        <el-button type="primary" @click="js_xg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default{
  data () {
    return {
      activeNames: [],
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
        desc:'',
        chack: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      pageNum:1,
      pageSize: 5,
      totalCount: 25,
      tableData: [],
      /*删除角色相关参数*/
      dialogDelete: false,
      del_id:'',
      moduleData:[],
      /*修改角色相关参数*/
      dialog_xg:false,
      xg_jsmc:'',
      xg_jsms:'',
      xg_id:''

    }
  },
  methods: {
    onSubmit () {
      this.dialogVisible = true
      console.log(this.ruleForm.companyName, this.ruleForm.date1, this.ruleForm.date2)
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleChange (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      this.pageNum = val
      this.roles()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.roles()
    },
    roles () {
      let param = {
        type: '1',
        pageNumber:this.pageNum,
        pageSize:this.pageSize
      }
      let header = {
        accessToken:  sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('ROLES', { param, header }).then((res, req) => {
        this.tableData = []
        if(res !== null && res.data.code == 0 ){
          this.totalCount = res.data.result.totalCounts
          for(let i =0 ;i<res.data.result.datas.length;i++){
            this.tableData.push({
              name:res.data.result.datas[i].rolename,
              description:res.data.result.datas[i].description,
              date:res.data.result.datas[i].createtime,
              id:res.data.result.datas[i].id,
            })
          }
        }

      }).catch((error) => {
        console.error(error)
      })
    },
    getUserForRoles () {
      let param = {a: 1, b: 2}
      let header = {
        accessToken:  sessionStorage.getItem('accessToken')
      }
      let urlData = [1,2]
      this.$store.dispatch('GET_USER_FOR_ROLES', {param, header, urlData}).then(res => {
      }).catch(error=>{
        console.error(error);
      })
    },
    /*删除角色*/
    deleteClick(val){
      this.del_id = val.id
      this.dialogDelete = true
    },
    deleteClose(){
      this.dialogDelete = false
    },
    delUserForRoles (){
      let _this = this
      this.dialogDelete = false

      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      let urlData =  this.del_id
      this.$store.dispatch('DEL_USER_FOR_ROLES', { header, urlData}).then(res => {
        if(res !== null && res.code == 0){
          _this.roles()
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
    /*新增角色*/
    insertUserForRoles (){
      let _this = this
      let param = {
        "rolename": this.ruleFormModule.name,
        "description": this.ruleFormModule.desc,
        "type": 1
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      let urlData =  this.del_id
      this.$store.dispatch('INSERT_USER_FOR_ROLES', { param, header}).then(res => {
        if(res !== null && res.code == 0){
          _this.roles()
          this.dialogVisible = false
          this.ruleFormModule.name = ''
          this.ruleFormModule.desc = ''
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
    insertRole(){
      this.insertUserForRoles()
    },
    /*修改角色*/
    xgClose(){
      this.dialog_xg = false
    },
    js_xg(){
      let _this = this
      let param = {
        id: this.xg_id,
        rolename: this.xg_jsmc,
        description: this.xg_jsms
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('UPDATE_USER_FOR_ROLES', { param, header}).then(res => {
        if(res !== null && res.code == 0){
          _this.roles()
          this.dialog_xg = false
          this.xg_jsmc = ''
          this.xg_jsms = ''
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
      this.dialog_xg = true
      this.xg_jsmc = row.name
      this.xg_jsms = row.description
      this.xg_id = row.id
    },
    /*获取公司选择的列表*/
    makeCompanySelect(){
      let param = {
        type: 1,
        pageSize:200
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('MAKE_COMPANY_SELECT', { param, header}).then(res => {
        console.log(res)
        let data = res.data.result.datas
        this.moduleData = []
        this.arrayToJson(data)
        /*for(let i=0;i<data.length;i++){
          if(!data[i].pcode){
            this.moduleData.push({
                tit:data[i].name,
                id:data[i].id,
                data:[]
            })
          }
          for(let j=0;j<this.moduleData.length; j++){
            if(data[i].pcode == this.moduleData[j].id){
              this.moduleData[j].data.push({
                id:data[i].id,
                label:data[i].name,
                children:[]
              })
            }
          }
        }*/
      }).catch(error=>{
        console.error(error);
      })
    },
    arrayToJson(treeArray) {
      let _this = this
      for(let i =0;i<treeArray.length;i++){
        if(!treeArray[i].pcode){
          treeArray[i].tit = treeArray[i].name
        }else{
          treeArray[i].label = treeArray[i].name
        }
      }
      var tmpMap = {};
      for (var i = 0, l = treeArray.length; i < l; i++) {
        // 以每条数据的id作为obj的key值，数据作为value值存入到一个临时对象里面
        tmpMap[treeArray[i]["id"]] = treeArray[i];
      }
      for (i = 0, l = treeArray.length; i < l; i++) {
        var key = tmpMap[treeArray[i]["pcode"]];

        //循环每一条数据的pid，假如这个临时对象有这个key值，就代表这个key对应的数据有children，需要Push进去
        if (key) {
          if (!key["children"]) {
            key["children"] = [];
            key["children"].push(treeArray[i]);
          } else {
            key["children"].push(treeArray[i]);
          }
        } else {
          //如果没有这个Key值，那就代表没有父级,直接放在最外层
          _this.moduleData.push(treeArray[i]);
        }
      }
    },
    /*查询*/
    searchName(val){
      console.log(val)

      let param = {
        type: '1',
        pageNumber:this.pageNum,
        pageSize:this.pageSize,
        extend:true,
        filter:'rolename=_'+ val +'_'
      }
      let header = {
        accessToken: '2b5ed38e041c4d8a9bcbd284892ea78b'
      }
      this.$store.dispatch('ROLES', { param, header }).then((res, req) => {
        this.tableData = []
        if(res !== null && res.data.code == 0 ){
          this.totalCount = res.data.result.totalCounts
          for(let i =0 ;i<res.data.result.datas.length;i++){
            this.tableData.push({
              name:res.data.result.datas[i].rolename,
              description:res.data.result.datas[i].description,
              date:res.data.result.datas[i].createtime,
              id:res.data.result.datas[i].id,
            })
          }
        }

      }).catch((error) => {
        console.error(error)
      })
    }
  },
  created () {
    this.roles()
    this.makeCompanySelect()
  },
  mounted () {
    this.getUserForRoles();
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
