<template>
  <div class="app-container">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover" style="margin-top: 20px">
          <div v-echarts="barChartOptions" class="chart"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" style="margin-top: 20px">
          <div v-echarts="barChartOptions2" class="chart"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover" style="margin-top: 20px">
          <div v-echarts="barChartOptions3" class="chart"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" style="margin-top: 20px">
          <div v-echarts="barChartOptions4" class="chart"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'CollectionStatisticsChart',
  components: { },
  data() {
    return {
      list: []
    }
  },
  computed: {
    barChartOptions() {
      const list = this.list
      const xAxis = []
      const series = [
        {
          name: '催收总数量',
          type: 'line',
          stack: '总量',
          data: []
        },
        {
          name: '催收还款数量',
          type: 'line',
          stack: '总量',
          data: []
        },
        {
          name: '催收展期数量',
          type: 'line',
          stack: '总量',
          data: []
        }
      ]
      list.map((item) => {
        xAxis.push(item.clickDate)
        series[0].data.push(item.countCollection)
        series[1].data.push(item.countRepayment)
        series[2].data.push(item.countExtend)
      })
      return {
        color: [
          '#19d4ae', '#5ab1ef', '#fa6e86',
          '#ffb980', '#0067a6', '#c4b4e4',
          '#d87a80', '#9cbbff', '#d9d0c7',
          '#87a997', '#d49ea2', '#5b4947',
          '#7ba3a8'
        ],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['催收总数量', '催收还款数量', '催收展期数量']
        },
        grid: {
          left: '8%',
          right: '8%',
          bottom: '8%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
          axisLine: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          },
          axisTick: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: series
      }
    },
    barChartOptions2() {
      const list = this.list
      const xAxis = []
      const series = [
        {
          name: '催收总金额',
          type: 'line',
          stack: '金额',
          data: []
        },
        {
          name: '催收还款金额',
          type: 'line',
          stack: '金额',
          data: []
        },
        {
          name: '催收展期金额',
          type: 'line',
          stack: '金额',
          data: []
        }
      ]
      list.map((item) => {
        xAxis.push(item.clickDate)
        series[0].data.push(item.collectionMoney)
        series[1].data.push(item.repaymentMoney)
        series[2].data.push(item.extendMoney)
      })
      return {
        color: [
          '#19d4ae', '#5ab1ef', '#fa6e86',
          '#ffb980', '#0067a6', '#c4b4e4',
          '#d87a80', '#9cbbff', '#d9d0c7',
          '#87a997', '#d49ea2', '#5b4947',
          '#7ba3a8'
        ],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['催收总金额', '催收还款金额', '催收展期金额']
        },
        grid: {
          left: '12%',
          right: '8%',
          bottom: '8%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
          axisLine: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          },
          axisTick: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: series
      }
    },
    barChartOptions3() {
      const list = this.list
      const xAxis = []
      const series = [
        {
          name: '还款率',
          type: 'line',
          stack: '总量',
          data: []
        },
        {
          name: '展期率',
          type: 'line',
          stack: '总量',
          data: []
        }
      ]
      list.map((item) => {
        xAxis.push(item.clickDate)
        series[0].data.push(this.countRate(item.countRepayment, item.countCollection))
        series[1].data.push(this.countRate(item.countExtend, item.countCollection))
      })
      return {
        color: [
          '#19d4ae', '#5ab1ef', '#fa6e86',
          '#ffb980', '#0067a6', '#c4b4e4',
          '#d87a80', '#9cbbff', '#d9d0c7',
          '#87a997', '#d49ea2', '#5b4947',
          '#7ba3a8'
        ],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['还款率', '展期率']
        },
        grid: {
          left: '8%',
          right: '8%',
          bottom: '8%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
          axisLine: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          },
          axisTick: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: series
      }
    },
    barChartOptions4() {
      const list = this.list
      const xAxis = []
      const series = [
        {
          name: '还款金额比',
          type: 'line',
          stack: '总量',
          data: []
        },
        {
          name: '展期金额比',
          type: 'line',
          stack: '总量',
          data: []
        }
      ]
      list.map((item) => {
        xAxis.push(item.clickDate)
        series[0].data.push(this.countRate(item.repaymentMoney, item.collectionMoney))
        series[1].data.push(this.countRate(item.extendMoney, item.collectionMoney))
      })
      return {
        color: [
          '#19d4ae', '#5ab1ef', '#fa6e86',
          '#ffb980', '#0067a6', '#c4b4e4',
          '#d87a80', '#9cbbff', '#d9d0c7',
          '#87a997', '#d49ea2', '#5b4947',
          '#7ba3a8'
        ],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['还款金额比', '展期金额比']
        },
        grid: {
          left: '8%',
          right: '8%',
          bottom: '8%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
          axisLine: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          },
          axisTick: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: series
      }
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.queryList()
    },
    queryList() {
      this.$http.post('collection/doubleCollection').then((res) => {
        const list = res.data
        list.sort((a, b) => {
          return moment(a.clickDate).isAfter(b.clickDate)
        })
        this.list = list
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .chart {
    width: 100%;
    height: 280px;
  }
</style>
