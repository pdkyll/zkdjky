
<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item label="公司名称" class="no-mb ml-10">
          <el-select size="small" v-model="ruleForm.companyName" placeholder="请选择公司">
            <el-option
              v-for="item in companyOptions"
              :key="'opt' + item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" class="no-mb">
          <el-date-picker
            size="small"
            v-model="ruleForm.time"
            type="daterange"
            value-format="yyyy-MM-dd"
            @change="timeChange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="f-box">
      <h5>统计内容</h5>
      <div class="left-tree pull-left shadow">
        <el-tree :data="data"
                 :props="defaultProps"
                 :default-checked-keys="['product']"
                 node-key="id"
                 @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="right-table pull-left shadow">
        <div class="clearFix">
          <el-button class="qx pull-right" size="small" @click="export2Excel(tableData)">导出</el-button>
        </div>
        <div class="mt-20">
          <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              v-for="cols in historyTableColumnHeader"
              :resizable=false
              :key="'col' + cols.column_name"
              :prop="cols.column_name"
              :label="cols.column_comment">
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

    <!--弹框1-->
    <el-dialog
      title="新建指标"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <div style="width: 100%;margin: 0 auto 20px">
        <el-steps :active="0" align-center>
          <el-step title="新建指标"></el-step>
          <el-step title="筛选维度"></el-step>
          <el-step title="逻辑指标库"></el-step>
        </el-steps>
      </div>
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="统计表名称" prop="name">
          <el-col :span="20">
            <el-input v-model="ruleFormModule.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="统计目的" prop="md">
          <el-col :span="20">
            <el-input type="textarea" v-model="ruleFormModule.md"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="next">下一步</el-button>
      </span>
    </el-dialog>
    <!--弹框2-->
    <el-dialog
      title="筛选维度"
      :visible.sync="dialogVisible2"
      width="50%"
      :before-close="handleClose2">
      <div style="width: 100%;margin: 0 auto 20px">
        <el-steps :active="1" align-center>
          <el-step title="新建指标"></el-step>
          <el-step title="筛选维度"></el-step>
          <el-step title="逻辑指标库"></el-step>
        </el-steps>
      </div>
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="选择日期" prop="rq">
          <el-col :span="9">
            <el-form-item>
              <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleFormModule.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">至</el-col>
          <el-col :span="9">
            <el-form-item>
              <el-date-picker
                size="small"
                type="date"
                placeholder="选择日期"
                v-model="ruleFormModule.date2"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-radio-group v-model="ruleFormModule.timeRadio">
                <el-radio :label="1">天</el-radio>
                <el-radio :label="2">月</el-radio>
                <el-radio :label="3">季</el-radio>
                <el-radio :label="4">年</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="选择公司" prop="gs">
          <el-transfer
            v-model="ruleFormModule.value"
            :titles="['全部','全部']"
            :data="ruleFormModule.data"></el-transfer>
        </el-form-item>
        <el-form-item label="部门" prop="bm">
          <el-tree
            :data="ruleFormModule.tree_bm"
            show-checkbox
            node-key="id"
            :props="ruleFormModule.defaultProps_bm">
          </el-tree>
        </el-form-item>
        <el-form-item label="产品" prop="cp">
          <br>
          <label for="">南京天晴</label>
          <el-select v-model="ruleFormModule.cp" class="mb-20" size="small" multiple filterable placeholder="请选择">
            <el-option
              v-for="item in ruleFormModule.cp_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
          <label for="">江苏天晴</label>
          <el-select v-model="ruleFormModule.cp2" size="small" multiple filterable placeholder="请选择">
            <el-option
              v-for="item in ruleFormModule.cp_options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="选择地区" prop="dq">
          <el-transfer
            filterable
            :filter-method="ruleFormModule.filterMethod"
            filter-placeholder="请输入城市拼音"
            v-model="ruleFormModule.value2"
            :data="ruleFormModule.data2">
          </el-transfer>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="last2">上一步</el-button>
        <el-button type="primary" @click="next2">下一步</el-button>
      </span>
    </el-dialog>
    <!--弹框3-->
    <el-dialog
      title="逻辑指标库"
      :visible.sync="dialogVisible3"
      width="50%"
      :before-close="handleClose3">
      <div style="width: 100%;margin: 0 auto 20px">
        <el-steps :active="2" align-center>
          <el-step title="新建指标"></el-step>
          <el-step title="筛选维度"></el-step>
          <el-step title="逻辑指标库"></el-step>
        </el-steps>
      </div>
      <el-form :model="ruleFormModule" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="逻辑指标库" prop="zb">
          <el-select v-model="ruleFormModule.zb" placeholder="请选择">
            <el-option-group
              v-for="group in ruleFormModule.zb_options"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="展现方式" prop="fl">
          <el-col :span="24">
            <el-form-item>
              <el-checkbox-group v-model="ruleFormModule.checkList">
                <div>
                  <el-checkbox label="柱状图" class="w100">柱状图</el-checkbox>
                  <el-button size="small" class="ml-20" @click="Z_isShow">预览图形</el-button>
                  <div v-show="Z_show">
                    <ve-histogram :data="Z_Data" ref="chart1"></ve-histogram>
                  </div>
                </div>
                <div>
                  <el-checkbox label="饼状图" class="w100">饼状图</el-checkbox>
                  <el-button size="small" class="ml-20" @click="B_isShow">预览图形</el-button>
                  <div v-show="B_show">
                    <ve-pie :data="B_Data" ref="chart2"></ve-pie>
                  </div>
                </div>
                <div>
                  <el-checkbox label="地图" class="w100">地图</el-checkbox>
                  <el-button size="small" class="ml-20">预览图形</el-button>
                </div>
                <div>
                  <el-checkbox label="混搭" class="w100">混搭</el-checkbox>
                  <el-button size="small" class="ml-20">预览图形</el-button>
                </div>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="last3">上一步</el-button>
        <el-button type="primary" @click="next3">确 定</el-button>
      </span>
    </el-dialog>
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
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        })
      }
      return data
    }
    return {
      dy: '取消订阅',
      msg: '123',
      loading:true,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      companyOptions:[],
      historyTableColumnHeader: [],
      tableId: 'product',
      ruleForm: {
        companyName: '',
        time:'',
        date1: '',
        date2: '',
        input: ''
      },
      ruleFormModule: {
        name: '',
        rq: '',
        date1: '',
        date2: '',
        checkList: ['柱状图'],
        gs: '',
        dq: '',
        fl: '',
        bm: '',
        md: '',
        data: generateData(),
        value: [],
        typeRadio: 1,
        tree_bm: [
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
        defaultProps_bm: {
          children: 'children',
          label: 'label'
        },
        cp: '',
        cp_options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        cp2: '',
        cp_options2: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        tree_zb: [
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
        defaultProps_zb: {
          children: 'children',
          label: 'label'
        },
        zb: '',
        zb_options: [
          {
            label: '销售',
            options: [
              {
                value: 'Shanghai',
                label: '上海'
              }, {
                value: 'Beijing',
                label: '北京'
              }
            ]
          },
          {
            label: '财务',
            options: [
              {
                value: 'Chengdu',
                label: '成都'
              }, {
                value: 'Shenzhen',
                label: '深圳'
              }, {
                value: 'Guangzhou',
                label: '广州'
              }, {
                value: 'Dalian',
                label: '大连'
              }
            ]
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        rq: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        gs: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        dq: [
          { required: true, message: '请选择类型', trigger: 'check' }
        ],
        fl: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        bm: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        cp: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        zb: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]
      },
      data: [
        {
          id: 'product',
          label: '收入产品表',
          children: []
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
          zip: 200333,
          dy: '订阅'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333,
          dy: '订阅'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333,
          dy: '订阅'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333,
          dy: '取消订阅'
        }
      ],
      Z_show: false,
      Z_Data: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      B_show: false,
      B_Data: {
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
      }
    }
  },
  methods: {
    next () {
      this.dialogVisible = false
      this.dialogVisible2 = true
    },
    next2 () {
      this.dialogVisible2 = false
      this.dialogVisible3 = true
    },
    next3 () {
      this.dialogVisible3 = false
    },
    last2 () {
      this.dialogVisible2 = false
      this.dialogVisible = true
    },
    last3 () {
      this.dialogVisible3 = false
      this.dialogVisible2 = true
    },
    onSubmit () {
      this.dialogVisible = true
    },
    handleClick (row) {
      console.log(row)
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleClose2 () {
      this.dialogVisible2 = false
    },
    handleClose3 () {
      this.dialogVisible3 = false
    },
    change_dy (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    Z_isShow () {
      let vm = this
      if (this.Z_show !== !this.Z_show) {
        this.Z_show = !this.Z_show
      }
      if (this.Z_show) {
        this.$nextTick(_ => {
          vm.$refs.chart1.echarts.resize()
        })
      }
    },
    B_isShow () {
      let vm = this
      if (this.B_show !== !this.B_show) {
        this.B_show = !this.B_show
      }
      if (this.B_show) {
        this.$nextTick(_ => {
          vm.$refs.chart2.echarts.resize()
        })
      }
    },
    //数据导出方法
    export2Excel(lister) {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../vendor/Export2Excel');
        const tHeader = ['国家','学院', '合作机构', '负责人姓名', '电话','邮箱','启动日期','邮寄地址']; //对应表格输出的title
        const filterVal = ['city','name', 'address', 'people', 'phone','mailbox', 'runTime','yjdz']; // 对应表格输出的数据
        const list = lister;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '数据分析列表excel'); //对应下载文件的名字
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    /**
     * 左侧树状菜单点击事件的方法
     * @param data
     */
    handleNodeClick (data) {
      this.tableId = data.id;
      this.getHistoryTableHeader();
    },
    /**
     * 获取树状菜单的内容
     */
    getTreeData () {
      let vm = this;
      vm.$store.dispatch('HISTORY_TREE').then((res, req)=>{
        if(res.data.length > 0) {
          vm.data = vm.data.concat(res.data)
        }
      }).catch(error => {
          console.error(error)
      });
    },
    getCompanysData () {
      let vm = this;
      vm.$store.dispatch('GET_HISTORY_COMPANY').then((res, req)=>{
        if(res.data.length > 0) {
          vm.companyOptions = res.data
        }
      }).catch(error => {
        console.error(error)
      });
    },
    getHistoryTableHeader () {
      let vm = this
      vm.loading = true
      let param = vm.tableId
      vm.$store.dispatch('GET_HISTORY_NOTES_BY_TABLE_NAME', {param}).then((res, req)=>{
        if(res.length > 0) {
          vm.historyTableColumnHeader = res
          vm.getHistoryTableContent()
          vm.$nextTick(() => {
            vm.loading = false
          })
        }
      }).catch(error => {
        console.error(error)
      });
    },
    getHistoryTableContent () {
      let vm = this
      let param = {
          id: vm.tableId,
          company: vm.ruleForm.companyName || ''
      }
      vm.$store.dispatch('GET_HISTORY_INFO_BY_TABLE_NAME', {param}).then((res, req)=>{
        if(res.length > 0) {
          vm.tableData = res;
        }else{
          vm.tableData = []
        }
      }).catch(error => {
        console.error(error)
      });
    },
    timeChange(val){
      this.ruleForm.date1 = val[0]
      this.ruleForm.date2 = val[1]
    }
  },
  created () {
  },
  mounted () {
      this.getTreeData()
      this.getCompanysData()
      this.getHistoryTableHeader()
  }
}
</script>
<style scoped lang="scss">
  .join-btn{
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
