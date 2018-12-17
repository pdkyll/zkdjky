<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline clearFix">
        <el-form-item class="no-mb">
          <el-input
            size="small"
            placeholder="输入角色名称"
            style="width: 100%"
            @change="searchName"
            v-model="ruleForm.input">
            <i
              class="el-icon-search"
              slot="suffix"
              @click="search">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item class="pull-right no-mb">
          <el-button class="join-btn" size="small" @click="onSubmit">
            <i class="el-icon-plus"></i>
            新建角色
          </el-button>
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
          width="100">
          <template slot-scope="scope">
            <el-button @click="updateClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
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
        <el-form-item label="权限选择">
          <el-tree
            :data="treeData"
            accordion
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertRole('ruleForm')">确 定</el-button>
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
        <el-form-item label="权限选择">
          <el-tree
            :data="treeDataForUpdate"
            accordion
            show-checkbox
            node-key="id"
            :default-checked-keys= echoList
            ref="treeForUpdate"
            highlight-current
            :props="defaultPropsForUpdate">
          </el-tree>
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
      loading:true,
      dialogVisible: false,
      ruleForm: {
        companyName: '',
        date1: '',
        date2: '',
        input: '',
        filter:''
      },
      ruleFormModule: {
        name: '',
        desc:'',
        chack: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入角色备注', trigger: 'blur' }
        ]
      },
      pageNum:1,
      pageSize: 5,
      totalCount: 25,
      tableData: [],
      treeData: [],
      checkIdList:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      /*修改的树状菜单数据*/
      echoList:[],
      treeDataForUpdate: [],
      checkIdListForUpdate:[],
      defaultPropsForUpdate: {
        children: 'children',
        label: 'label'
      },
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
    },
    handleClose () {
      this.dialogVisible = false
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
      let _this = this
      let param = {
        type: '1',
        pageNumber:this.pageNum,
        pageSize:this.pageSize
      }
      this.loading = true
      let header = {
        accessToken:  sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('ROLES', { param, header }).then((res, req) => {
        this.tableData = []
        if(res !== null && res.data.code == 16000003){
          this.totalCount = res.data.data.totalNum
          let data = res.data.data.datas
          for(let i =0 ;i<data.length;i++){
            this.tableData.push({
              name:data[i].rolename,
              description:data[i].description,
              date:data[i].createtime,
              id:data[i].id,
            })
          }
          _this.$nextTick(() => {
            _this.loading = false
          })
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
      let urlData = [1 , 2]
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
        accessToken: sessionStorage.getItem('accessToken'),
        projectId: sessionStorage.getItem('projectId')
      }
      let id = []
      id.push(_this.del_id)
      let param = {
        ids:id
      }
      this.$store.dispatch('DEL_USER_FOR_ROLES', { param, header }).then(res => {
        if(res !== null && res.code == 16000003){
          _this.roles()
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
    /*新增角色*/
    insertUserForRoles (){
      let _this = this
      let param = {
        roles:[
          {
            "rolename": _this.ruleFormModule.name,
            "description": _this.ruleFormModule.desc,
            "type": 1
          }
        ],
        permissionList:_this.checkIdList
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('INSERT_USER_FOR_ROLES', { param, header}).then(res => {
        if(res !== null && res.code == 16000003){
          _this.roles()
          _this.dialogVisible = false
          _this.ruleFormModule.name = ''
          _this.ruleFormModule.desc = ''
          _this.checkIdList = []
          _this.$refs.tree.setCheckedKeys([])
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
    insertRole(formName){
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          this.checkIdList = []
          let idList = this.$refs.tree.getCheckedKeys()
          for(let i=0;i<idList.length;i++){
            this.checkIdList.push({
              checked:"1",
              menuid:idList[i]
            })
          }
          _this.insertUserForRoles()
        } else {
          return false;
        }
      });

    },
    /*修改角色*/
    xgClose(){
      this.dialog_xg = false
    },
    js_xg(){
      let idList = this.$refs.treeForUpdate.getCheckedKeys()
      this.checkIdListForUpdate = []
      for(let i=0;i<idList.length;i++){
        this.checkIdListForUpdate.push({
          checked:"1",
          menuid:idList[i]
        })
      }
      let _this = this
      let param = {
        roles:[
          {
            "rolename": _this.xg_jsmc,
            "description": _this.xg_jsms,
            "id": _this.xg_id
          }
        ],
        permissionList:_this.checkIdListForUpdate
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('UPDATE_USER_FOR_ROLES', { param, header}).then(res => {
        if(res !== null && res.code == 16000003){
          _this.roles()
          this.dialog_xg = false
          /*this.xg_jsmc = ''
          this.xg_jsms = ''
          _this.$refs.treeForUpdate.setCheckedKeys([])*/
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
    updateClick (row) {
      let _this = this
      this.xg_jsmc = row.name
      this.xg_jsms = row.description
      this.xg_id = row.id
      this.dialog_xg = true
      this.echoList = []
      let param = {
        id: this.xg_id,
        type:'2'
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken'),
        projectId: sessionStorage.getItem('projectId')
      }
      this.$store.dispatch('UPDATE_USER_ECHO', { param, header}).then(res => {
        if(res !== null && res.data.code == 16000003){
          for(let i=0;i<res.data.data.length;i++){
            _this.echoList.push(res.data.data[i]*1)
          }
        }
        _this.$refs.treeForUpdate.setCheckedKeys(_this.echoList)
      }).catch(error=>{
        console.error(error);
      })
    },
    /*获取权限选择的列表*/
    makeCompanySelect(){
      let param = {
        type: 1,
        pageSize:200
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('MAKE_COMPANY_SELECT', { param, header}).then(res => {
        let data = res.data.data.datas
        this.treeData = []
        this.arrayToJson(data)
      }).catch(error=>{
        console.error(error);
      })
    },
    arrayToJson(treeArray) {
      let _this = this
      for(let i =0;i<treeArray.length;i++){
        if(!treeArray[i].pcode){
          treeArray[i].label = treeArray[i].name
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
          _this.treeData.push(treeArray[i]);
          _this.treeDataForUpdate.push(treeArray[i]);
        }
      }
    },
    /*查询*/
    searchName(val){
      this.filter = 'rolename=_'+ val +'_'
    },
    search(val){
      if(this.filter == undefined){
        this.filter = 'rolename=__'
      }
      let _this = this
      let param = {
        type: '1',
        pageNumber:this.pageNum,
        pageSize:this.pageSize,
        extend:true,
        filter:this.filter
      }
      let header = {
        accessToken: '2b5ed38e041c4d8a9bcbd284892ea78b'
      }
      this.$store.dispatch('ROLES', { param, header }).then((res, req) => {
        this.tableData = []
        if(res !== null && res.data.code == 16000003){
          this.totalCount = res.data.data.totalNum
          let data = res.data.data.datas
          for(let i =0 ;i<data.length;i++){
            this.tableData.push({
              name:data[i].rolename,
              description:data[i].description,
              date:data[i].createtime,
              id:data[i].id,
            })
          }
          _this.$nextTick(() => {
            _this.loading = false
          })
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
    //this.getUserForRoles()
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
