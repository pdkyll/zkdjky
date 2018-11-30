/**
 * Created by zhangxin on 2018/11/15.
 */
<template>
 <div>
   <el-row class="table-header" :gutter="20">
     <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
       <el-form-item label="公司名称" class="ml-10">
         <el-select v-model="ruleForm.companyName" size="small" placeholder="请选择活动区域">
           <el-option label="江苏天晴" value="jiangsu"></el-option>
           <el-option label="南京天晴" value="nanjing"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="日期">
         <el-col :span="11">
           <el-form-item>
             <el-date-picker type="date" size="small" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
           </el-form-item>
         </el-col>
         <el-col class="line" :span="2">至</el-col>
         <el-col :span="11">
           <el-form-item>
             <el-date-picker type="date" size="small" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
           </el-form-item>
         </el-col>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
       </el-form-item>
     </el-form>
   </el-row>
   <el-row class="table-list" :gutter="20">
     <el-col :span="24">
       <panel></panel>
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
        companyName: '',
        date1: '',
        date2: ''
      }
    }
  },
  components: {
    Panel
  },
  methods: {
    onSubmit () {
      console.log(this.ruleForm.companyName, this.ruleForm.date1, this.ruleForm.date2)
    }
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
