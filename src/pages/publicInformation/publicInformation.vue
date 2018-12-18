/**
 * Created by zhangxin on 2018/11/15.
 */
<template>
 <div>
   <el-row class="table-header" :gutter="20">
     <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
       <el-form-item label="公司名称" class="ml-10">
         <el-select v-model="ruleForm.companyName" size="small" @change="companyChange"  placeholder="请选择活动区域">
           <el-option :label="item.name" :value="item.value" v-for="item in companyList"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="日期">
         <el-col :span="24">
          <div class="block">
           <el-date-picker
             v-model="ruleForm.time"
             type="daterange"
             value-format="yyyy-MM-dd"
             @change="timeChange"
             range-separator="-"
             size="small"
             start-placeholder="开始日期"
             end-placeholder="结束日期">
           </el-date-picker>
         </div>
         </el-col>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" size="mini" @click="onSubmit" class="green-btn">查询</el-button>
       </el-form-item>
     </el-form>
   </el-row>
   <el-row class="table-list" :gutter="20">
     <el-col :span="24">
       <panel :time="ruleForm" ref="myChild"></panel>
     </el-col>
   </el-row>
 </div>
</template>
<script>
/**
 * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
 * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
 * import loginButton from './components/loginButton.vue';
 */
import Panel from '@/components/panel/Panel'
export default{
  data () {
    return {
      msg: '123',
      ruleForm: {
        companyName: '全部',
        time: '',
        start:'',
        end:''
      },
      companyList:[{
        name:'全部',
        value:''
      }]
    }
  },
  components: {
    Panel
  },
  methods: {
    onSubmit () {
      this.$refs.myChild.getPublicMsg(this.ruleForm.companyName,this.ruleForm.start,this.ruleForm.end);
    },
    companyChange(val){
      console.log(val)
    },
    timeChange(val){
      if(val == null){
        this.ruleForm.time=['','']
      }else{
        this.ruleForm.time=val
      }
      this.ruleForm.start =this.ruleForm.time[0]
      this.ruleForm.end =this.ruleForm.time[1]
    },
    /*获取公司下拉菜单*/
    getCompanyList () {
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
          for(let i=0;i<res.data.data.length;i++){
            _this.companyList.push({
              name:res.data.data[i].companyName,
              value:res.data.data[i].code,
            })
          }
        }
      }).catch(error => {
        console.error(error)
      })
    },
  },
  created(){
    this.getCompanyList()
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
.table-header{
  margin-top: -20px;
  position: fixed;
  z-index: 1;
  background-color: #fafafa;
  width: 100%;
}
.table-list{
  padding-top: 60px;
}
</style>
