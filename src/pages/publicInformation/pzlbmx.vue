<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="details">
        <el-form-item class="no-mb ml-10" label="凭证日期:">
          {{details.bldat}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="凭证编号:">
          {{details.belnr}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="平台公司名称:">
          {{details.cpccName}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="公司名称:">
          {{details.butxt}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="财年:">
          {{details.gjahr}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="会计期间:">
          {{details.monat}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="最后修改日期:">
          {{details.upddt}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="用户:">
          {{details.usnam}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="凭证类型:">
          {{details.blart}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="凭证状态:">
          {{details.bstat}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="冲销标识:">
          {{details.xreversal}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="汇率:">
          {{details.kursf}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="业务编码:">
          {{details.xblnr}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="货币:">
          {{details.waers}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="汇率类型:">
          {{details.kurst}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="反记账凭证:">
          {{details.stblg}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="参考交易:">
          {{details.awtyp}}
        </el-form-item>
        <el-form-item class="no-mb ml-10" label="冲销原因:">
          {{details.stgrd}}
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
          prop="matnr"
          label="物料">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="menge"
          label="数量">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="meins"
          label="计量单位">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="gjahr"
          label="财年">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="shkzg"
          label="借贷标识">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="koart"
          label="科目类型">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="hkont"
          label="总账科目">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="kokrs"
          label="成本中心">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="kunnr"
          label="客户">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="lifnr"
          label="供应商">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="pswbt"
          label="总账金额">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="pswsl"
          label="总账货币">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="mwskz"
          label="税码">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="xnegp"
          label="反记账">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="zlsch"
          label="付款方式">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="zfbdt"
          label="付款基准日期">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="umskz"
          label="特别总账标志">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="xumsw"
          label="销售相关">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="xopvw"
          label="未清项目管理">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="zbilk"
          label="资产负债表科目">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="gvtyp"
          label="损益表科目类型">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="fkber"
          label="费用类型">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="zzbkitem"
          label="拨款项目">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="zzxjll"
          label="现金流量项">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="zztzitem"
          label="投资项目">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="bschl"
          label="记账代码">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="augbl"
          label="清帐凭证">
        </el-table-column>
        <el-table-column
          :resizable=false
          prop="augdt"
          label="清帐日期"
          width="140">
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
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item class="no-mb ml-10" label="总账合计金额" style="color: #3385ff">
        {{lowerCase}}
      </el-form-item>
      <el-form-item class="no-mb ml-10" label="金额大写" style="color: #3385ff">
        {{upperCase}}
      </el-form-item>
    </el-form>
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
      details: {},
      tableData: [],
      lowerCase: '',
      upperCase: '',
      loading: null
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
    getListDetails () {
      let vm = this
      let belnr = vm.$route.query.belnr
      let param = {
        belnr: belnr
      }
      let header = {
        accountId: sessionStorage.getItem('accountId'),
        accessToken: sessionStorage.getItem('accessToken')
      }
      vm.$store.dispatch('GET_FINANCE_DETAILS', {param, header}).then((res, req) => {
        vm.details = res.data.listbkpf
        vm.tableData = res.data.listdseg
        vm.lowerCase = res.data.lowerCase
        vm.upperCase = res.data.upperCase
        vm.loading.close()
      }).catch(error => {
        console.error(error);
      })
    }
  },
  created () {
    this.loading = this.$loading({
      lock: true,
      text: '正在加载凭证信息',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  mounted () {
    this.getListDetails()
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
