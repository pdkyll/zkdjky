<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item class="no-mb ml-10" label="日期">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                size="small"
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date2"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="no-mb" label="名称">
          <el-input
            size="small"
            placeholder="输入名称"
            style="width: 100%"
            v-model="ruleForm.input">
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
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="province"
          label="省份">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="city"
          label="市区">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="zip"
          label="邮编"
          width="100">
        </el-table-column>
        <el-table-column
          :resizable=false
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
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
    <!--弹框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleFormModule.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="region">
          <el-select v-model="ruleFormModule.region" style="width: 100%" placeholder="请选择类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleFormModule.desc"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-rate v-model="ruleFormModule.qz" style="line-height: 2.6;" @change="qz_change"></el-rate>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-upload
             class="upload-demo"
             action="https://jsonplaceholder.typicode.com/posts/"
             :on-preview="handlePreview"
             :on-remove="handleRemove"
             :before-remove="beforeRemove"
             accept=".jpg,.jpeg,.png,.pdf,.JPG,.JPEG,.txt,.GIF,.docx,.PDF"
             multiple
             :limit="3"
             :on-change = "updata"
             :on-exceed="handleExceed"
             :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
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
      dialogVisible: false,
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ],
      msg: '123',
      ruleForm: {
        companyName: '',
        date1: '',
        date2: '',
        input: ''
      },
      ruleFormModule: {
        name: '',
        region: '',
        desc: '',
        qz: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      this.dialogVisible = true
      console.log(this.ruleForm.companyName, this.ruleForm.date1, this.ruleForm.date2)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleClick (row) {
      console.log(row)
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      console.log(files, fileList)
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    updata (file, fileList) {
      console.log(file)
    }
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
  .center-form{
    text-align: center;
  }
</style>
