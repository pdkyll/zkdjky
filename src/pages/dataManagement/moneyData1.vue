/**
* Created by zhangxin on 2018/11/16.
*/
<template>
  <div>
    <div class="topBtn clearFix">
      <el-button class="ll">返回</el-button>
      <el-button class="ll">导出</el-button>
      <el-button class="qx">加入订阅</el-button>
      <p class="pull-left">统计范围</p>
    </div>
    <div class="box-wrapper">
      <div class="left-msg">
        <el-form :model="ruleFormModule" label-position="top" label-width="100px" class="demo-ruleForm">
          <el-form-item label="日期选择">
            <el-col :span="10">
              <el-form-item>
                <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleFormModule.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">至</el-col>
            <el-col :span="10">
              <el-form-item>
                <el-date-picker
                  size="small"
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleFormModule.date2"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="地域选择">
            <el-tree
              :data="ruleFormModule.dataTree"
              show-checkbox
              :props="ruleFormModule.defaultProps">
            </el-tree>
          </el-form-item>
          <el-form-item label="公司选择">
            <el-tree
              :data="ruleFormModule.dataTree2"
              show-checkbox
              :props="ruleFormModule.defaultProps2">
            </el-tree>
          </el-form-item>
          <el-form-item label="统计选择">
            <el-tree
              :data="ruleFormModule.dataTree"
              show-checkbox
              :props="ruleFormModule.defaultProps">
            </el-tree>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-chart">
          <div class="e-box">
            <h5 class="small-green">资产负债数据</h5>
            <ve-ring :data="chartData" height="330px" :settings="chartData.chartSettings"></ve-ring>
          </div>
        <div class="e-box">
          <h5 class="small-green">资产负债数据</h5>
          <ve-bar :data="chartData2" height="330px" :settings="chartData2.chartSettings"></ve-bar>
        </div>
          <div class="e-table">
            <el-table
              :data="tableData"
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
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
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
      ],
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1/1', '访问用户': 1393 },
          { '日期': '1/2', '访问用户': 3530 },
          { '日期': '1/3', '访问用户': 2923 },
          { '日期': '1/4', '访问用户': 1723 },
          { '日期': '1/5', '访问用户': 3792 },
          { '日期': '1/6', '访问用户': 4593 }
        ],
        chartSettings: {
          radius: [50, 100],
          offsetY: 160
        }
      },
      chartData2: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '声音数据', '访问用户': 1393, '下单用户': 1093, '下单率': 312 },
          { '日期': '图像数据', '访问用户': 3530, '下单用户': 3230, '下单率': 216 },
          { '日期': '表格数据', '访问用户': 2923, '下单用户': 2623, '下单率': 716 },
          { '日期': '视频数据', '访问用户': 1723, '下单用户': 1423, '下单率': 419 },
          { '日期': '文本数据', '访问用户': 3792, '下单用户': 3492, '下单率': 3123 }
        ],
        chartSettings: {
          stack: {
            'xxx': ['访问用户', '下单用户', '下单率']
          }
        }
      },
      ruleFormModule: {
        data1: '',
        data2: '',
        dataTree: [
          {
            id: 1,
            label: '一级 1'
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dataTree2: [
          {
            id: 1,
            label: '一级 1'
          },
          {
            id: 2,
            label: '一级 2'
          }
        ],
        defaultProps2: {
          children: 'children',
          label: 'label'
        },
        dataTree3: [
          {
            id: 1,
            label: '一级 1'
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }
        ],
        defaultProps3: {
          children: 'children',
          label: 'label'
        }
      }
    }
  },
  components: {},
  methods: {
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
  .box-wrapper{
    height:auto;
    background: white;
    position: relative;
    margin: 0 auto 20px;
    width: 98%;
    overflow: hidden;
    box-shadow: 0 0 25px #DEDFE0;
    .left-msg{
      min-height: 700px;
      overflow: auto;
      background: white;
      border-right: 10px solid #fafafa;
      width: 32%;
      padding: 20px;
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
      background: white;
      padding: 10px 30px 10px 0;
      width: 67%;
      margin-left: 1%;
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
  .small-green{
    position: relative;
    margin-left: 20px;
    padding-left: 10px;
  }
  .small-green:before{
    position: absolute;
    left:0;
    bottom: 0;
    content: '';
    width: 5px;
    height:90%;
    background: #bfd046;
  }
  .topBtn{
    padding:0 20px 20px;
    p{
      line-height: 30px;
    }
  }
</style>
