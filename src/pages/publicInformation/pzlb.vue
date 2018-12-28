<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline" v-if="$store.getters.getPermissions.indexOf('queryFinancialCertificate')>-1">
          <el-form-item class="no-mb ml-10" label="日期">
            <el-date-picker
              size="small"
              v-model="time"
              type="daterange"
              value-format="yyyy-MM-dd"
              @change="timeChange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="no-mb" label="凭证编号">
            <el-input
              size="small"
              placeholder="输入编号"
              style="width: 150px"
              v-model="ruleForm.belnr">
            </el-input>
          </el-form-item>
          <el-form-item class="no-mb" label="凭证类型">
            <el-input
              size="small"
              placeholder="输入类型"
              style="width: 150px"
              v-model="ruleForm.blart">
            </el-input>
          </el-form-item>
          <el-form-item class="no-mb" label="成员企业">
            <el-select size="small" v-model="ruleForm.cpcc" style="width: 150px" placeholder="请选择成员企业" @change="companyChange">
              <el-option v-for="item in ptCompany" :key="item.code" :label="item.companyName" :value="item.cPCC"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="no-mb" label="业务公司">
            <el-input
              size="small"
              placeholder="输入公司名称"
              style="width: 150px"
              v-model.trim="ruleForm.childCpcc">
            </el-input>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchList" class="green-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt-20">
      <el-table
        v-loading="loading"
        :data="tableData"
        :header-cell-style="{background:'#f0f1f1'}"
        style="width: 100%">
        <el-table-column
          :resizable=false
          prop="bldat"
          width="100"
          align="center"
          label="凭证日期">
        </el-table-column>
        <el-table-column
          :resizable=false
          align="center"
          width="100"
          label="凭证编号">
          <template slot-scope="scope">
            <el-button type="text" @click="getListDetails(scope.row.belnr)">{{scope.row.belnr}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="blart"
          align="center"
          label="凭证类型">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="cpccName"
          align="center"
          width="150"
          label="子公司">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="butxt"
          align="center"
          label="公司">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="budat"
          align="center"
          label="过账日期"
          width="100">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="usnam"
          align="center"
          label="用户名">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="hwaer"
          align="center"
          label="本位币">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="waers"
          align="center"
          label="货币">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="kursf"
          align="center"
          label="汇率">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="kurst"
          align="center"
          label="汇率类型">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="bstat"
          align="center"
          label="凭证状态">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="awtyp"
          align="center"
          label="参考交易">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="xreversal"
          align="center"
          label="冲销标识">
        </el-table-column>
      </el-table>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="no-mb ml-10" label="总账合计金额" style="color: #3385ff;width: 20%">
          {{lowerCase}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="金额大写" style="color: #3385ff;width: 40%">
          {{upperCase}}
        </el-form-item>
      </el-form>
      <div class="fy-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size=ruleForm.pageSize
          :current-page.sync="ruleForm.pageNum"
          layout="total, prev, pager, next"
          :total=totalcount>
        </el-pagination>
      </div>
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
      loading:true,
      ptCompany: [],
      time:'',
      ruleForm: {
        sTime: '',
        eTime: '',
        cpcc: '',
        childCpcc: '',
        belnr: '',
        blart:'',
        pageNum:1,
        pageSize:10
      },
      totalcount:0,
      ruleFormModule: {
        name: '',
        region: '',
        desc: '',
        qz: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
      lowerCase: '',
      upperCase: '',
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.ruleForm.pageNum = val
      this.getTableList ()
    },
    handleCurrentChange (val) {
      this.ruleForm.pageNum = val
      this.getTableList ()
    },
    timeChange(val){
      if(val==null){
        this.ruleForm.sTime = ''
        this.ruleForm.eTime = ''
      }else{
        this.ruleForm.sTime = val[0]
        this.ruleForm.eTime = val[1]
      }
    },
    searchList(){
      this.ruleForm.pageNum = 1
      this.getTableList()
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
        if(res.data.code === 16000003){
          _this.ptCompany = res.data.data
          _this.ptCompany.unshift({
            cPCC: "",
            code: "",
            companyName: "全部"
          })
        }
      }).catch(error => {
        console.error(error)
      })
    },
    companyChange(val){

    },
    getTableList () {
      let vm = this
      vm.loading= true
      let param = Object.assign({},vm.ruleForm)
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      vm.$store.dispatch('GET_FINANCE_TABLE', {param, header}).then((res, req) => {
        if(res.code === 16000003){
          let money = vm.toMoney(res.data.lowerCase)
          vm.totalcount = res.data.totalNum
          vm.lowerCase = money
          vm.upperCase = res.data.upperCase
          vm.tableData = res.data.maps || []
        }else{
        }
        setTimeout(function () {
          vm.loading = false
        },1000)
      }).catch(error => {
          console.error(error);
      })
    },
    /*转换金额模式*/
    toMoney(num){
      num = num.toFixed(2);
      num = parseFloat(num)
      num = num.toLocaleString();
      return num;//返回的是字符串23,245.12保留2位小数
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
	.el-form-item{
		margin-bottom: 0;
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
  .center-form{
    text-align: center;
  }
</style>
