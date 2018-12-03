<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
          <el-form-item class="no-mb ml-10" label="日期">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                size="small"
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.sTime"
                style="width: 150px;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">至</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                size="small"
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.eTime"
                style="width: 150px;"></el-date-picker>
            </el-form-item>
          </el-col>
          </el-form-item>
          <el-form-item class="no-mb" label="凭证编号">
            <el-input
              size="small"
              placeholder="输入编号"
              style="width: 150px"
              v-model="ruleForm.belnr">
            </el-input>
          </el-form-item>
          <el-form-item class="no-mb" label="平台公司">
            <el-select size="small" v-model="ruleForm.cpcc" style="width: 150px" placeholder="请选择平台公司" @change="getTableList">
              <el-option v-for="item in ptCompany" :key="item.code" :label="item.companyName" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="no-mb" label="业务公司">
            <el-input
              size="small"
              placeholder="输入公司名称"
              style="width: 150px"
              v-model="ruleForm.childCpcc">
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
          prop="bldat"
          label="凭证日期">
        </el-table-column>
        <el-table-column
          :resizable=false
          label="凭证编号">
          <template slot-scope="scope">
            <el-button type="text" @click="getListDetails(scope.row.belnr)">{{scope.row.belnr}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="blart"
          label="凭证类型">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="cpccName"
          label="子公司">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="butxt"
          label="公司">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="budat"
          label="过账日期"
          width="100">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="usnam"
          label="用户名">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="hwaer"
          label="本位币">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="waers"
          label="货币">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="kursf"
          label="汇率">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="kurst"
          label="汇率类型">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="bstat"
          label="凭证状态">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="awtyp"
          label="参考交易">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="xreversal"
          label="冲销标识">
        </el-table-column>
      </el-table>
      <!--<div class="fy-box">-->
        <!--<el-pagination-->
          <!--background-->
          <!--@size-change="handleSizeChange"-->
          <!--@current-change="handleCurrentChange"-->
          <!--:page-size="100"-->
          <!--layout="total, prev, pager, next"-->
          <!--:total="1000">-->
        <!--</el-pagination>-->
      <!--</div>-->
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
      ptCompany: [],
      ruleForm: {
        sTime: '',
        eTime: '',
        cpcc: '',
        childCpcc: '',
        belnr: ''
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
      tableData: []
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
    },
    /**
     * 获取平台公司信息
     */
    getPtCompany () {
      let _this = this
      let param = {
        type: '0',
        pagenum: "1",
        pagesize:"10000"
      }
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      _this.$store.dispatch('PROVIDER_MANAGE_FIND_NAME_ID', {param, header}).then(res => {
        if(res.data.code === 200){
          _this.ptCompany = res.data.data
        }
      }).catch(error => {
        console.error(error)
      })
    },
    getTableList () {
      let vm = this
      let param = Object.assign({},vm.ruleForm)
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      vm.$store.dispatch('GET_FINANCE_TABLE', {param, header}).then((res, req) => {
          vm.tableData = res || []
      }).catch(error => {
          console.error(error);
      })
    },
    getListDetails (belnr) {
      let vm = this
      let param = {
          belnr: belnr
      }
//      let header = {
//        accountId: sessionStorage.getItem('accountId'),
//        accessToken: sessionStorage.getItem('accessToken')
//      }
      vm.$router.push({path: '/pzlbmx', query: param})
//      vm.$store.dispatch('GET_FINANCE_DETAILS', {param, header}).then((res, req) => {
//        console.log(res);
//  //        vm.ptCompany = res.data
//      }).catch(error => {
//        console.error(error);
//      })
    }
  },
  mounted () {
      this.getPtCompany()
      this.getTableList()
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
