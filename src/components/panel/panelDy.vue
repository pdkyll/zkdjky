/**
* Created by zhangxin on 2018/11/16.
*/
<template>
  <div>
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
            <i class="iconfont icon-shoucang3" :class= "item.like? 'like' : 'notLike'" transiton="fade" @click="good(item.index,$event)"></i>
          </span>
          <span class="mr-10 color-999">
            有帮助吗？
          </span>
          <el-button class="qx">取消订阅</el-button>
          <el-button class="ll" @click="open_hide(item.index)">浏览全部</el-button>
        </p>
      </div>
      <div class="right-chart">
        <mingle-chart></mingle-chart>
        <transition name="fade">
          <div class="hide-box clearFix" transiton="fade" v-show="item.isShow">
            <pie-chart v-if="item.pie" class="mb-10" :data="item.pieData"></pie-chart>
            <pie-chart v-if="item.pie" class="mb-10" :data="item.pieData2"></pie-chart>
            <bar-chart v-if="item.bar" class="mb-10" :data="item.barData"></bar-chart>
            <line-Chart v-if="item.line" class="mb-10" :data="item.lineData"></line-Chart>
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
        </transition>
      </div>
    </div>
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
    open_hide (flag) {
      if (this.tjList[flag].isShow !== !this.tjList[flag].isShow) {
        this.tjList[flag].isShow = !this.tjList[flag].isShow
      }
    },
    good(flag,e){
      if(this.tjList[flag].like){
        e.target.style.color = '#999'
        this.tjList[flag].like = false
      }else{
        this.tjList[flag].like = true
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
            let atlasArr = res.data.atlas.split(',')
            _this.tjList.push({
              isShow: false,
              dis: atlasArr.indexOf('1')>=0?true:false,
              bar: atlasArr.indexOf('2')>=0?true:false,
              line: atlasArr.indexOf('3')>=0?true:false,
              pie: atlasArr.indexOf('4')>=0?true:false,
              index: i,
              name:res.data[i].statisticalName,
              sj: time,
              gs: res.data[i].companyName,
              cp: res.data[i].productName,
              bm: res.data[i].departmentName,
              md: res.data[i].remarks,
              view:res.data[i].subscribeCount,
              like:false,
              barData:{
                name:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                xName:[
                  '北京','\n天津','河北','\n山西','内蒙古','\n辽宁','吉林','\n黑龙江',
                  '上海','\n江苏','浙江','\n安徽','福建','\n江西','山东','\n河南',
                  '湖北','\n湖南','广东','\n广西','海南','\n重庆','四川','\n贵州',
                  '云南','\n西藏','陕西','\n甘肃','青海','\n宁夏','新疆'
                ],
                count:{
                  //max : 60000,
                  '1': [1020, 45, 45, 34, 25, 43, 37, 31, 32, 26, 33, 25, 35, 23, 25, 39, 31, 32, 48, 37, 33, 35, 32, 34, 25, 28, 35, 44, 36, 26, 26, 20],
                  '2': [928, 39, 42, 27, 29, 39, 36, 34, 38, 25, 30, 31, 34, 29, 35, 32, 28, 29, 37, 27, 47, 25, 25, 30, 31, 33, 42, 27, 39, 8, 0, 0],
                  '3': [1024, 29, 26, 37, 48, 41, 34, 26, 45, 21, 39, 35, 37, 41, 29, 32, 34, 25, 39, 24, 35, 34, 36, 29, 25, 35, 32, 31, 45, 30, 29, 21],
                  '4': [878, 26, 34, 24, 31, 36, 20, 24, 28, 30, 25, 22, 32, 28, 32, 28, 27, 34, 34, 30, 39, 36, 16, 26, 36, 34, 26, 34, 26, 26, 34, 0],
                  '5': [902, 28, 27, 38, 26, 22, 32, 28, 39, 36, 31, 35, 20, 29, 27, 36, 25, 23, 24, 26, 35, 21, 27, 41, 30, 33, 26, 27, 30, 31, 30, 19],
                  '6': [914, 31, 29, 31, 30, 34, 40, 32, 38, 16, 31, 27, 25, 28, 27, 28, 28, 33, 36, 23, 34, 36, 33, 31, 31, 30, 26, 35, 30, 34, 27, 0],
                  '7': [1070, 31, 35, 36, 34, 29, 36, 28, 49, 28, 33, 36, 32, 36, 31, 47, 30, 41, 41, 43, 33, 24, 38, 40, 33, 32, 35, 21, 43, 38, 33, 24],
                  '8': [1342, 47, 35, 26, 32, 40, 40, 31, 63, 37, 44, 37, 40, 41, 41, 48, 50, 36, 65, 44, 51, 40, 41, 51, 36, 39, 63, 55, 59, 32, 38, 40],
                  '9': [1157, 32, 34, 33, 29, 39, 44, 32, 33, 33, 57, 36, 31, 41, 32, 36, 36, 42, 49, 45, 55, 37, 34, 35, 36, 43, 55, 34, 42, 34, 38, 0],
                  '10': [1185, 45, 46, 33, 29, 50, 31, 40, 57, 33, 49, 34, 50, 31, 34, 33, 31, 32, 36, 33, 51, 49, 41, 30, 32, 48, 45, 39, 41, 30, 28, 24],
                  '11': [1116, 45, 39, 42, 38, 34, 41, 38, 39, 39, 36, 28, 32, 37, 30, 38, 56, 36, 46, 34, 37, 23, 31, 40, 35, 35, 44, 42, 51, 24, 26, 0],
                  '12': [1026, 44, 38, 32, 35, 36, 47, 35, 43, 30, 38, 32, 33, 38, 36, 27, 36, 30, 31, 32, 38, 29, 25, 27, 24, 36, 37, 26, 47, 23, 27, 14]
                }
              },
              lineData:{
                time:['1', '2', '3', '4', '5', '6', '7'],
                count:[
                  {
                    name:'旅游运输',
                    value:[120, 132, 101, 134, 90, 230, 10],
                  },
                  {
                    name:'班线运输',
                    value:[220, 182, 191, 234, 290, 330, 310],
                  },
                  {
                    name:'危险品',
                    value:[150, 232, 201, 154, 190, 330, 410],
                  },
                  {
                    name:'普货',
                    value:[320, 332, 301, 334, 390, 330, 320],
                  }
                ]
              },
              tableHeader:  res.data[i].totalTableData.headerMap,
              tableData: res.data[i].totalTableData.transformData
            })
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
  created () {
    this.getAttention()
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
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
  .hide-box{
    width: 100%;
    height: auto;
  }
  .e-table{
    float: left;
    width: 96%;
    margin-left: 4%;
  }
</style>
