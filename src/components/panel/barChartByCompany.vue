/**
* Created by zhangxin on 2019-01-08.
*/
<template>
  <div class="chart" :id="elId"></div>
</template>
<script>
  import echarts from 'echarts'
  import uuidv1 from 'uuid/v1'
  export default {
    name:'bar-chart',
    props: {                //接受父组件传递来的数据
      data: {},
    },
    data () {
      return {
        elId: '',
        chartInstance:''
      }
    },
    components: {},
    methods: {
      builderChartOptions(chartData) {
        let bcBySeriesIndex = chartData.result.map(function (item) {
          return item.stack
        });
        let option = {
          title: {
            text: chartData.companyName
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
              var html = [];

              var category = {};
              echarts.util.each(params, function (param) {
                var catName = param.seriesName;
                var bc = bcBySeriesIndex[param.seriesIndex];
                if (!category[catName]) {
                  category[catName] = {};
                }
                category[catName][bc] = param.value;
              });
              echarts.util.each(category, function (cate, key) {
                html.push(
                  '<tr>',
                  '<td>', key, '</td>'
                );
                chartData.allDepartment.forEach(function (dItem,dIndex) {
                  html.push('<td>', cate[dItem], '</td>')
                });
                html.push('</tr>')
              })
              var tdHtml = '';
              chartData.allDepartment.forEach(function (dItem,dIndex) {
                tdHtml += '<td>';
                tdHtml += dItem;
                tdHtml += '</td>';
              })
              let tableTip = '<table border=1><tbody>'
                + '<tr><td></td>' +
                tdHtml +
                '</tr>'
                + html.join('')
                + '</tbody></table>';
              return tableTip;
            }
          },
          legend: {
            data: chartData.allProducts,
            x: 'right',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [
              0
            ],
            bottom: 0,
            start: 10,
            end: 80,
          }],
          xAxis : [
            {
              type : 'category',
              data : chartData.allDateTime
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : chartData.result
        };
        return option
      },
      createdChart(){
        let option = this.builderChartOptions(this.data)
        this.chartInstance.setOption(option)
      },
      resizeChart(){
        let vm = this
        if(document.getElementById(this.elId).style == null){
          return
        }else{
          document.getElementById(this.elId).style.width = '100%'
        }
        setTimeout(function () {
          vm.chartInstance.resize()
        },100)
      }
    },
    created(){
      this.elId = uuidv1()
    },
    mounted () {
      let vm = this
      vm.chartInstance = echarts.init(document.getElementById(this.elId));
      vm.createdChart()
      window.addEventListener("message", function (res) {
        if(res.data.resize){
          vm.resizeChart()
        }
      }, false)
    }
  }
</script>

<style scoped>
  .chart{
    float: left;
    height: 430px;
    padding:8px 20px 8px
  }
</style>

