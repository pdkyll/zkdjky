<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm">
        <el-form-item class="no-mb ml-10" label="日期">
          <el-date-picker
            v-model="ruleForm.time"
            type="daterange"
            value-format="yyyy-MM-dd"
            @change="timeChange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="no-mb" label="名称">
          <el-input
            size="small"
            placeholder="输入名称"
            style="width: 100%"
            @change="infoChange"
            v-model="ruleForm.infoName">
          </el-input>
        </el-form-item>
        <el-form-item class="pull-right no-mb">
          <el-button class="join-btn" size="small" @click="onSubmit">
            <i class="el-icon-plus"></i>
            新建指标
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt-20">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="cpcc"
          label="公司名称">
        </el-table-column>
        <el-table-column
          prop="creation_time"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="creation_time"
          label="统计日期">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="统计目的">
        </el-table-column>
        <el-table-column
          prop="createor"
          label="创建人员">
        </el-table-column>
        <el-table-column
          prop="likeCount"
          label="点赞统计">
        </el-table-column>
        <el-table-column
          prop="subscibeCount"
          label="订阅统计">
        </el-table-column>
        <el-table-column
          :resizable=false
          label="操作"
          align
          width="200">
          <template slot-scope="scope">
               <el-button type="text" v-show="scope.row.fb" @click="publishNorm(scope.row)" size="small">发布</el-button><!--
            --><el-button type="text" v-show="scope.row.qxfb" @click="unPublishNorm(scope.row)" size="small">取消发布</el-button><!--
            --><el-button type="text" v-show="scope.row.dy" @click="subscriberNorm(scope.row)" size="small">订阅</el-button><!--
            --><el-button type="text" v-show="scope.row.qxdy" @click="un_SubscriberNorm(scope.row)" size="small">取消订阅</el-button><!--
            --><el-button type="text" v-show="scope.row.sc" @click="deleteNorm(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="fy-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>-->
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
              :key="group.value"
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
                  <el-button size="small" class="ml-20" @click="barShow">预览图形</el-button>
                  <div style="width: 500px" v-show="barFlag">
                    <bar-chart ref="bar" class="mb-10" :data="barData"></bar-chart>
                  </div>
                </div>
                <div>
                  <el-checkbox label="饼状图" class="w100">饼状图</el-checkbox>
                  <el-button size="small" class="ml-20" @click="pieShow">预览图形</el-button>
                  <div v-show="pieFlag">
                    <pie-chart ref="pie" class="mb-10" :data="pieData"></pie-chart>
                  </div>
                </div>
                <div>
                  <el-checkbox label="折现图" class="w100">折现图</el-checkbox>
                  <el-button size="small" class="ml-20" @click="lineShow">预览图形</el-button>
                  <div v-show="lineFlag">
                    <line-chart ref="line" class="mb-10" :data="lineData"></line-chart>
                  </div>
                </div>
                <div>
                  <el-checkbox label="组合图" class="w100">组合图</el-checkbox>
                  <el-button size="small" class="ml-20" @click="mingleShow">预览图形</el-button>
                  <div v-show="mingleFlag">
                    <mingle-chart ref="mingle" class="mb-10" :data="mingleData"></mingle-chart>
                  </div>
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
  import barChart from '../../components/panel/barChart.vue'
  import pieChart from '../../components/panel/pieChart.vue'
  import lineChart from '../../components/panel/lineChart.vue'
  import mingleChart from '../../components/panel/mingleChart.vue'
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
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        updateDialogVisible: false,
        deleteDialogVisible: false,
        deleteId: '',
        updateForm: {
          id: '',
          info_name: '',
          data_type: '',
          describe_info: '',
          weightiness: ''
        },
        fileList: [
//        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        msg: '123',
        ruleForm: {
          time: '',
          start:'',
          end:'',
          infoName: ''
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
              label: '财务',
              options: []
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
        tableData: [],
        barFlag: false,
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
        pieFlag: false,
        pieData:{
          name:['直接访问','邮件营销', '联盟广告','视频广告','搜索引擎'],
          count:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ]
        },
        lineFlag: false,
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
        mingleFlag: false,
        mingleData:{}
      }
    },
    components: {
      barChart,
      pieChart,
      lineChart,
      mingleChart
    },
    methods: {
      next () {
        this.dialogVisible = false
        this.dialogVisible2 = true
      },
      next2 () {
        this.dialogVisible2 = false
        this.dialogVisible3 = true
        this.getNormSelect()
      },
      next3 () {
        this.dialogVisible3 = false
        this.createNorm ()
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
      /*预览图标的隐藏展示*/
      barShow () {
        let vm = this
        if (this.barFlag !== !this.barFlag) {
            vm.barFlag = !vm.barFlag
        }
        if (this.barFlag) {
          vm.pieFlag = false
          vm.lineFlag = false
          vm.mingleFlag = false
          this.$nextTick(_ => {
            this.$refs.bar.resizeChart();
          })
        }
      },
      pieShow () {
        let vm = this
        if (this.pieFlag !== !this.pieFlag) {
          this.pieFlag = !this.pieFlag
        }
        if (this.pieFlag) {
          vm.barFlag = false
          vm.lineFlag = false
          vm.mingleFlag = false
          this.$nextTick(_ => {
            this.$refs.pie.resizeChart()
          })
        }
      },
      lineShow () {
        let vm = this
        if (this.lineFlag !== !this.lineFlag) {
          this.lineFlag = !this.lineFlag
        }
        if (this.lineFlag) {
          vm.pieFlag = false
          vm.barFlag = false
          vm.mingleFlag = false
          this.$nextTick(_ => {
            this.$refs.line.resizeChart()
          })
        }
      },
      mingleShow(){
        let vm = this
        if (this.mingleFlag !== !this.mingleFlag) {
          this.mingleFlag = !this.mingleFlag
        }
        if (this.mingleFlag) {
          vm.pieFlag = false
          vm.lineFlag = false
          vm.barFlag = false
          this.$nextTick(_ => {
            this.$refs.mingle.resizeChart()
          })
        }
      },
      /*新建指标*/
      createNorm (){
        let _this = this
        var searchCondition = JSON.stringify({
          "dateRange": "",
          "companys": "",
          "departments": "",
          "products": ""
        });
        let header = {
          accessToken: sessionStorage.getItem('accessToken')
        }
        let param = {
          //private Integer id  				//主键
          "cpcc":"002", 					//公司编码
          "statisticalName": "testName", 		//名称
          "remarks": "测试插入数据", 			//备注
          "searchCondition": searchCondition, //检索条件
          "indicatorIndex": "指标索引2", 		//指标索引
          "indicatorName": "指标名称2", 		//指标名称
          "type": 1, 							//数据类型;1:财务
          "atlas": "1,2", 					//展现图集;1: 柱状图;2:折线图;3:饼状图;4:组合图
          //"ifPublish":"默认未发布",			//是否发布;0:未发布;1:发布
          "creator":"343433535"				//创建人    accountId
          //"creationTime":"自动维护"			//创建时间
        }
        _this.$store.dispatch('NEW_NORM', {param, header}).then(res => {
          if(res.status === 200 && res.data.length >= 0){
            console.log(res)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /*获取逻辑指标库下拉菜单*/
      getNormSelect(){
        let _this = this
        let header = {}
        let param = {
          type:'财务'
        }
        _this.$store.dispatch('GET_NORM_SELECT', {param, header}).then(res => {
          if(res.status === 200){
            for(var key in res.data){
              _this.ruleFormModule.zb_options[0].options.push({
                value: key,
                label: res.data[key]
              })
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /*表格回显*/
      getNormTable(startTime,endTime,name){
        console.log(startTime,endTime,name)
        let _this = this
        let header = {
        }
        let param = {
          accountId: sessionStorage.getItem('accountId'),
          startTime:startTime,
          endTime:endTime,
          indexName:name
        }
        _this.$store.dispatch('GET_NORM_TABLE', {param, header}).then(res => {
          if(res.status === 200){
            _this.tableData = []
            console.log(res.data)
            for(let i=0;i<res.data.length;i++){
              _this.tableData.push({
                cpcc: res.data[i].cpcc,
                creation_time: res.data[i].creation_time,
                remarks: res.data[i].remarks,
                createor: res.data[i].createor,
                likeCount: res.data[i].likeCount,
                subscibeCount: res.data[i].subscibeCount,
                fb:res.data[i].creatorResult == 1 ? false:true,
                qxfb:res.data[i].creatorResult == 1 ? true:false,
                dy:res.data[i].resultType == 1 ? false:true,
                qxdy:res.data[i].resultType == 1 ? true:false,
                sc:true,
                id:res.data[i].id,
                type:res.data[i].type
              })
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      timeChange(val){
        let vm = this
        if(val == null){
          this.ruleForm.time=['','']
        }else{
          this.ruleForm.time=val
        }
        this.ruleForm.start =this.ruleForm.time[0]
        this.ruleForm.end =this.ruleForm.time[1]
        setTimeout(function () {
          vm.getNormTable(vm.ruleForm.start,vm.ruleForm.end,vm.ruleForm.infoName)
        },100)
      },
      infoChange(val){
        let vm = this
        this.ruleForm.infoName = val
        vm.getNormTable(vm.ruleForm.start,vm.ruleForm.end,vm.ruleForm.infoName)
      },
      /*发布指标*/
      publishNorm(row){
        let vm = this
        let header = {
        }
        let param = {
          account_id: sessionStorage.getItem('accountId'),
        }
        let urlData = row.id
        this.$store.dispatch('PUBLISH_NORM', {param, header, urlData}).then(res => {
          console.log(res)
          if(res.status == 200){
            vm.getNormTable(vm.ruleForm.start,vm.ruleForm.end,vm.ruleForm.infoName)
          }
          vm.$notify({
            title: '提示信息',
            message: res.statusText,
            type: res.status === 200 ? 'success' : 'error',
            duration: '1000'
          })
        }).catch(error=>{
          console.error(error);
        })
      },
      /*取消发布指标*/
      unPublishNorm(row){
        let vm = this
        let header = {
        }
        let param = {
          account_id: sessionStorage.getItem('accountId'),
        }
        let urlData = row.id
        this.$store.dispatch('UN_PUBLISH_NORM', {param, header, urlData}).then(res => {
          console.log(res)
          if(res.status == 200){
            vm.getNormTable(vm.ruleForm.start,vm.ruleForm.end,vm.ruleForm.infoName)
          }
          vm.$notify({
            title: '提示信息',
            message: res.statusText,
            type: res.status === 200 ? 'success' : 'error',
            duration: '1000'
          })
        }).catch(error=>{
          console.error(error);
        })
      },
      /*订阅指标*/
      subscriberNorm(row){
        let vm = this
        let header = {}
        let param = {
          account_id: sessionStorage.getItem('accountId'),
          data_id:row.id,
          type:row.type
        }
        this.$store.dispatch('SUBSCRIBER_NORM', {param, header}).then(res => {
          console.log(res)
          if(res.status == 200){
            vm.getNormTable(vm.ruleForm.start,vm.ruleForm.end,vm.ruleForm.infoName)
          }
          vm.$notify({
            title: '提示信息',
            message: res.statusText,
            type: res.status === 200 ? 'success' : 'error',
            duration: '1000'
          })
        }).catch(error=>{
          console.error(error);
        })
      },
      /*取消订阅指标*/
      un_SubscriberNorm(row){
        let vm = this
        let header = {}
        let param = {
          account_id: sessionStorage.getItem('accountId'),
          data_id:row.id,
          type:row.type
        }
        this.$store.dispatch('UN_SUBSCRIBER_NORM', {param, header}).then(res => {
          console.log(res)
          if(res.status == 200){
            vm.getNormTable(vm.ruleForm.start,vm.ruleForm.end,vm.ruleForm.infoName)
          }
          vm.$notify({
            title: '提示信息',
            message: res.statusText,
            type: res.status === 200 ? 'success' : 'error',
            duration: '1000'
          })
        }).catch(error=>{
          console.error(error);
        })
      },
      /*取消订阅指标*/
      deleteNorm(row){
        let vm = this
        alert(1)
        let header = {}
        let param = {
          account_id: sessionStorage.getItem('accountId'),
          id:row.id
        }
        this.$store.dispatch('DELETE_INDICATORS', {param, header}).then(res => {
          console.log(res)
          if(res.status == 200){
            vm.getNormTable(vm.ruleForm.start,vm.ruleForm.end,vm.ruleForm.infoName)
          }
          vm.$notify({
            title: '提示信息',
            message: res.statusText,
            type: res.status === 200 ? 'success' : 'error',
            duration: '1000'
          })
        }).catch(error=>{
          console.error(error);
        })
      },
    },
    created () {
      let vm = this
      vm.getNormTable(vm.ruleForm.start,vm.ruleForm.end,vm.ruleForm.infoName)
    },
    mounted () {

    }
  }
</script>
<style scoped lang="scss">
  .join-btn{
    width: 150px;
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
  .mr2{
    margin-right: 2px;
    &:last-child {
      margin-right: 0;
    }
  }
  .center-form{
    text-align: center;
  }
</style>
