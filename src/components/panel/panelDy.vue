/**
* Created by zhangxin on 2018/11/16.
*/
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button class="pull-right qx" size="small" v-if="tjList.length > 0" @click="openDialog">取消全部订阅</el-button>
      </el-col>
    </el-row>
    <div class="box-wrapper" v-for="item in tjList" :key="item.index">
      <div class="left-msg">
        <p class="msg-list">
          <span class="msg-name">统计表名称 : </span>
          <span class="color-green">{{item.name}}</span>
        </p>
        <p class="msg-list">
          <span class="msg-name">统计维度 : </span><br>
          <span class="msg-name2">时间 : </span>
          <span class="color-999">{{item.sj}}</span><br>
          <span class="msg-name2">公司 : </span>
          <span class="color-999">{{item.gs}}</span><br>
          <span class="msg-name2">产品 : </span>
          <span class="color-999">{{item.cp}}</span><br>
          <span class="msg-name2">部门 : </span>
          <span class="color-999">{{item.bm}}</span><br>
        </p>
        <p class="msg-list">
          <span class="msg-name">统计表目的 : </span>
          <span class="color-999">{{item.md}}</span>
        </p>
        <p class="footer-btn">
          <span class="mr-10 icon-green">
            <i class="iconfont icon-chakanyanjingshishifenxi"></i>
            <span>{{item.view}}</span>
          </span>
          <span class="mr-10 icon-red">
            <i class="iconfont icon-shoucang3" :class= "item.like? 'like' : 'notLike'" @click="good(item.index,$event)"></i>
          </span>
          <span class="mr-10 color-999">
            有帮助吗？
          </span>
          <el-button class="qx">取消订阅</el-button>
          <el-button class="ll" @click="open_hide(item.index,item.dis.ref,item.bar.ref,item.line.ref,item.pie.ref)">浏览全部</el-button>
        </p>
      </div>
      <div class="right-chart">
        <div class="clearFix" :class="item.isShow?'openBox':'hideBox'">
          <mingle-chart :ref="item.dis.ref" v-if="item.dis.show" :data="item.chartData"></mingle-chart>
          <pie-chart :ref="item.pie.ref" v-if="item.pie.show" class="mb-10" :data="item.chartData"></pie-chart>
          <bar-chart :ref="item.bar.ref" v-if="item.bar.show" class="mb-10" :data="item.chartData"></bar-chart>
          <line-Chart :ref="item.line.ref" v-if="item.line.show" class="mb-10" :data="item.chartData"></line-Chart>
          <div class="e-table">
            <el-table
              :data="item.tableData"
              border
              style="width: 100%">
              <el-table-column
                v-for="(header, index) in item.tableHeader"
                :key="'cols' + index + item.index"
                :prop="index"
                :label="header"
                width="180">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示信息"
      :visible.sync="dialogDelete"
      width="30%"
      :before-close="deleteClose">
      <p>是否取消关注所有？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteAll">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import barChart from './barChart.vue'
