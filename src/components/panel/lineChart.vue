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
        let name = []
        let count = []
        for(let i = 0;i<this.data.count.length;i++){
          name.push(this.data.count[i].name)
          count.push({
            name:this.data.count[i].name,
            type:'line',
            data:this.data.count[i].value
          })
        }
        let option = {
          color: ['#D53A35', '#E98F6F', '#6AB0B8', '#334B5C'],
          //title: {
          //    text: '报警次数'
          //},
          tooltip: {
            trigger: 'axis',
            //formatter: "{b} <br> 合格率: {c}%"
          },
          legend: {
            data: name
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            name: '日期',
            boundaryGap: false,
            data: this.data.time
          },
          yAxis: {
            type: 'value',
            name: '报警次数',
          },
          series: count
        };
        console.log()
        this.chartInstance.setOption(option);
      },
      resizeChart(){
        setTimeout(function () {
          this.chartInstance.resize()
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
