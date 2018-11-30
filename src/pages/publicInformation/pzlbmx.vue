<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item class="no-mb ml-10" label="凭证日期:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="凭证编号:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="平台公司名称:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="公司名称:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="财年:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="会计期间:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="凭证日期:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="凭证编号:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="平台公司名称:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="公司名称:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="财年:">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="会计期间:">
          2018-01-01
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
    <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="no-mb ml-10" label="总账合计金额">
          2018-01-01
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="金额大写">
          2018-01-01
        </el-form-item>
      </el-form>
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
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
