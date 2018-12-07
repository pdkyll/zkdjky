/**
 * Created by zhangxin on 2018/11/15.
 */
<template>
 <div>
   <el-row class="table-header" :gutter="20">
     <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
       <el-form-item label="公司名称" class="ml-10">
         <el-select v-model="ruleForm.companyName" size="small" placeholder="请选择活动区域">
           <el-option label="全部" value=""></el-option>
           <el-option label="1" value="1"></el-option>
           <el-option label="(NULL)为其全文" value="为其全文"></el-option>
           <el-option label="a2341134" value="a2341134"></el-option>
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
             start-placeholder="开始日期"
             end-placeholder="结束日期">
           </el-date-picker>
         </div>
         </el-col>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
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
        companyName: '',
        time: '',
        start:'',
        end:''
      }
    }
  },
  components: {
    Panel
  },
  methods: {
    onSubmit () {
      this.$refs.myChild.getPublicMsg(this.ruleForm.companyName,this.ruleForm.start,this.ruleForm.end);
    },
    timeChange(val){
      if(val == null){
        this.ruleForm.time=['','']
      }else{
        this.ruleForm.time=val
      }
      this.ruleForm.start =this.ruleForm.time[0]
      this.ruleForm.end =this.ruleForm.time[1]
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
