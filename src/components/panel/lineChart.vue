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
      parseData() {
        let data = this.data
        let allProducts = new Map()//<产品,<年份,<部门,销售额>>>
        let allCompanyDepartment = new Set()
        let allYear = new Set()
        for (let item in data) {
          let arr = item.split('^')
          let product = arr[0]
          let year = arr[1]
          let company = arr[2]
          let department = arr[3]
          let tmp_c_d = company + "-" + department
          let value = parseInt(data[item])
          if (!allProducts.has(product)) {
            allProducts.set(product, new Map())
          }
          if (!allProducts.get(product).has(year)) {
            allProducts.get(product).set(year, new Map())
          }
          if (!allProducts.get(product).get(year).has(tmp_c_d)) {
            allProducts.get(product).get(year).set(tmp_c_d, value)
          }
          allCompanyDepartment.add(tmp_c_d)
          allYear.add(year)
        }
        let allProductsNew = new Map()//<产品,<年份,[销售额]>>

        allProducts.forEach(function (p_value, product, map) {
          allYear.forEach(function (year, sameElement, set) {
            if (!p_value.has(year)) {
              p_value.set(year, new Map())
            }
          })
          p_value.forEach(function (y_value, year, map) {
            let list = new Array()
            let sum = 0
            let max = 0
            allCompanyDepartment.forEach(function (cd, sameElement, set) {
              if (y_value.has(cd)) {
                list.push(y_value.get(cd))
                sum += y_value.get(cd)
                if (max < y_value.get(cd)) {
                  max = y_value.get(cd)
                }
              } else {
                list.push(0)
              }
            })
            if (!allProductsNew.has(product)) {
              allProductsNew.set(product, new Map())
            }
            if (!allProductsNew.get(product).has(year)) {
              allProductsNew.get(product).set(year, list)
            }
            allProductsNew.get(product)[year + 'max'] = Math.floor(max / 100) * 100
            allProductsNew.get(product)[year + 'sum'] = sum
          })
        })
        let result = {}
        result.years = Array.from(allYear).sort()
        result.products = Array.from(allProducts.keys())
        result.companyDepartments = Array.from(allCompanyDepartment)
        result.productValues = allProductsNew
        return result
      },
      builderChartOptions(chartData) {
        let option = {
          baseOption: {
            timeline: {
              // y: 0,
              axisType: 'category',
              // realtime: false,
              // loop: false,
              autoPlay: false,
              // currentIndex: 2,
              playInterval: 1000,
              // controlStyle: {
              //     position: 'left'
              // },
              data: chartData.years,
              label: {
                formatter: function (s) {
                  return (new Date(s)).getFullYear()
                }
              }
            },
            title: {
            },
            tooltip: {
            },
            legend: {
              x: 'right',
              data: chartData.products
            },
            calculable: true,
            grid: {
              top: 80,
              bottom: 100,
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow',
                  label: {
                    show: true,
                    formatter: function (params) {
                      return params.value.replace('\n', '')
                    }
                  }
                }
              }
            },
            xAxis: [
              {
                'type': 'category',
                'axisLabel': { 'interval': 0 },
                'data': chartData.companyDepartments,
                splitLine: { show: false }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '销售额（元）'
              }
            ],
            series: function () {
              let array = new Array()
              for (let p in chartData.products) {
                array.push({ name: chartData.products[p], type: 'line' })
              }
              return array
            }()
          },
          options: function () {
            let array = new Array()
            for (let i_year in chartData.years) {
              let year = chartData.years[i_year]
              array.push({
                title: { text: year+'指标统计结果' },
                series: function () {
                  let tempArray = new Array()
                  for (let i_p in chartData.products) {
                    let p = chartData.products[i_p]
                    tempArray.push({ data: chartData.productValues.get(p).get(year) })
                  }
                  return tempArray
                }()
              })
            }
            return array
          }()

        }
        return option
      },
      createdChart(){
        let option = this.builderChartOptions(this.parseData())
        this.chartInstance.setOption(option);
      },
      resizeChart(){
        let vm = this
        if(document.getElementById(this.elId).style !== null){
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
    height: 350px;
  }
</style>
