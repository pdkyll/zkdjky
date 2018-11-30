<template>
    <div>
      <div class="shadow-box">
        <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
          <el-form-item class="no-mb ml-10" label="日期">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">至</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  size="small"
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date2"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="公司名称" class="no-mb">
            <el-select size="small" v-model="ruleForm.companyName" placeholder="请选择活动区域">
              <el-option label="江苏天晴" value="jiangsu"></el-option>
              <el-option label="南京天晴" value="nanjing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="f-box">
        <h5>统计内容</h5>
        <div class="left-tree pull-left shadow">
          <el-tree :data="data"
                   :props="defaultProps"
                   node-key="id"
                   :default-expanded-keys="[1, 2, 3 ,4]"
                   @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="right-table pull-left shadow">
          <div class="clearFix">
            <el-button class="qx pull-right" size="small" @click="export2Excel(tableData)">导出</el-button>
          </div>
          <div class="mt-20">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                :resizable=false
                prop="date"
                label="日期">
              </el-table-column>
              <el-table-column
                :resizable=false
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                :resizable=false
                prop="province"
                label="省份">
              </el-table-column>
              <el-table-column
                :resizable=false
                prop="city"
                label="市区">
              </el-table-column>
              <el-table-column
                :resizable=false
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column
                :resizable=false
                prop="zip"
                label="邮编"
                width="100">
              </el-table-column>
            </el-table>
            <div class="fy-box">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="5"
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
export default {
  data () {
    return {
      ruleForm: {
        companyName: '',
        date1: '',
        date2: '',
        input: ''
      },
      data: [
        {
          id: 1,
          label: '月报',
          children: [
            {
              id: 4,
              label: '资产负债表',
              children: [{
                id: 10,
                label: '2015年'
              }, {
                id: 11,
                label: '2015年'
              }]
            },
            {
              id: 5,
              label: '利润表',
              children: [{
                id: 12,
                label: '2015年'
              }, {
                id: 13,
                label: '2015年'
              }]
            }]
        },
        {
          id: 2,
          label: '季报',
          children: [{
            id: 6,
            label: '二级 2-1'
          }, {
            id: 7,
            label: '二级 2-2'
          }]
        },
        {
          id: 3,
          label: '年报',
          children: [{
            id: 8,
            label: '二级 3-1'
          }, {
            id: 9,
            label: '二级 3-2'
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }
      ]
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    export2Excel (lister) {
      require.ensure([], () => {
        const fn = require('../../vendor/Export2Excel')
        const tHeader = ['', '总数', '学历生', '非学历生']
        const filterVal = ['four', 'one', 'two', 'three']
        const list = lister
        const data = this.formatJson(filterVal, list)
        fn.export_json_to_excel(tHeader, data, '数据分析列表excel')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style scoped lang="scss">
  .shadow-box{
    padding: 10px 5px;
    box-shadow: 0 0 29px rgba(#b1c4d0, .48);
  }
  .f-box{
    width: 100%;
    height:600px;
    .shadow{
      height:100%;
      box-shadow: 0 0 10px rgba(#b1c4d0, .48);
    }
    .left-tree{
      overflow: auto;
      width: 20%;
      height:100%;
      background: white;
    }
    .right-table{
      padding: 10px;
      width: 78%;
      margin-left: 2%;
      height:100%;
      background: white;
    }
  }
</style>
