
<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline"  v-if="$store.getters.getPermissions.indexOf('queryHistoricalData')>-1">
        <el-form-item label="公司名称" class="no-mb ml-10">
          <el-select size="small" v-model="ruleForm.companyName" @change="selectChange" placeholder="请选择公司">
            <el-option
              v-for="item in companyOptions"
              :key="'opt' + item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
          <el-button class="qx pull-right" v-if="$store.getters.getPermissions.indexOf('exportHistoricalData')>-1" size="small" @click="export2Excel(tableData)">导出</el-button>
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
              :page-size=pageSize
              layout="total, prev, pager, next"
              :total=totalCount>
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

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
      pageNum:1,
      pageSize:10,
      totalCount:0,
      companyOptions:[],
      historyTableColumnHeader: [],
      tableId: 'product',
      ruleForm: {
        companyName: '',
        time:'',
        input: ''
      },
      ruleFormModule: {
        name: '',
        rq: '',
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
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        rq: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        gs: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
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
    }
  },
  methods: {
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
      let param = {}
      let header = {
        accessToken: sessionStorage.getItem('accessToken'),
        projectId: sessionStorage.getItem('projectId')
      }
      vm.$store.dispatch('HISTORY_TREE', {param,header}).then((res, req)=>{
        if(res.data.length > 0) {
          vm.data = vm.data.concat(res.data)
        }
      }).catch(error => {
          console.error(error)
      });
    },
    getCompanysData () {
      let vm = this;
      let param = {}
      let header = {
        accessToken: sessionStorage.getItem('accessToken'),
        projectId: sessionStorage.getItem('projectId')
      }
      vm.$store.dispatch('GET_HISTORY_COMPANY', {param,header}).then((res, req)=>{
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
      let header = {
        accessToken: sessionStorage.getItem('accessToken'),
        projectId: sessionStorage.getItem('projectId')
      }
      vm.$store.dispatch('GET_HISTORY_NOTES_BY_TABLE_NAME', {param,header}).then((res, req)=>{
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
          company: vm.ruleForm.companyName || '',
          pageNum: vm.pageNum,
          pageSize: vm.pageSize
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken'),
        projectId: sessionStorage.getItem('projectId')
      }
      vm.$store.dispatch('GET_HISTORY_INFO_BY_TABLE_NAME', {param,header}).then((res, req)=>{
        console.log(res.data)
        vm.totalCount = res.data.pop().totalNum
        if(res.code === 16000003){
          vm.tableData = res.data;
        }else{
          vm.tableData = []
          console.log('接口错误')
        }
      }).catch(error => {
        console.error(error)
      });
    },
    /*下拉菜单选择以后查询数据*/
    selectChange(){
      this.getHistoryTableContent()
    },
    /*分页点击查询*/
    handleSizeChange (val) {
      this.pageNum = val
      this.getHistoryTableContent()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getHistoryTableContent()
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
