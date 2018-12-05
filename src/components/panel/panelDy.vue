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
          <span class="msg-name2">地域 : </span>
          <span class="color-999">{{item.dy}}</span><br>
          <span class="msg-name2">部门 : </span>
          <span class="color-999">{{item.bm}}</span><br>
          <span class="msg-name2">销售网点 : </span>
          <span class="color-999">{{item.wd}}</span><br>
        </p>
        <p class="msg-list">
          <span class="msg-name">统计表目的 : </span>
          <span class="color-999">{{item.md}}</span>
        </p>
        <p class="footer-btn">
          <span class="mr-10 icon-green">
            <i class="iconfont icon-chakanyanjingshishifenxi"></i>
            <span>10</span>
          </span>
          <span class="mr-10 icon-red">
            <i class="iconfont icon-shoucang3"></i>
            <span>10</span>
          </span>
          <span class="mr-10 color-999">
            有帮助吗？
          </span>
          <el-button class="qx">取消订阅</el-button>
          <el-button class="ll" @click="open_hide(item.index)">浏览全部</el-button>
        </p>
      </div>
      <div class="right-chart">
        <ve-histogram
          :data="item.chartData"
          :settings="item.chartData.chartSettings"
          :toolbox="toolbox" height="350px">
        </ve-histogram>
        <div class="hide-box" v-show="item.is_show">
          <div class="e-box" v-for="(i , index) in item.dataList" :key="index">
            <ve-chart :data="i" :ref="i.chart_ref" :settings="i.chartSettings"></ve-chart>
          </div>
          <div class="e-table">
            <el-table
              :data="item.tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'echarts/lib/component/toolbox'
export default{
  name: 'PanelDy',
  data () {
    this.toolbox = {
      feature: {
        magicType: {type: ['bar', 'line']},
        saveAsImage: {}
      }
    }
    return {
      tjList: [
        {
          is_show: false,
          index: 0,
          name: '营业总收入',
          sj: '2018-01-01至今',
          gs: '南京天晴，江苏天晴，北京泰德',
          cp: '诺氟沙星',
          dy: '北京 河北（石家庄）',
          bm: '销售一部',
          wd: '临床',
          md: '通过以上维度排查相关产品的营业总收入',
          chartData: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              { '日期': '2018-01', '访问用户': 1393, '下单用户': 1093, '下单率': 321 },
              { '日期': '2018-02', '访问用户': 3530, '下单用户': 3230, '下单率': 261 },
              { '日期': '2018-03', '访问用户': 2923, '下单用户': 2623, '下单率': 761 },
              { '日期': '2018-04', '访问用户': 1723, '下单用户': 1423, '下单率': 491 },
              { '日期': '2018-05', '访问用户': 3792, '下单用户': 3492, '下单率': 3231 },
              { '日期': '2018-06', '访问用户': 4593, '下单用户': 4293, '下单率': 781 }
            ],
            chartSettings: {
              metrics: ['访问用户', '下单用户', '下单率']
            }
          },
          dataList: [
            {
              chart_ref: 'chart1',
              columns: ['日期', '访问用户'],
              rows: [
                { '日期': '1/1', '访问用户': 1393 },
                { '日期': '1/2', '访问用户': 3530 },
                { '日期': '1/3', '访问用户': 2923 },
                { '日期': '1/4', '访问用户': 1723 },
                { '日期': '1/5', '访问用户': 3792 },
                { '日期': '1/6', '访问用户': 4593 }
              ],
              chartSettings: { type: 'line' }
            },
            {
              chart_ref: 'chart2',
              columns: ['日期', '访问用户'],
              rows: [
                { '日期': '1/1', '访问用户': 1393 },
                { '日期': '1/2', '访问用户': 3530 },
                { '日期': '1/3', '访问用户': 2923 },
                { '日期': '1/4', '访问用户': 1723 },
                { '日期': '1/5', '访问用户': 3792 },
                { '日期': '1/6', '访问用户': 4593 }
              ],
              chartSettings: { type: 'pie' }
            },
            {
              chart_ref: 'chart3',
              columns: ['日期', '访问用户'],
              rows: [
                { '日期': '1/1', '访问用户': 1393 },
                { '日期': '1/2', '访问用户': 3530 },
                { '日期': '1/3', '访问用户': 2923 },
                { '日期': '1/4', '访问用户': 1723 },
                { '日期': '1/5', '访问用户': 3792 },
                { '日期': '1/6', '访问用户': 4593 }
              ],
              chartSettings: { type: 'histogram' }
            }
          ],
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        },
        {
          is_show: false,
          index: 1,
          name: '营业总收入',
          sj: '2018-01-01至今',
          gs: '南京天晴，江苏天晴，北京泰德',
          cp: '诺氟沙星',
          dy: '北京 河北（石家庄）',
          bm: '销售一部',
          wd: '临床',
          md: '通过以上维度排查相关产品的营业总收入',
          chartData: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              { '日期': '2018-01', '访问用户': 1393, '下单用户': 1093, '下单率': 321 },
              { '日期': '2018-02', '访问用户': 3530, '下单用户': 3230, '下单率': 261 },
              { '日期': '2018-03', '访问用户': 2923, '下单用户': 2623, '下单率': 761 },
              { '日期': '2018-04', '访问用户': 1723, '下单用户': 1423, '下单率': 491 },
              { '日期': '2018-05', '访问用户': 3792, '下单用户': 3492, '下单率': 3231 },
              { '日期': '2018-06', '访问用户': 4593, '下单用户': 4293, '下单率': 781 }
            ],
            chartSettings: {
              metrics: ['访问用户', '下单用户', '下单率']
            }
          },
          dataList: [
            {
              chart_ref: 'chart1',
              columns: ['日期', '访问用户'],
              rows: [
                { '日期': '1/1', '访问用户': 1393 },
                { '日期': '1/2', '访问用户': 3530 },
                { '日期': '1/3', '访问用户': 2923 },
                { '日期': '1/4', '访问用户': 1723 },
                { '日期': '1/5', '访问用户': 3792 },
                { '日期': '1/6', '访问用户': 4593 }
              ],
              chartSettings: { type: 'pie' }
            },
            {
              chart_ref: 'chart2',
              columns: ['日期', '访问用户'],
              rows: [
                { '日期': '1/1', '访问用户': 1393 },
                { '日期': '1/2', '访问用户': 3530 },
                { '日期': '1/3', '访问用户': 2923 },
                { '日期': '1/4', '访问用户': 1723 },
                { '日期': '1/5', '访问用户': 3792 },
                { '日期': '1/6', '访问用户': 4593 }
              ],
              chartSettings: { type: 'histogram' }
            }
          ],
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        }
      ]
    }
  },
  components: {},
  methods: {
    open_hide (flag) {
      if (this.tjList[flag].is_show !== !this.tjList[flag].is_show) {
        this.tjList[flag].is_show = !this.tjList[flag].is_show
      }
      if (this.tjList[flag].is_show) {
        this.$nextTick(_ => {
          for (let i = 0; i < this.tjList[flag].dataList.length; i++) {
            this.$refs[`chart${i + 1}`][flag].echarts.resize()
            console.log(this.$refs[`chart${i + 1}`][flag])
          }
        })
      }
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
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
  }
  .e-box{
    float: left;
    width: 50%;
    height: 350px;
  }
  .e-table{
    float: left;
    width: 96%;
    margin-left: 4%;
  }
</style>
