/**
* Created by zhangxin on 2018/11/15.
*/
<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item label="公司名称">
          <el-select size="small" v-model="ruleForm.companyName" placeholder="请选择活动区域">
            <el-option label="江苏天晴" value="jiangsu"></el-option>
            <el-option label="南京天晴" value="nanjing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
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
        <el-form-item>
          <el-col :span="24">
            <el-form-item>
              <el-input
                size="small"
                placeholder="输入数据源名称"
                suffix-icon="el-icon-search"
                style="width: 100%"
                v-model="ruleForm.input">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button class="join-btn" size="small" @click="onSubmit">数据接入</el-button>
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
    </div>
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
      tableData: [{
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
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log(this.ruleForm.companyName, this.ruleForm.date1, this.ruleForm.date2)
    },
    handleClick (row) {
      console.log(row)
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
  .el-form-item{
    margin-bottom: 0px;
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