import pieChart from './pieChart.vue'
import lineChart from './lineChart.vue'
import mingleChart from './mingleChart.vue'
export default{
  name: 'PanelDy',
  data () {
    return {
      dialogDelete:false,
      tjList: [],
    }
  },
  components: {
    barChart,
    pieChart,
    lineChart,
    mingleChart
  },
  methods: {
    open_hide (flag,dis,bar,line,pie) {
      let vm = this
      if (this.tjList[flag].isShow !== !this.tjList[flag].isShow) {
        this.tjList[flag].isShow = !this.tjList[flag].isShow
        let disRef = vm.$refs[dis]
        let barRef = vm.$refs[bar]
        let lineRef = vm.$refs[line]
        let pieRef = vm.$refs[pie]
        if(disRef!==undefined){
          disRef[0].resizeChart();
        }
        if(barRef!==undefined){
          barRef[0].resizeChart();
        }
        if(lineRef!==undefined){
          lineRef[0].resizeChart();
        }
        if(pieRef!==undefined){
          pieRef[0].resizeChart();
        }
      }
    },
    /*初始化echart图*/
    initChart(){
      let vm = this
      for(let i=0;i<this.tjList.length;i++){
        let disRef = vm.$refs['dis_'+i+'_4']
        let barRef = vm.$refs['bar_'+i+'_1']
        let lineRef = vm.$refs['line_'+i+'_2']
        let pieRef = vm.$refs['pie_'+i+'_3']
        if(disRef!==undefined){
          disRef[0].resizeChart();
        }
        if(barRef!==undefined){
          barRef[0].resizeChart();
        }
        if(lineRef!==undefined){
          lineRef[0].resizeChart();
        }
        if(pieRef!==undefined){
          pieRef[0].resizeChart();
        }
      }
    },
    good(flag,e){
      let vm = this
      if(this.tjList[flag].like){
        e.target.style.color = '#999'
        vm.notLike(vm.tjList[flag].data_id,vm.tjList[flag].type)
        this.tjList[flag].like = false
      }else{
        this.tjList[flag].like = true
        vm.like(vm.tjList[flag].data_id,vm.tjList[flag].type)
        e.target.style.color = '#CC0F1B'
      }
    },
    /**
     * 获取列表
     */
    getAttention(){
      let _this = this
      let header = {
      }
      let param = {
        creator: sessionStorage.getItem('accountId'),
      }
      _this.$store.dispatch('GET_ATTENTION_LIST', {param, header}).then(res => {
        console.log(res.data)
        if(res.status === 200){
          for(let i=0;i<res.data.length;i++){
            let time = res.data[i].dateRange.split('&')
            time = time[0]+'至'+time[1]
            let atlasArr = res.data[i].atlas.split(',')

            let obj = {
              isShow: false,
              dis: atlasArr.indexOf('4')>=0?{show:true,ref:'dis_'+i+'_4'}:{show:false,ref:'dis_'+i+'_4'},
              bar: atlasArr.indexOf('1')>=0?{show:true,ref:'bar_'+i+'_1'}:{show:false,ref:'bar_'+i+'_1'},
              line: atlasArr.indexOf('2')>=0?{show:true,ref:'line_'+i+'_2'}:{show:false,ref:'line_'+i+'_2'},
              pie: atlasArr.indexOf('3')>=0?{show:true,ref:'pie_'+i+'_3'}:{show:false,ref:'pie_'+i+'_3'},
              index: i,
              data_id:res.data[i].id,
              type:res.data[i].type,
              name:res.data[i].statisticalName,
              sj: time,
              gs: res.data[i].companyName,
              cp: res.data[i].productName,
              bm: res.data[i].departmentName,
              md: res.data[i].remarks,
              view:res.data[i].subscribeCount,
              like:res.data[i].funp,
              chartData:res.data[i].financialMap,
              tableHeader:  res.data[i].totalTableData.headerMap,
              tableData: res.data[i].totalTableData.transformData
            }

            _this.tjList.push(obj)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /*点赞*/
    like(dataId,type){
      let _this = this
      let header = {
      }
      let param = {
        account_id: sessionStorage.getItem('accountId'),
        data_id:dataId,
        type:type
      }
      _this.$store.dispatch('ATTENTION_LIKE', {param, header}).then(res => {
        console.log(res)
        _this.$notify({
          title: '提示信息',
          message: '点赞成功',
          type: res.status === 200 ? 'success' : 'error',
          duration: '1000'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    /*取消点赞*/
    notLike(dataId,type){
      let _this = this
      let header = {
      }
      let param = {
        account_id: sessionStorage.getItem('accountId'),
        data_id:dataId,
        type:type
      }
      _this.$store.dispatch('ATTENTION_NOT_LIKE', {param, header}).then(res => {
        console.log(res)
        _this.$notify({
          title: '提示信息',
          message: '取消点赞成功',
          type: res.status === 200 ? 'success' : 'error',
          duration: '1000'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    /*取消全部订阅*/
    cancelAll(){
      let _this = this
      let header = {
      }
      let param = {
        account_id: sessionStorage.getItem('accountId'),
      }
      _this.$store.dispatch('CANCEL_ALL_ATTENTION', {param, header}).then(res => {
        _this.$notify({
          title: '提示信息',
          message: '取消全部订阅成功',
          type: res.status === 200 ? 'success' : 'error',
          duration: '1000'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    openDialog(){
      this.dialogDelete = true
    },
    deleteClose(){
      this.dialogDelete = false
    },
    deleteAll(){
      this.dialogDelete = false
      this.cancelAll()
      this.tjList = []
    },
  },
  created () {
    let vm = this
    this.getAttention()
  },
  updated (){
    this.initChart()
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
  .openBox{
    height:auto;
  }
  .hideBox{
    overflow: hidden;
    height:350px;
  }
  .like{
    color: #CC0F1B;
  }
  .notLike{
    color: #999;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .pieChart{
    float: left;
  }
  .box-wrapper{
    position: relative;
    margin: 0 auto 20px;
    width: 98%;
    overflow: hidden;
    height: auto;
    box-shadow: 0 0 25px #DEDFE0;
    padding: 20px;
    .left-msg{
      width: 32%;
      height:350px;
      float: left;
      font-size: 12px;
      .msg-list{
        margin: 7px 0;
      }
      .msg-name{
        display: inline-block;
        width: 70px;
        text-align: right;
        font-weight: bold;
      }
      .msg-name2{
        display: inline-block;
        width: 100px;
        text-align: right;
        font-weight: bold;
        margin: 7px 0;
      }
    }
    .right-chart{
      width: 67%;
      border-left:1px solid #ccc;
      height:auto;
      float: left;
    }
    .footer-btn{
      width: 31%;
      height: 30px;
      position: absolute;
      line-height: 30px;
      bottom: 25px;
    }
  }
  .qx{
    float: right;
    margin-right: 1%;
    display: inline-block;
    height: 30px;
    padding: 5px;
    line-height: 5px;
    color: #000;
    border-color: #d5d655;
    background: white;
    &:hover,
    &:focus{
      color: white;
      border-color: #d5d655;
      background-image: linear-gradient(to right, #b7cc41,#d5d655);
    }
  }
  .ll{
    float: right;
    padding: 5px;
    margin-right: 1%;
    display: inline-block;
    height: 30px;
    line-height: 5px;
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

  .e-table{
    float: left;
    width: 96%;
    margin-left: 4%;
  }
</style>
