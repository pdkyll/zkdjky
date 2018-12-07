<template>
    <div>
      <div class="chart" :id="elId"></div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import uuidv1 from 'uuid/v1'
    export default {
      name:'bar-chart',
      props: {                //接受父组件传递来的数据
        data: {
          type: Object,
        },
      },
      data () {
        return {
          elId: '',
          chartInstance:''
        }
      },
      components: {},
      methods: {
        createdChart(){
          console.log(this.data)
          let dataMap = {};
          function dataFormatter(obj) {
            var pList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
            var temp;
            for (var month = 1; month <= 12; month++) {
              temp = obj[month.toString()];
              obj[month + 'sum'] = temp[0];
              for (var i = 1, len = temp.length; i < len; i++) {
                obj[month.toString()][i] = {
                  name: pList[i],
                  value: temp[i]
                }
              }
              obj[month.toString()].shift()

            }
            return obj;
          }
          dataMap.dataMonth = dataFormatter(this.data.count);
          let option = {
            baseOption: {
              timeline: {
                // y: 0,
                axisType: 'category',
                // realtime: false,
                // loop: false,
                autoPlay: false,
                // currentIndex: 2,
                playInterval: 1500,
                // controlStyle: {
                //     position: 'left'
                // },
                data: this.data.name,
                label: {
                  formatter: function(s) {
                    return s + "月"
                  }
                }
              },
              tooltip: {},

              calculable: true,
              grid: {
                top: 80,
                bottom: 100
              },
              xAxis: [
                {
                  type:'category',
                  axisLabel:{'interval':0},
                  data:this.data.xName,
                  splitLine: {show: false}
                }
              ],
              yAxis: [{
                type: 'value',
                name: '人数',
                // max: 53500
                max: 100
              }],
              series: [{
                name: 'days',
                type: 'bar'
              },


              ]
            },
            options: [{
              series: [{
                data: dataMap.dataMonth['1'],
              },

              ]
            },
              {
                series: [{
                  data: dataMap.dataMonth['2'],
                }, ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['3'],
                }, ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['4'],
                }, ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['5'],
                }, ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['6'],
                } ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['7'],
                }, ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['8'],
                }, ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['9'],
                }, ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['10'],
                }, ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['11'],
                }, ]
              },
              {
                series: [{
                  data: dataMap.dataMonth['12'],
                }, ]
              },

            ]
          };
          this.chartInstance.setOption(option);
        },
        resizeChart(){
          let vm = this
          document.getElementById(this.elId).style.width = '100%'
         setTimeout(function () {
           vm.chartInstance.resize()
         },100)
        }
      },
      created(){
        this.elId = uuidv1()
      },
      mounted () {
        this.chartInstance = echarts.init(document.getElementById(this.elId));
        this.createdChart()
      }
    }
</script>

<style scoped>
  .chart{
    float: left;
    width: 900px;
    height: 350px;
  }
</style>
