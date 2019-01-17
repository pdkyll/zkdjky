<template>
  <div>
    <div class="shadow-box">
      <el-form :inline="true" :model="ruleForm">
        <el-form-item v-if="$store.getters.getPermissions.indexOf('queryFinancialIndex')>-1" class="ml-10 search" label="日期">
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
        <el-form-item class="search" v-if="$store.getters.getPermissions.indexOf('queryFinancialIndex')>-1" label="名称">
          <el-input
            size="small"
            placeholder="输入指标名称"
            style="width: 100%"
            @change="infoChange"
            v-model.trim="ruleForm.infoName">
          </el-input>
        </el-form-item>
        <el-form-item class="search" v-if="$store.getters.getPermissions.indexOf('queryFinancialIndex')>-1">
          <el-button type="primary" size="small" @click="searchList" class="green-btn">查询</el-button>
        </el-form-item>
        <el-form-item v-if="$store.getters.getPermissions.indexOf('addFinancialIndex')>-1" class="pull-right no-mb">
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
        v-loading="loading"
        :header-cell-style="{background:'#f0f1f1'}"
        style="width: 100%">
        <el-table-column
          prop="indicator_name"
          align="center"
          label="指标名称">
        </el-table-column>
        <el-table-column
          prop="creation_time"
          align="center"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="date_range"
          align="center"
          label="统计日期">
        </el-table-column>
        <el-table-column
          prop="remarks"
          align="center"
          label="统计目的">
        </el-table-column>
        <el-table-column
          prop="creator"
          align="center"
          label="创建人员">
        </el-table-column>
        <el-table-column
          prop="likeCount"
          align="center"
          label="指标关注度">
          <template slot-scope="scope">
            <span class="iconfont icon-chakanyanjingshishifenxi icon-green" :title="'订阅'+scope.row.subscibeCount+'人'"></span>
            <span class="mr-10">{{scope.row.subscibeCount}}</span>
            <span class="iconfont icon-shoucang3 icon-red" :title="'点赞'+scope.row.likeCount +'人'"></span>
            <span class="mr-10">{{scope.row.likeCount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable=false
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
               <el-button type="text" v-show="scope.row.fb" @click="publishNorm(scope.row)" size="small" v-if="$store.getters.getPermissions.indexOf('publishFinancialIndex')>-1">发布</el-button><!--
            --><el-button type="text" v-show="scope.row.qxfb" @click="unPublishNorm(scope.row)" size="small" v-if="$store.getters.getPermissions.indexOf('unpublishFinancialIndex')>-1">取消发布</el-button><!--
            --><el-button type="text" v-show="scope.row.dy" @click="subscriberNorm(scope.row)" size="small" v-if="$store.getters.getPermissions.indexOf('subscriptionFinancialIndex')>-1">订阅</el-button><!--
            --><el-button type="text" v-show="scope.row.qxdy" @click="un_SubscriberNorm(scope.row)" size="small" v-if="$store.getters.getPermissions.indexOf('unsubscribeFinancialIndex')>-1">取消订阅</el-button><!--
            --><el-button type="text" v-show="scope.row.sc" @click="deleteNorm(scope.row)" size="small" v-if="$store.getters.getPermissions.indexOf('delFinancialIndex')>-1">删除</el-button>
          </template>
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
        <el-form-item label="指标名称" prop="statisticalName">
          <el-col :span="20">
            <el-input v-model.trim="formData1.statisticalName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="统计目的">
          <el-col :span="20">
            <el-input type="textarea" v-model.trim="formData1.remarks"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
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
          <el-col :span="9" v-clickoutside="quarterStartClose">
            <el-form-item prop="date1">
              <el-date-picker
                size="small"
                v-if="formData2.dateType == 1 ||formData2.dateType == 2 ||formData2.dateType == 4  "
                :type="formData2T.dateType[formData2.dateType-1].type"
                placeholder="选择开始日期"
                :format="formData2T.dateType[formData2.dateType-1].format"
                :value-format="formData2T.dateType[formData2.dateType-1].value_format"
                v-model="formData2.date1"
                style="width: 100%;">
              </el-date-picker>
                <!--隐藏的季度选择-->
              <el-input
                placeholder="选择开始日期"
                size="small"
                v-if="formData2.dateType == 3"
                prefix-icon="el-icon-date"
                @focus="startFocus"
                v-model="formData2.date1">
              </el-input>
              <div class="quarter" v-if="startQuarter">
                <div class="quarterHeader">
                  <button type="button" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="startLeftSearch"></button>
                  <span role="button" class="el-date-picker__prev-btn el-date-picker__header-label">{{startQuarterYear}} 年</span>
                  <button type="button" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-right" @click="startRightSearch"></button>
                </div>
                <table class="el-month-table" style="margin: 0 auto">
                  <tbody>
                  <tr>
                    <td class="today" @click="change_start_quarter(1)">
                      <a class="cell">一季度</a>
                    </td>
                    <td class="" @click="change_start_quarter(2)">
                      <a class="cell">二季度</a>
                    </td>
                    <td class="" @click="change_start_quarter(3)">
                      <a class="cell">三季度</a>
                    </td>
                    <td class="" @click="change_start_quarter(4)">
                      <a class="cell">四季度</a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">至</el-col>
          <el-col :span="9" v-clickoutside="quarterEndClose">
            <el-form-item prop="date2">
              <el-date-picker
                size="small"
                v-if="formData2.dateType == 1 ||formData2.dateType == 2 ||formData2.dateType == 4  "
                :type="formData2T.dateType[formData2.dateType-1].type"
                placeholder="选择结束日期"
                :format="formData2T.dateType[formData2.dateType-1].format"
                :value-format="formData2T.dateType[formData2.dateType-1].value_format"
                v-model="formData2.date2"
                style="width: 100%;">
              </el-date-picker>
              <!--隐藏的季度选择-->
              <el-input
                placeholder="选择开始日期"
                size="small"
                v-if="formData2.dateType == 3"
                prefix-icon="el-icon-date"
                @focus="endFocus"
                v-model="formData2.date2">
              </el-input>
              <div class="quarter" v-if="endQuarter">
                <div class="quarterHeader">
                  <button type="button" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="endLeftSearch"></button>
                  <span role="button" class="el-date-picker__prev-btn el-date-picker__header-label">{{endQuarterYear}} 年</span>
                  <button type="button" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-right" @click="endRightSearch"></button>
                </div>
                <table class="el-month-table" style="margin: 0 auto">
                  <tbody>
                  <tr>
                    <td class="today" @click="change_end_quarter(1)">
                      <a class="cell">一季度</a>
                    </td>
                    <td class="" @click="change_end_quarter(2)">
                      <a class="cell">二季度</a>
                    </td>
                    <td class="" @click="change_end_quarter(3)">
                      <a class="cell">三季度</a>
                    </td>
                    <td class="" @click="change_end_quarter(4)">
                      <a class="cell">四季度</a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="选择公司" prop="cpccs">
          <el-transfer
            v-model="formData2.cpccs"
            :titles="['全部','全部']"
            :data="formData2T.companyTransfer">
          </el-transfer>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="last2">上一步</el-button>
        <el-button type="primary" @click="next2">下一步</el-button>
      </div>
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
          <el-select style="width:83.3333%" v-model="formData3.indicatorIndex" @change="indicatorChange" placeholder="请选择逻辑指标库">
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
        <el-form-item label="数据切分" required>
          <el-radio-group v-model="formData3.dataType" @change="changeData">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展现方式" prop="atlas">
          <el-col :span="24">
            <el-form-item>
              <el-checkbox-group v-model="formData3.atlas">
                <div>
                  <el-checkbox label="1" name="atlas" class="w100">柱状图</el-checkbox>
                  <el-button size="small" class="ml-20" v-loading="barLoading" @click="barShow">预览图形</el-button>
                </div>
                <div>
                  <el-checkbox label="3" name="atlas" class="w100">饼状图</el-checkbox>
                  <el-button size="small" class="ml-20" v-loading="pieLoading"  @click="pieShow">预览图形</el-button>
                </div>
                <div>
                  <el-checkbox label="2" name="atlas" class="w100">折现图</el-checkbox>
                  <el-button size="small" class="ml-20" v-loading="lineLoading" @click="lineShow">预览图形</el-button>
                </div>
                <div>
                  <el-checkbox label="4" name="atlas" class="w100">组合图</el-checkbox>
                  <el-button size="small" class="ml-20" v-loading="mingleLoading" @click="mingleShow">预览图形</el-button>
                </div>
              </el-checkbox-group>
              <bar-chart ref="bar" class="mb-10" :data="chartData" v-if="barFlag"></bar-chart>
              <bar-chart1 ref="bar1" class="mb-10" :data="chartData" v-if="barFlag1"></bar-chart1>
              <pie-chart ref="pie" class="mb-10" :data="chartData" v-if="pieFlag"></pie-chart>
              <line-chart ref="line" class="mb-10" :data="chartData" v-if="lineFlag"></line-chart>
              <mingle-chart ref="mingle" class="mb-10"  :data="chartData" v-if="mingleFlag"></mingle-chart>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="last3">上一步</el-button>
        <el-button type="primary" @click="next3" v-loading="submitting">确 定</el-button>
      </div>
    </el-dialog>
    <!--取消发布提示-->
    <el-dialog
      title="提示信息"
      :visible.sync="cancelNormDialog"
      width="30%"
      :before-close="cancelClose">
      <span>取消发布会同步取消订阅人对此条信息的订阅，是否确定取消发布？</span>
      <div slot="footer" class="dialog-footer">
    <el-button @click="cancelNormDialog = false">取 消</el-button>
    <el-button type="primary" @click="cancelNorm">确 定</el-button>
  </div>
    </el-dialog>
    <!--删除发布提示-->
    <el-dialog
      title="提示信息"
      :visible.sync="deleteNormDialog"
      width="30%"
      :before-close="deleteClose">
      <span>删除本条指标会同步删除订阅人对此条信息的订阅，是否确定删除此条指标？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteNormDialog = false">取 消</el-button>
    <el-button type="primary" @click="affirmDeleteNorm">确 定</el-button>
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
  const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
      function documentHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false;
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          binding.value(e);
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.__vueClickOutside__ = documentHandler;
      document.addEventListener('click', documentHandler);
    },
    unbind(el, binding) {
      // 解除事件监听
      document.removeEventListener('click', el.__vueClickOutside__);
      delete el.__vueClickOutside__;
    },
  };

  import barChart from '../../components/panel/barChart.vue'
  import barChart1 from '../../components/panel/barChartByCompany.vue'
  import pieChart from '../../components/panel/pieChart.vue'
  import lineChart from '../../components/panel/lineChart.vue'
  import mingleChart from '../../components/panel/mingleChart.vue'
  function ParseData(data) {
    var allCompany = {};
    for(var item in data){
      var arr = item.split('^');
      var product = arr[0],
        dateTime = arr[1],
        company = arr[2],
        department = arr[3],
        value = data[item];
      if(!allCompany.hasOwnProperty(company)){
        allCompany[company] = {};
        allCompany[company].allDepartment = new Set();
        allCompany[company].allDateTime = new Set();
        allCompany[company].allProducts = new Set();
        allCompany[company].allValues = new Map();
        allCompany[company].companyName = company;
      }
      if(!allCompany[company].allDateTime.has(dateTime)){
        allCompany[company].allDateTime.add(dateTime)
      }
      if(!allCompany[company].allDepartment.has(department)){
        allCompany[company].allDepartment.add(department)
      }
      if(!allCompany[company].allProducts.has(product)){
        allCompany[company].allProducts.add(product)
      }
      allCompany[company].allValues.set(dateTime +'_'+ department +'_'+ product, value);
    }

    for(var companyName in allCompany){
      let companyObj = allCompany[companyName];
      let companyResultArr = [];
      /*companyObj.allDateTime = companyObj.allDateTime.sort(function(item,item2){
        let itemTemp = new Date(item).getTime();
        let item2Temp = new Date(item2).getTime();
        return itemTemp-item2Temp
      })*/
      companyObj.allProducts.forEach(function (product_value, product_name) {
        companyObj.allDepartment.forEach(function (department_value, department_name) {
          let resultTempArr = [];
          companyObj.allDateTime.forEach(function (dateTime_value, dateTime_name) {
            resultTempArr.push(companyObj.allValues.get(dateTime_value +'_'+ department_value +'_'+ product_value));
          });
          companyResultArr.push({
            name: product_value,
            stack: department_value,
            type:'bar',
            barWidth : 20,
            data: resultTempArr
          });
        });
      });
      companyObj.result = companyResultArr;
      companyObj.allDepartment = Array.from(companyObj.allDepartment);
      companyObj.allDateTime = Array.from(companyObj.allDateTime);
      companyObj.allProducts = Array.from(companyObj.allProducts);
    }
    return allCompany
  }
  export default{
    data () {
      /*自定义新建统计表名称校验规则*/
      let statistical = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入指标名称'));
        } else if (value.length <2 ||value.length >20) {
          callback(new Error('长度在 2 到 40 个字符'));
        } else if (value !=='') {
            let _this = this
            let header = {
              accessToken: sessionStorage.getItem('accessToken'),
              projectId: sessionStorage.getItem('projectId')
            }
            let param = {
              statisticalName:value
            }
            _this.$store.dispatch('NAME_VALIDATOR', {param, header}).then(res => {
              if(res.data.code === 16000003){
                callback();
              }else{
                callback(new Error('指标名称已存在'));
              }
            }).catch(error => {
              console.log(error)
            })
        } else {
          callback();
        }
      }
      /*自定义时间校验，开始时间不能大于结束时间*/
      let date1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择开始日期'));
        } else if (value > this.formData2.date2) {
          if(this.formData2.date2 !== ''){
            callback(new Error('开始日期不能大于结束日期'));
          }else{
            callback();
          }
        } else {
          callback();
        }
      }
      let date2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择结束日期'));
        } else if (value < this.formData2.date1) {
          if(this.formData2.date1 !== ''){
            callback(new Error('结束日期不能小于开始日期'));
          }else{
            callback();
          }
        } else {
          callback();
        }
      }
      return {
        submitting:false,
        startQuarter:false,
        startQuarterYear:2018,
        endQuarter:false,
        endQuarterYear:2018,
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        cancelNormDialog:false,
        deleteNormDialog:false,
        rowId:'',
        loading:true,
        pageSize:10,
        pageNum:1,
        totalCount:0,
        deleteId: '',
        formData1: {
          remarks: '',
          statisticalName: ''
        },
        formData2: {
          date1: '',
          date2: '',
          cpccs: [],
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
          dataType:'0',
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
            { validator: statistical, trigger: 'blur' }
            /*{ required: true, message: '请输入统计表名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }*/
          ],
          remarks: [
            { min: 10, max: 200, message: '统计目的长度应在10到200个字符内', trigger: 'blur' }
          ],
          date1: [
            { validator: date1, trigger: 'change' }
          ],
          date2: [
            { validator: date2, trigger: 'change' }
          ],
          cpccs: [
            { type: 'array', required: true, message: '请选择公司', trigger: 'blur' }
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

        chartData: {},
        chartType:'',
        barFlag: false,
        barFlag1: false,
        pieFlag: false,
        lineFlag: false,
        mingleFlag: false,
        mingleData:{},
        viewFlag:true,
        barLoading:false,
        pieLoading:false,
        lineLoading:false,
        mingleLoading:false,
      }
    },
    directives: {clickoutside},
    components: {
      barChart,
      barChart1,
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
              key: `${companyArr[item].cPCC}`,
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
            _this.createNorm()
            this.barFlag = false
            this.pieFlag = false
            this.lineFlag = false
            this.mingleFlag = false
            this.formData1={
              remarks: '',
              statisticalName: ''
            }
            this.formData2= {
              date1: '',
              date2: '',
              cpccs: [],
              departments: [],
              products: [],
              dateType: '1'
            }
            this.formData2T= {
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
            }
            this.formData3= {
              indicatorIndex: '',
              atlas: []
            }
            this.$refs['formData1'].resetFields()
            this.$refs['formData2'].resetFields()
            this.$refs['formData3'].resetFields()
          } else {
            console.log('error submit!')
          }
        })
      },
      changeDate(){
        let _this = this
        this.startQuarter = false
        this.endQuarter = false
        _this.formData2.date1 = ''
        _this.formData2.date2 = ''
      },

      /*开始季度的选择于处理*/
      startFocus(val){
        this.startQuarter = true
        this.endQuarter = false
      },
      quarterStartClose(){
        this.startQuarter = false
      },
      startLeftSearch(){
        this.startQuarterYear--
      },
      startRightSearch(){
        this.startQuarterYear++
      },
      change_start_quarter(val){
        this.formData2.date1 = this.startQuarterYear + '-' + val
        this.startQuarter = false
      },

      /*结束季度的选择于处理*/
      endFocus(val){
        this.endQuarter = true
        this.startQuarter = false
      },
      quarterEndClose(){
        this.endQuarter = false
      },
      endLeftSearch(){
        this.endQuarterYear--
      },
      endRightSearch(){
        this.endQuarterYear++
      },
      change_end_quarter(val){
        this.formData2.date2 = this.endQuarterYear + '-' + val
        this.endQuarter = false
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
        this.barFlag = false
        this.pieFlag = false
        this.lineFlag = false
        this.mingleFlag = false
        this.formData1={
          remarks: '',
          statisticalName: ''
        }
        this.formData2= {
          date1: '',
          date2: '',
          cpccs: [],
          departments: [],
          products: [],
          dateType: '1'
        }
        this.formData2T= {
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
        }
        this.formData3= {
          indicatorIndex: '',
          atlas: []
        }
        this.$refs['formData1'].resetFields()
        this.$refs['formData2'].resetFields()
        this.$refs['formData3'].resetFields()
      },
      handleClose2 () {
        this.dialogVisible2 = false
        this.barFlag = false
        this.pieFlag = false
        this.lineFlag = false
        this.mingleFlag = false
        this.formData1={
          remarks: '',
          statisticalName: ''
        }
        this.formData2= {
          date1: '',
          date2: '',
          cpccs: [],
          departments: [],
          products: [],
          dateType: '1'
        }
        this.formData2T= {
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
        }
        this.formData3= {
          indicatorIndex: '',
          atlas: []
        }
        this.$refs['formData1'].resetFields()
        this.$refs['formData2'].resetFields()
        this.$refs['formData3'].resetFields()
      },
      handleClose3 () {
        this.dialogVisible3 = false
        this.barFlag = false
        this.pieFlag = false
        this.lineFlag = false
        this.mingleFlag = false
        /*清空数据以及校验*/
        this.formData1={
          remarks: '',
          statisticalName: ''
        }
        this.formData2= {
          date1: '',
          date2: '',
          cpccs: [],
          departments: [],
          products: [],
          dateType: '1'
        }
        this.formData2T= {
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
        }
        this.formData3= {
          indicatorIndex: '',
          atlas: []
        }
        this.$refs['formData1'].resetFields()
        this.$refs['formData2'].resetFields()
        this.$refs['formData3'].resetFields()
        this.chartData = {}
      },
      /*预览图标的隐藏展示*/

      barShow () {
        let vm = this
        vm.$refs['formData3'].validate((valid) => {
          if (valid) {
            vm.chartType = 'bar'
            if (!vm.barFlag) {
              /*判断是那种预览方法*/
              if(this.viewFlag){
                vm.barLoading = true
                vm.previewChart()
              }else{
                vm.barLoading = true
                vm.previewChart1()
              }
            }else{
              vm.barLoading = false
              vm.barFlag = !vm.barFlag
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
            vm.chartType = 'pie'
            if (!vm.pieFlag) {
              vm.pieLoading = true
              vm.previewChart()
            }else{
              vm.pieLoading = false
              vm.pieFlag = !vm.pieFlag
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
            vm.chartType = 'line'
            if (!vm.lineFlag) {
              vm.lineLoading = true
              vm.previewChart()
            }else{
              vm.lineLoading = false
              vm.lineFlag = !vm.lineFlag
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
            vm.chartType = 'mingle'
            if (!vm.mingleFlag) {
              vm.mingleLoading = true
              vm.previewChart()
            }else{
              vm.mingleLoading = false
              vm.mingleFlag = !vm.mingleFlag
            }
          } else {
            console.log('error submit!')
          }
        })
      },
      indicatorChange(val){
        /*当下拉框选择变化以后可调用接口*/
        this.barLoading = false
        this.pieLoading = false
        this.lineLoading = false
        this.mingleLoading = false
      },
      changeData(val){
        let _this = this
        _this.formData3.dataType  = val
        _this.barFlag = false
        _this.barFlag1 = false
        _this.pieFlag = false
        _this.lineFlag = false
        _this.mingleFlag = false
        if(val == '0'){
          _this.viewFlag = true
        }else{
          _this.viewFlag = false
        }
      },

      /*预览图表的方法*/
      previewChart (){
        let _this = this
        /*_this.chartData = {}*/
        /**
         * 处理第二页的数据
         */
        let searchCondition = {
          dateRange: '',
          companys: '',
          departments: '',
          products: ''
        }
        searchCondition.dateRange = _this.formData2.date1 + 'H' + _this.formData2.date2
        searchCondition.companys = _this.formData2.cpccs.join(',') || ''
        searchCondition.departments = _this.formData2.departments.join(',') || ''
        searchCondition.products = _this.formData2.products.join(',') || ''
        searchCondition = JSON.stringify(searchCondition)
        /**
         * 请求头的数据拼接
         * @type {{accessToken}}
         */
        let header = {
          accessToken: sessionStorage.getItem('accessToken'),
        }
        /**
         * 请求传递的参数整理
         * @type {{statisticalName: string, remarks: string, searchCondition: {dateRange: string, cpccs: string, departments: string, products: string}, indicatorIndex: string, indicatorName: string, type: number, atlas: string}}
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
          if(res.code == 16000003){
            if(res.data !== null){
              if(_this.chartType == 'bar'){
                _this.chartData = res.data
                _this.barFlag = !_this.barFlag
                if(_this.barFlag){
                  _this.barFlag1 = false
                  _this.pieFlag = false
                  _this.lineFlag = false
                  _this.mingleFlag = false
                  _this.barLoading = false
                  _this.$nextTick(() => {
                    _this.$refs.bar.resizeChart();
                  })
                }else{
                  _this.barLoading = false
                }
              }
              else if(_this.chartType == 'pie'){
                _this.pieFlag = !_this.pieFlag
                _this.chartData = res.data
                if(_this.pieFlag){
                  _this.barFlag = false
                  _this.barFlag1 = false
                  _this.lineFlag = false
                  _this.mingleFlag = false
                  _this.pieLoading = false
                  _this.$nextTick(() => {
                    _this.$refs.pie.resizeChart();
                  })
                }else{
                  _this.pieLoading = false
                }

              }
              else if(_this.chartType == 'line'){
                _this.lineFlag = !_this.lineFlag
                _this.chartData = res.data
                  if(_this.lineFlag ){
                    _this.barFlag = false
                    _this.barFlag1 = false
                    _this.pieFlag = false
                    _this.mingleFlag = false
                    _this.lineLoading = false
                    _this.$nextTick(() => {
                      _this.$refs.line.resizeChart();
                    })
                  }else{
                    _this.lineLoading = false
                  }

              }
              else if(_this.chartType == 'mingle'){
                _this.mingleFlag = !_this.mingleFlag
                _this.chartData = res.data
               if(_this.mingleFlag){
                 _this.barFlag = false
                 _this.barFlag1 = false
                 _this.lineFlag = false
                 _this.pieFlag = false
                 _this.mingleLoading = false
                 _this.$nextTick(() => {
                   _this.$refs.mingle.resizeChart();
                 })
               }else {
                 _this.mingleLoading = false
               }

              }
            }
            else{
              _this.barLoading = false
              _this.pieLoading = false
              _this.lineLoading = false
              _this.mingleLoading = false
              _this.$notify({
                title: '提示信息',
                message:'预览图表失败',
                type: 'error',
                duration: '1000'
              })
              return
            }
            /*setTimeout(function () {
              if (_this.barFlag) {
                _this.$refs.bar.createdChart();
                _this.$refs.bar.resizeChart();
              }else if(_this.pieFlag){
                _this.$refs.pie.createdChart();
                _this.$refs.pie.resizeChart();
              }else if(_this.lineFlag){
                _this.$refs.line.createdChart();
                _this.$refs.line.resizeChart();
              }else if(_this.mingleFlag){
                _this.$refs.mingle.createdChart();
                _this.$refs.mingle.resizeChart();
              }
            },500)*/
            /*请求第一次预览的时候把标志变为false，再次执行方法的时候不走接口了*/
          }
          else{
            _this.barLoading = false
            _this.pieLoading = false
            _this.lineLoading = false
            _this.mingleLoading = false
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

      /*根据第二种树蕨切割方式进行带缩放的echart预览图表的方法*/
      previewChart1 (){
        let _this = this
        /*_this.chartData = {}*/
        /**
         * 处理第二页的数据
         */
        let searchCondition = {
          dateRange: '',
          companys: '',
          departments: '',
          products: ''
        }
        searchCondition.dateRange = _this.formData2.date1 + 'H' + _this.formData2.date2
        searchCondition.companys = _this.formData2.cpccs.join(',') || ''
        searchCondition.departments = _this.formData2.departments.join(',') || ''
        searchCondition.products = _this.formData2.products.join(',') || ''
        searchCondition = JSON.stringify(searchCondition)
        /**
         * 请求头的数据拼接
         * @type {{accessToken}}
         */
        let header = {
          accessToken: sessionStorage.getItem('accessToken'),
        }
        /**
         * 请求传递的参数整理
         * @type {{statisticalName: string, remarks: string, searchCondition: {dateRange: string, cpccs: string, departments: string, products: string}, indicatorIndex: string, indicatorName: string, type: number, atlas: string}}
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
          if(res.code == 16000003){
            if(res.data !== null){
              if(_this.chartType == 'bar'){
                let passData = ParseData(res.data)
                for(let item in passData){
                  _this.chartData = passData[item]
                  _this.barFlag1 = !_this.barFlag1
                  if(_this.barFlag1){
                    _this.barFlag = false
                    _this.pieFlag = false
                    _this.lineFlag = false
                    _this.mingleFlag = false
                    _this.barLoading = false
                    _this.$nextTick(() => {
                      _this.$refs.bar1.resizeChart();
                    })
                  }else{
                    _this.barLoading = false
                  }
                  return
                }
              }
            }
            else{
              _this.barLoading = false
              _this.pieLoading = false
              _this.lineLoading = false
              _this.mingleLoading = false
              _this.$notify({
                title: '提示信息',
                message:'预览图表失败',
                type: 'error',
                duration: '1000'
              })
              return
            }
            /*setTimeout(function () {
              if (_this.barFlag) {
                _this.$refs.bar.createdChart();
                _this.$refs.bar.resizeChart();
              }else if(_this.pieFlag){
                _this.$refs.pie.createdChart();
                _this.$refs.pie.resizeChart();
              }else if(_this.lineFlag){
                _this.$refs.line.createdChart();
                _this.$refs.line.resizeChart();
              }else if(_this.mingleFlag){
                _this.$refs.mingle.createdChart();
                _this.$refs.mingle.resizeChart();
              }
            },500)*/
            /*请求第一次预览的时候把标志变为false，再次执行方法的时候不走接口了*/
          }
          else{
            _this.barLoading = false
            _this.pieLoading = false
            _this.lineLoading = false
            _this.mingleLoading = false
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

      /*新建指标*/
      createNorm (){
        let _this = this
        /**
         * 处理第二页的数据
         */
        _this.submitting = true
        let searchCondition = {
          dateRange: '',
          companys: '',
          departments: '',
          products: ''
        }
        searchCondition.dateRange = _this.formData2.date1 + 'H' + _this.formData2.date2
        searchCondition.companys = _this.formData2.cpccs.join(',') || ''
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
         * @type {{statisticalName: string, remarks: string, searchCondition: {dateRange: string, cpccs: string, departments: string, products: string}, indicatorIndex: string, indicatorName: string, type: number, atlas: string}}
         */
        let param = {
          dataSegment:'0',
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
            message: res.code == 16000003 ? '新建指标成功' : '新建指标失败',
            type: res.code == 16000003 ? 'success' : 'error',
            duration: '2000'
          })
          if(res.code == 16000003){
            _this.dialogVisible3 = false
            _this.getNormTable()
            _this.formData1={
              remarks: '',
              statisticalName: ''
            }
            _this.formData2= {
              date1: '',
              date2: '',
              cpccs: [],
              departments: [],
              products: [],
              dateType: '1'
            }
            _this.formData2T= {
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
            }
            _this.formData3= {
              indicatorIndex: '',
                atlas: []
            }
          }
          _this.submitting = false
        }).catch(error => {
          console.log(error)
        })
      },

      /*获取公司的列表*/
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
            let companyArr = _this.generateData(res.data.data.viewResult)
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
          let header = {
            accessToken: sessionStorage.getItem('accessToken'),
            projectId: sessionStorage.getItem('projectId')
          }
          let param = {
            type:'财务'
          }
          _this.$store.dispatch('GET_NORM_SELECT', {param, header}).then(res => {
            if(res.data.code === 16000003){
              _this.formData3T.typeOld = res.data.data
              _this.formData3T.typeArr.push({
                label: param.type,
                options: []
              })
              for(var key in res.data.data){
                _this.formData3T.typeArr[0].options.push({
                  value: key,
                  label: res.data.data[key]
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
        _this.loading=true
        let header = {
          accessToken:  sessionStorage.getItem('accessToken')
        }
        let param = {
          accountId: sessionStorage.getItem('accountId'),
          startTime: _this.ruleForm.start,
          endTime: _this.ruleForm.end,
          indexName: _this.ruleForm.infoName,
          pageNum:_this.pageNum,
          pageSize:_this.pageSize
        }
        _this.$store.dispatch('GET_NORM_TABLE', {param, header}).then(res => {
          if(res.data.code === 16000003){
            _this.loading=false,
            _this.tableData = []
            _this.totalCount = res.data.data.pop().totalNum
            let obj = res.data.data
            /*1是创建者，1是发布*/
            for(let i=0;i<obj.length;i++){
              if(obj[i].if_publish == 1){
                _this.tableData.push({
                  indicator_name: obj[i].statistical_name,
                  creation_time: obj[i].creation_time,
                  date_range: obj[i].dateRange,
                  remarks: obj[i].remarks,
                  creator: obj[i].creatorName,
                  likeCount: obj[i].likeCount,
                  subscibeCount: obj[i].subscibeCount,
                  fb:obj[i].creatorResult == 1 && obj[i].if_publish == 0? true : false,
                  qxfb:obj[i].creatorResult == 1 && obj[i].if_publish == 1? true : false,
                  dy:obj[i].typeResult == 1 ? false : true,
                  qxdy:obj[i].typeResult == 1 ? true : false,
                  sc:obj[i].creatorResult == 1?true:false,
                  id:obj[i].id,
                  type:obj[i].type
                })
              }else{
                _this.tableData.push({
                  indicator_name: obj[i].statistical_name,
                  creation_time: obj[i].creation_time,
                  date_range: obj[i].dateRange,
                  remarks: obj[i].remarks,
                  creator: obj[i].creatorName,
                  likeCount: obj[i].likeCount,
                  subscibeCount: obj[i].subscibeCount,
                  fb:obj[i].creatorResult == 1 && obj[i].if_publish == 0? true : false,
                  qxfb:obj[i].creatorResult == 1 && obj[i].if_publish == 1? true : false,
                  sc:obj[i].creatorResult == 1?true:false,
                  id:obj[i].id,
                  type:obj[i].type
                })
              }
            }
          }else{
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
      },
      infoChange(val){
        let vm = this
        this.ruleForm.infoName = val
      },
      searchList(){
        let vm = this
        this.pageNum = 1
        setTimeout(function () {
          vm.getNormTable()
        },100)
      },
      handleSizeChange (val) {
        this.pageNum = val
        this.getNormTable()
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.getNormTable()
      },
      /*发布指标*/
      publishNorm(row){
        let vm = this
        vm.loading=true
        let header = {
          accessToken:  sessionStorage.getItem('accessToken'),
          projectId: sessionStorage.getItem('projectId')
        }
        let param = {
          account_id: sessionStorage.getItem('accountId'),
        }
        let urlData = row.id
        this.$store.dispatch('PUBLISH_NORM', {param, header, urlData}).then(res => {
          if(res.data.code == 16000003){
            vm.getNormTable()
          }
          vm.$notify({
            title: '提示信息',
            message: res.data.msg,
            type:res.data.code == 16000003 ? 'success' : 'error',
            duration: '2000'
          })
        }).catch(error=>{
          console.error(error);
        })
      },
      /*取消发布指标*/
      unPublishNorm(row){
        this.rowId = row.id
        this.cancelNormDialog = true
      },
      cancelNorm(){
        let vm = this
        let header = {
          accessToken:  sessionStorage.getItem('accessToken'),
          projectId: sessionStorage.getItem('projectId')
        }
        let param = {
          account_id: sessionStorage.getItem('accountId'),
        }
        let urlData = this.rowId
        this.$store.dispatch('UN_PUBLISH_NORM', {param, header, urlData}).then(res => {
          if(res.data.code == 16000003){
            vm.getNormTable()
          }
          vm.$notify({
            title: '提示信息',
            message: res.data.msg,
            type:res.data.code == 16000003 ? 'success' : 'error',
            duration: '2000'
          })
        }).catch(error=>{
          console.error(error);
        })
        this.cancelNormDialog = false
      },
      cancelClose(){
        this.cancelNormDialog = false
      },
      /*订阅指标*/
      subscriberNorm(row){
        let vm = this
        vm.loading=true
        let header = {
          accessToken:  sessionStorage.getItem('accessToken'),
          projectId: sessionStorage.getItem('projectId')
        }
        let param = {
          account_id: sessionStorage.getItem('accountId'),
          data_id:row.id,
          type:row.type
        }
        this.$store.dispatch('SUBSCRIBER_NORM', {param, header}).then(res => {

          if(res.data.code == 16000003){
            vm.getNormTable()
          }
          vm.$notify({
            title: '提示信息',
            message: res.data.msg,
            type:res.data.code == 16000003 ? 'success' : 'error',
            duration: '2000'
          })
        }).catch(error=>{
          console.error(error);
        })
      },
      /*取消订阅指标*/
      un_SubscriberNorm(row){
        let vm = this
        vm.loading=true
        let header = {
          accessToken:  sessionStorage.getItem('accessToken'),
          projectId: sessionStorage.getItem('projectId')
        }
        let param = {
          account_id: sessionStorage.getItem('accountId'),
          data_id:row.id,
          type:row.type
        }
        this.$store.dispatch('UN_SUBSCRIBER_NORM', {param, header}).then(res => {
          if(res.data.code == 16000003){
            vm.getNormTable()
          }
          vm.$notify({
            title: '提示信息',
            message: res.data.msg,
            type:res.data.code == 16000003 ? 'success' : 'error',
            duration: '2000'
          })

        }).catch(error=>{
          console.error(error);
        })
      },
      /*删除订阅指标*/
      deleteNorm(row){
        this.rowId = row.id
        this.deleteNormDialog = true
      },
      affirmDeleteNorm(){
        let vm = this
        vm.loading=true
        let header = {
          accessToken:  sessionStorage.getItem('accessToken'),
          projectId: sessionStorage.getItem('projectId')
        }
        let param = {
          account_id: sessionStorage.getItem('accountId'),
          id:vm.rowId
        }
        this.$store.dispatch('DELETE_INDICATORS', {param, header}).then(res => {
          if(res.data.code == 16000003){
            vm.getNormTable()
          }
          vm.$notify({
            title: '提示信息',
            message: res.data.msg,
            type:res.data.code == 16000003 ? 'success' : 'error',
            duration: '2000'
          })

        }).catch(error=>{
          console.error(error);
        })
        this.deleteNormDialog = false
      },
      deleteClose(){
        this.deleteNormDialog = false
      }
    },
    created () {
      this.getNormTable()
      this.getNormSelect()
    },
    mounted () {
    }
  }
</script>
<style scoped lang="scss">
  .search{
		margin-bottom: 0;
	}
	.el-transfer-panel{
		width:240px
	}
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
  .quarter{
    width: 110%;
    height: 286px;
    position: absolute;
    padding: 12px;
    top: 50px;
    z-index: 100;
    color: #606266;
    border: 1px solid #e4e7ed;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
    .quarterHeader{
      width: 100%;
      text-align: center;
      span{
        width: 90% ;
      }
    }
  }
  .quarter:after{
   display: block;
    content: '';
    height: 10px;
    width: 10px;
    position: absolute;
    background: white;
    top:-5px;
    left: 10%;
    transform: rotate(45deg);
    border: 1px solid #e4e7ed;
    border-bottom:none ;
    border-right:none ;
  }
</style>
