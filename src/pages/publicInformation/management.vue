<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm">
        <el-form-item class="no-mb ml-10" label="日期">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker size="small" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.startDate" style="width: 100%;" @change="searchList"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker size="small" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;" @change="searchList"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="no-mb" label="名称">
          <el-input
            size="small"
            placeholder="输入名称"
            style="width: 100%"
            v-model="ruleForm.infoName"
            @change="searchList">
          </el-input>
        </el-form-item>
        <el-form-item class="pull-right no-mb">
          <el-button class="join-btn" size="small" @click="onSubmit">
            <i class="el-icon-plus"></i>
            新建信息
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
          prop="CREATION_TIME"
          label="日期">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="INFO_NAME"
          label="名称">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="DATA_TYPE"
          label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.DATA_TYPE == 1">文本</span>
            <span v-if="scope.row.DATA_TYPE == 2">音频</span>
            <span v-if="scope.row.DATA_TYPE == 3">视频</span>
            <span v-if="scope.row.DATA_TYPE == 4">图片</span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="CREATOR"
          label="录入人">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="DESCRIBE_INFO"
          label="备注">
        </el-table-column>
        <el-table-column
          :resizable=false
          label="公示权重"
          width="100">
          <template slot-scope="scope">
            <i v-for="item in scope.row.WEIGHTINESS" class="el-icon-star-on mr2" style="color: #f7ba2a"></i>
          </template>
        </el-table-column>
        <el-table-column
          :resizable=false
          label="操作"
          align="center"
          width="140">
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">发布</el-button>-->
            <el-button @click="deleteHandleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="fy-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>-->
    </div>
    <!--弹框-->
    <el-dialog
      title="添加公示信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleFormModule" label-width="80px" class="demo-ruleForm">
        <el-form-item label="名称" prop="info_name">
          <el-input v-model="ruleFormModule.info_name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="data_type">
          <el-select v-model="ruleFormModule.data_type" style="width: 100%" placeholder="请选择类型">
            <el-option label="文本" value="1"></el-option>
            <el-option label="音频" value="2"></el-option>
            <el-option label="视频" value="3"></el-option>
            <el-option label="图片" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="ruleFormModule.describe_info"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-rate v-model="ruleFormModule.weightiness" style="line-height: 2.6;"></el-rate>
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :data="ruleFormModule"
            action="/apis/publicInformation/uploadFiles"
            :file-list="fileList"
            accept=".jpg,.jpeg,.png,.pdf,.JPG,.JPEG,.txt,.GIF,.docx,.PDF"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">允许.jpg,.jpeg,.png,.pdf,.JPG,.JPEG,.txt,.GIF,.docx,.PDF类型的文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="publicInformationUpload">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改-->
    <el-dialog
      title="修改公示信息"
      :visible.sync="updateDialogVisible"
      width="30%">
      <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="名称" prop="info_name">
          <el-input v-model="updateForm.info_name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="updateForm.data_type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="updateForm.describe_info"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-rate v-model="updateForm.weightiness" style="line-height: 2.6;" @change="qz_change"></el-rate>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateForm('updateForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--删除-->
    <el-dialog
      title="删除公示信息"
      :visible.sync="deleteDialogVisible"
      width="30%">
      <p>是否删除该公示信息？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletePublicInformation()">确 定</el-button>
      </div>
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
      dialogVisible: false,
      updateDialogVisible: false,
      deleteDialogVisible: false,
      deleteId: '',
      updateForm: {
        id: '',
        info_name: '',
        data_type: '',
        describe_info: '',
        weightiness: ''
      },
      fileList: [
//        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ],
      msg: '123',
      ruleForm: {
        startDate: '',
        endDate: '',
        infoName: ''
      },
      ruleFormModule: {
        info_name: '',
        data_type: '',
        describe_info: '',
        weightiness: 0,
        accessToken: sessionStorage.getItem('accessToken')
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        info_name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        data_type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
      tableData: []
    }
  },
  methods: {
    onSubmit () {
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    /**
     * 打开修改的模态窗口
     */
    handleClick (row) {
      this.updateForm = {
        id: row.ID,
        info_name: row.INFO_NAME,
        data_type: row.DATA_TYPE,
        describe_info: row.DESCRIBE_INFO,
        weightiness: row.WEIGHTINESS
      },
      this.updateDialogVisible = true;
    },
    deleteHandleClick (row) {
      this.deleteId = row.ID
      this.deleteDialogVisible = true;
    },
    qz_change (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    isEmpty (str) {
      console.log(str)
      if(str === undefined || str === null || str === '') {
        return false
      }else{
        return true
      }
    },
    searchList () {
      let _this = this
      let startDate = _this.ruleForm.startDated
      let endDate = _this.ruleForm.endDate
      if(!_this.isEmpty(startDate) && !_this.isEmpty(endDate)){
          return false
      }else{
        _this.publicInformationList()
      }
    },
    /**
     * 获取列表
     */
    publicInformationList () {
      let _this = this
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      let param = Object.assign({}, _this.ruleForm)
      param.infoName = param.infoName.trim()
      _this.$store.dispatch('PUBLIC_INFORMATION_LIST', {param, header}).then(res => {
        if(res.status === 200 && res.data.length >= 0){
          _this.tableData = res.data
        }
      }).catch(error => {
          console.log(error)
      })
    },
    /**
     * 修改公示信息
     * @param formName
     */
    submitUpdateForm (formName) {
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let header = {
            accountId: sessionStorage.getItem('accountId'),
            accessToken: sessionStorage.getItem('accessToken')
          }
          let param = Object.assign({}, _this.updateForm)
          let urlData = param.id
          param.accessToken = sessionStorage.getItem('accessToken')
          _this.$store.dispatch('PUBLIC_INFORMATION_UPDATE', {param, header, urlData}).then(res => {
            if(res.status === 200 && res.data){
              _this.updateDialogVisible = false
              _this.publicInformationList()
            }
            _this.$notify({
              title: '提示信息',
              message: res.data ? '修改公示信息成功' : '修改公示信息失败',
              type: res.data ? 'success' : 'error',
              duration: '1000'
            })
          }).catch(error => {
            console.log(error)
          })
        } else {
            return false
        }
      })
    },
    /**
     * 删除公示信息
     */
    deletePublicInformation () {
      let _this = this
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      let urlData = _this.deleteId
      let param = {}
      param.accessToken = sessionStorage.getItem('accessToken')
      _this.$store.dispatch('PUBLIC_INFORMATION_DELETE', {param, header, urlData}).then(res => {
        if(res.status === 200 && res.data){
          _this.publicInformationList()
        }
        _this.deleteDialogVisible = false
        _this.$notify({
          title: '提示信息',
          message: res.data ? '删除公示信息成功' : '删除公示信息失败',
          type: res.data ? 'success' : 'error',
          duration: '1000'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 添加公示信息
     */
    publicInformationUpload () {
      this.$refs.upload.submit()
    },
    uploadSuccess () {
      this.dialogVisible = false
      this.$notify({
        title: '提示信息',
        message: '添加公示信息成功',
        type: 'success',
        duration: '1000'
      })
      this.publicInformationList()
    },
    uploadError () {
      this.dialogVisible = false
      this.$notify({
        title: '提示信息',
        message: '添加公示信息失败',
        type: 'error',
        duration: '1000'
      })
    }
  },
  created () {

  },
  mounted () {
    this.publicInformationList()
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
  .mr2{
    margin-right: 2px;
    &:last-child {
      margin-right: 0;
    }
  }
  .center-form{
    text-align: center;
  }
</style>
