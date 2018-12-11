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
          prop="statistical_name"
          label="统计表名称">
        </el-table-column>
        <el-table-column
          prop="creation_time"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="date_range"
          label="统计日期">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="统计目的">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人员">
        </el-table-column>
        <el-table-column
          prop="likeCount"
          label="点赞统计">
          <template slot-scope="scope">
            <span class="iconfont icon-chakanyanjingshishifenxi icon-green"></span>
            <span class="mr-10">{{scope.row.likeCount}}</span>
            <span class="iconfont icon-shoucang3 icon-red"></span>
            <span class="mr-10">{{scope.row.subscibeCount}}</span>
          </template>
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
      <el-form :model="formData1" :rules="rules" ref="formData1" label-width="120px" class="demo-ruleForm">
        <el-form-item label="统计表名称" prop="statisticalName">
          <el-col :span="20">
            <el-input v-model="formData1.statisticalName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="统计目的" prop="remarks">
          <el-col :span="20">
            <el-input type="textarea" v-model="formData1.remarks"></el-input>
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
      <el-form :model="formData2" :rules="rules" ref="formData2" label-width="120px" class="demo-ruleForm">
        <el-form-item label="选择日期" required>
          <el-col :span="9">
            <el-form-item prop="date1">
              <el-date-picker
                size="small"
                :type="formData2T.dateType[formData2.dateType-1].type"
                placeholder="选择开始日期"
                :format="formData2T.dateType[formData2.dateType-1].format"
                :value-format="formData2T.dateType[formData2.dateType-1].value_format"
                v-model="formData2.date1"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">至</el-col>
          <el-col :span="9">
            <el-form-item prop="date2">
              <el-date-picker
                size="small"
                :type="formData2T.dateType[formData2.dateType-1].type"
                placeholder="选择结束日期"
                :format="formData2T.dateType[formData2.dateType-1].format"
                :value-format="formData2T.dateType[formData2.dateType-1].value_format"
                v-model="formData2.date2"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-radio-group v-model="formData2.dateType" @change="changeDate">
                <el-radio label="1">天</el-radio>
                <el-radio label="2">月</el-radio>
                <el-radio label="3">季</el-radio>
                <el-radio label="4">年</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="选择公司" prop="companys">
          <el-transfer
            v-model="formData2.companys"
            :titles="['全部','全部']"
            :data="formData2T.companyTransfer"></el-transfer>
        </el-form-item>
        <el-form-item label="部门">
          <el-tree
            v-model="formData2.departments"
            :data="formData2T.departmentTree"
            show-checkbox
            node-key="id">
          </el-tree>
        </el-form-item>
        <el-form-item label="产品" prop="products">
          <el-select style="width: 80%;" v-model="formData2.products" class="mb-20" size="small" multiple filterable placeholder="请选择">
            <el-option
              v-for="item in formData2T.productsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
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
      <el-form :model="formData3" :rules="rules" ref="formData3" label-width="120px" class="demo-ruleForm">
        <el-form-item label="逻辑指标库" prop="indicatorIndex">
          <el-select v-model="formData3.indicatorIndex" placeholder="请选择逻辑指标库">
            <el-option-group
              v-for="group in formData3T.typeArr"
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
        <el-form-item label="展现方式" prop="atlas">
          <el-col :span="24">
            <el-form-item>
              <el-checkbox-group v-model="formData3.atlas">
                <div>
                  <el-checkbox label="1" name="atlas" class="w100">柱状图</el-checkbox>
                  <el-button size="small" class="ml-20" @click="barShow">预览图形</el-button>
                </div>
                <div>
                  <el-checkbox label="3" name="atlas" class="w100">饼状图</el-checkbox>
                  <el-button size="small" class="ml-20" @click="pieShow">预览图形</el-button>
                </div>
                <div>
                  <el-checkbox label="2" name="atlas" class="w100">折现图</el-checkbox>
                  <el-button size="small" class="ml-20" @click="lineShow">预览图形</el-button>
                  <div>
                  </div>
                </div>
                <div>
                  <el-checkbox label="4" name="atlas" class="w100">组合图</el-checkbox>
                  <el-button size="small" class="ml-20" @click="mingleShow">预览图形</el-button>
                  <div>

                  </div>
                </div>
              </el-checkbox-group>
              <bar-chart ref="bar" class="mb-10" :data="chartData" v-if="barFlag"></bar-chart>
              <pie-chart ref="pie" class="mb-10" :data="chartData" v-if="pieFlag"></pie-chart>
              <line-chart ref="line" class="mb-10" :data="chartData" v-if="lineFlag"></line-chart>
              <mingle-chart ref="mingle" class="mb-10" :data="chartData" v-if="mingleFlag"></mingle-chart>
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
      return {
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        updateDialogVisible: false,
        deleteDialogVisible: false,
        deleteId: '',
        formData1: {
          remarks: '',
          statisticalName: ''
        },
        formData2: {
          date1: '',
          date2: '',
          companys: [],
          departments: [],
          products: [],
          dateType: '1'
        },
        formData2T: {
          dateType: [{
            type: 'date',
            format: 'yyyy 年 MM 月 dd 日',
            value_format: 'yyyy-MM-dd'
          },{
            type: 'month',
            format: 'yyyy 年 MM 月',
            value_format: 'yyyy-MM'
          },{
            type: 'quarter',
            format: 'yyyy 年 M 季',
            value_format: 'yyyy-M'
          },{
            type: 'year',
            format: 'yyyy 年',
            value_format: 'yyyy'
          }],
          companyTransfer: [],
          departmentsTree: [],
          productsArr: [],
        },
        formData3: {
          indicatorIndex: '',
          atlas: []
        },
        formData3T: {
          typeArr: [],
          typeOld: {}
        },
        updateForm: {
          id: '',
          info_name: '',
          data_type: '',
          describe_info: '',
          weightiness: ''
        },
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
          data: this.generateData([]),
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
          statisticalName: [
            { required: true, message: '请输入统计表名称', trigger: 'blur' }
          ],
          remarks: [
            { min: 10, max: 200, message: '统计目的长度应在10到200个字符内', trigger: 'blur' }
          ],
          date1: [
            { required: true, message: '请选择开始日期', trigger: 'change' }
          ],
          date2: [
            { required: true, message: '请选择结束日期', trigger: 'change' }
          ],
          companys: [
            { type: 'array', required: true, message: '请选择公司', trigger: 'change' }
          ],
          products: [
            { type: 'array', max: 6, message: '最多选择6款产品', trigger: 'change' }
          ],
          indicatorIndex: [
            { required: true, message: '请选择逻辑指标库', trigger: 'change' }
          ],
          atlas: [
            { type: 'array', required: true, message: '请至少选择一种展现方式', trigger: 'change' }
          ]
        },
        tableData: [],
        barFlag: false,
        chartData: {
          "全部产品^2016^阿斯顿^全部部门": 10000,
          "全部产品1^2016^正大天晴^全部部门": 1300,
          "全部产品1^2017^正大天晴^全部部门": 1000,
          "全部产品1^2017^阿斯顿1^全部部门": 50000
        },
        pieFlag: false,
        lineFlag: false,
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
      generateData(companyArr){
        const data = []
        if( companyArr && companyArr.length>0){
          for (let item in companyArr) {
            data.push({
              key: `${companyArr[item].code}`,
              label: `${companyArr[item].companyName}`
            })
          }
        }
        return data
      },
      next () {
        let _this = this
        this.$refs['formData1'].validate((valid) => {
          if (valid) {
            _this.$nextTick(() => {
              _this.getCompanysArr()
              _this.dialogVisible = false
              _this.dialogVisible2 = true
            })
          } else {
            console.log('error submit!')
          }
        })
      },
      next2 () {
        let _this = this
        _this.$refs['formData2'].validate((valid) => {
          if (valid) {
            _this.$nextTick(() => {
              _this.getNormSelect()
              _this.dialogVisible2 = false
              _this.dialogVisible3 = true
            })
          } else {
            console.log('error submit!')
          }
        })
      },
      next3 () {
        let _this = this
        _this.$refs['formData3'].validate((valid) => {
          if (valid) {
            _this.createNorm ()
          } else {
            console.log('error submit!')
          }
        })
      },
      changeDate(){
        let _this = this
        _this.formData2.date1 = ''
        _this.formData2.date2 = ''
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
        vm.$refs['formData3'].validate((valid) => {
          if (valid) {
            vm.barFlag = !vm.barFlag
            if (vm.barFlag) {
              vm.pieFlag = false
              vm.lineFlag = false
              vm.mingleFlag = false
              vm.previewChart()
              vm.$nextTick(_ => {
                vm.$refs.bar.resizeChart();
              })
            }
          } else {
            console.log('error submit!')
          }
        })
      },
      pieShow () {
        let vm = this
        vm.$refs['formData3'].validate((valid) => {
          if (valid) {
            vm.pieFlag = !vm.pieFlag
            if (vm.pieFlag) {
              vm.barFlag = false
              vm.lineFlag = false
              vm.mingleFlag = false
              vm.previewChart()
              vm.$nextTick(_ => {
                vm.$refs.pie.resizeChart()
              })
            }
          } else {
            console.log('error submit!')
          }
        })
      },
      lineShow () {
        let vm = this
        vm.$refs['formData3'].validate((valid) => {
          if (valid) {
            vm.lineFlag = !vm.lineFlag
            if (vm.lineFlag) {
              vm.pieFlag = false
              vm.barFlag = false
              vm.mingleFlag = false
              vm.previewChart()
              vm.$nextTick(_ => {
                vm.$refs.line.resizeChart()
              })
            }
          } else {
            console.log('error submit!')
          }
        })
      },
      mingleShow(){
        let vm = this
        vm.$refs['formData3'].validate((valid) => {
          if (valid) {
            vm.mingleFlag = !vm.mingleFlag
            if (vm.mingleFlag) {
              vm.pieFlag = false
              vm.lineFlag = false
              vm.barFlag = false
              vm.previewChart()
              vm.$nextTick(_ => {
                vm.$refs.mingle.resizeChart()
              })
            }
          } else {
            console.log('error submit!')
          }
        })
      },
      /*新建指标*/
      createNorm (){
        let _this = this
        /**
         * 处理第二页的数据
         */
        let searchCondition = {
          dateRange: '',
          companys: '',
          departments: '',
          products: ''
        }
        searchCondition.dateRange = _this.formData2.date1 + '&' + _this.formData2.date2
        searchCondition.companys = _this.formData2.companys.join(',') || ''
        searchCondition.departments = _this.formData2.departments.join(',') || ''
        searchCondition.products = _this.formData2.products.join(',') || ''
        searchCondition = JSON.stringify(searchCondition)
        /**
         * 请求头的数据拼接
         * @type {{accessToken}}
         */
        let header = {
          accessToken: sessionStorage.getItem('accessToken')
        }
        /**
         * 请求传递的参数整理
         * @type {{statisticalName: string, remarks: string, searchCondition: {dateRange: string, companys: string, departments: string, products: string}, indicatorIndex: string, indicatorName: string, type: number, atlas: string}}
         */
        let param = {
          //private Integer id  				//主键
          //"cpcc":"002", 					//公司编码
          searchCondition: '',    //检索条件
          indicatorIndex: '', 		//指标索引
          indicatorName: '', 		//指标名称
          type: 1, 							//数据类型;1:财务
          atlas: '', 					  //展现图集;1: 柱状图;2:折线图;3:饼状图;4:组合图
          //"ifPublish":"默认未发布",			//是否发布;0:未发布;1:发布
          //"creator":"343433535"				//创建人    accountId
          //"creationTime":"自动维护"			//创建时间
        }
        param.searchCondition = searchCondition
        param.atlas = _this.formData3.atlas.join(',') || ''
        param.indicatorIndex = _this.formData3.indicatorIndex || ''
        param.indicatorName = _this.formData3T.typeOld[_this.formData3.indicatorIndex] || ''
        param = Object.assign({}, param, _this.formData1)
        _this.$store.dispatch('NEW_NORM', {param, header}).then(res => {
          _this.$notify({
            title: '提示信息',
            message: res == 0 ? '新建指标成功' : '新建指标失败',
            type: res == 0 ? 'success' : 'error',
            duration: '1000'
          })
          if(res == 0){
            _this.dialogVisible3 = false
            _this.getNormTable()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 预览图表的方法
       */
      previewChart (){
        let _this = this
        /**
         * 处理第二页的数据
         */
        let searchCondition = {
          dateRange: '',
          companys: '',
          departments: '',
          products: ''
        }
        searchCondition.dateRange = _this.formData2.date1 + '&' + _this.formData2.date2
        searchCondition.companys = _this.formData2.companys.join(',') || ''
        searchCondition.departments = _this.formData2.departments.join(',') || ''
        searchCondition.products = _this.formData2.products.join(',') || ''
        searchCondition = JSON.stringify(searchCondition)
        /**
         * 请求头的数据拼接
         * @type {{accessToken}}
         */
        let header = {
          accessToken: sessionStorage.getItem('accessToken')
        }
        /**
         * 请求传递的参数整理
         * @type {{statisticalName: string, remarks: string, searchCondition: {dateRange: string, companys: string, departments: string, products: string}, indicatorIndex: string, indicatorName: string, type: number, atlas: string}}
         */
        let param = {
          //private Integer id  				//主键
          //"cpcc":"002", 					//公司编码
          searchCondition: '',    //检索条件
          indicatorIndex: '', 		//指标索引
          indicatorName: '', 		//指标名称
          type: 1, 							//数据类型;1:财务
          atlas: '', 					  //展现图集;1: 柱状图;2:折线图;3:饼状图;4:组合图
          //"ifPublish":"默认未发布",			//是否发布;0:未发布;1:发布
          //"creator":"343433535"				//创建人    accountId
          //"creationTime":"自动维护"			//创建时间
        }
        param.searchCondition = searchCondition
        param.atlas = _this.formData3.atlas.join(',') || ''
        param.indicatorIndex = _this.formData3.indicatorIndex || ''
        param.indicatorName = _this.formData3T.typeOld[_this.formData3.indicatorIndex] || ''
        param = Object.assign({}, param, _this.formData1)
        _this.$store.dispatch('PREVIEW_NORM', {param, header}).then(res => {
          if(res != 1){
            console.log(res)
            _this.chartData = res
          }else{
            _this.$notify({
              title: '提示信息',
              message:'预览图表失败',
              type: 'error',
              duration: '1000'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 获取公司的列表
       */
      getCompanysArr(){
        let _this = this
        if(_this.$store.state.companyArr.length == 0){
          let param = {
            type: 0
          }
          let header = {
            accessToken: sessionStorage.getItem('accessToken'),
            accessId: sessionStorage.getItem('accessId')
          }
          _this.$store.dispatch('PROVIDER_MANAGE', {param, header}).then(res=>{
            let companyArr = _this.generateData(res.data.data)
            _this.$store.dispatch('SET_COMPANY_STATE',{companyArr})
            _this.formData2T.companyTransfer = companyArr
          }).catch(error=>{
              console.log(error)
          })
        }
        _this.formData2T.companyTransfer = _this.$store.state.companyArr
      },
      /*获取逻辑指标库下拉菜单*/
      getNormSelect(){
        let _this = this
        if(_this.formData3T.typeArr.length == 0){
          let header = {}
          let param = {
            type:'财务'
          }
          _this.$store.dispatch('GET_NORM_SELECT', {param, header}).then(res => {
            if(res.status === 200){
              _this.formData3T.typeOld = res.data
              _this.formData3T.typeArr.push({
                label: param.type,
                options: []
              })
              for(var key in res.data){
                _this.formData3T.typeArr[0].options.push({
                  value: key,
                  label: res.data[key]
                })
              }
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      /*表格回显*/
      getNormTable(){
        let _this = this
        let header = {
        }
        let param = {
          accountId: sessionStorage.getItem('accountId'),
          startTime: _this.ruleForm.start,
          endTime: _this.ruleForm.end,
          indexName: _this.ruleForm.infoName
        }
        _this.$store.dispatch('GET_NORM_TABLE', {param, header}).then(res => {
          if(res.status === 200){
            _this.tableData = []
            for(let i=0;i<res.data.length;i++){
              _this.tableData.push({
                statistical_name: res.data[i].statistical_name,
                creation_time: res.data[i].creation_time,
                date_range: res.data[i].dateRange,
                remarks: res.data[i].remarks,
                creator: res.data[i].creatorName,
                likeCount: res.data[i].likeCount,
                subscibeCount: res.data[i].subscibeCount,
                fb:res.data[i].creatorResult == 1 ? true : false,
                qxfb:res.data[i].creatorResult == 1 ? false : true,
                dy:res.data[i].resultType == 1 ? false : true,
                qxdy:res.data[i].resultType == 1 ? true : false,
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
      /*删除订阅指标*/
      deleteNorm(row){
        let vm = this
        alert(1)
        let header = {}
        let param = {
          account_id: sessionStorage.getItem('accountId'),
          id:row.id
        }
        this.$store.dispatch('DELETE_INDICATORS', {param, header}).then(res => {
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
      this.getNormTable()
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
  td{
    span{
      display: inline-block;
      vertical-align: middle;
    }
  }
  .center-form{
    text-align: center;
  }
</style>
