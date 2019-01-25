<template>
  <div class="app-container">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>今日统计量</span>
          </div>
          <el-row :gutter="30">
            <el-col :span="8">
              <div class="data-wrap">
                <div class="item">
                  <span class="title">注册人数</span>
                  <span class="value">{{ todayData.countRegist }}</span>
                </div>
                <div class="item">
                  <span class="title">认证人数</span>
                  <span class="value">{{ todayData.countIdentify }}</span>
                </div>
                <div class="item">
                  <span class="title">借款单数</span>
                  <span class="value">{{ todayData.countCash }}</span>
                </div>
                <div class="item">
                  <span class="title">放款单数</span>
                  <span class="value">{{ todayData.countCollection }}</span>
                </div>
                <div class="item">
                  <span class="title">还款单数</span>
                  <span class="value">{{ todayData.countRepayment }}</span>
                </div>
                <div class="item">
                  <span class="title">展期单数</span>
                  <span class="value">{{ todayData.countExtend }}</span>
                </div>
                <div class="item">
                  <span class="title">逾期单数</span>
                  <span class="value">{{ todayData.countOverdue }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="data-wrap">
                <div class="item">
                  <span class="title">借款金额</span>
                  <span class="value">{{ todayData.cashMoney }}</span>
                </div>
                <div class="item">
                  <span class="title">放款金额</span>
                  <span class="value">{{ todayData.collectionMoney }}</span>
                </div>
                <div class="item">
                  <span class="title">还款金额</span>
                  <span class="value">{{ todayData.repaymentMoney }}</span>
                </div>
                <div class="item">
                  <span class="title">展期金额</span>
                  <span class="value">{{ todayData.extendMoney }}</span>
                </div>
                <div class="item">
                  <span class="title">逾期金额</span>
                  <span class="value">{{ todayData.overdueMoney }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="data-wrap">
                <div class="item">
                  <span class="title">认证率</span>
                  <span class="value">{{ countRate(todayData.countIdentify, todayData.countRegist) }}%</span>
                </div>
                <div class="item">
                  <span class="title">放款率</span>
                  <span class="value">{{ countRate(todayData.countCollection, todayData.countCash) }}%</span>
                </div>
                <div class="item">
                  <span class="title">还款率</span>
                  <span class="value">{{ countRate(todayData.countRepayment, todayData.countCollection) }}%</span>
                </div>
                <div class="item">
                  <span class="title">逾期率</span>
                  <span class="value">{{ countRate(todayData.countOverdue, todayData.countCollection) }}%</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>历史统计量</span>
          </div>
          <el-row :gutter="30">
            <el-col :span="8">
              <div class="data-wrap">
                <div class="item">
                  <span class="title">注册人数</span>
                  <span class="value">{{ todayData.countRegist }}</span>
                </div>
                <div class="item">
                  <span class="title">认证人数</span>
                  <span class="value">{{ todayData.countIdentify }}</span>
                </div>
                <div class="item">
                  <span class="title">借款单数</span>
                  <span class="value">{{ todayData.countCash }}</span>
                </div>
                <div class="item">
                  <span class="title">放款单数</span>
                  <span class="value">{{ todayData.countCollection }}</span>
                </div>
                <div class="item">
                  <span class="title">还款单数</span>
                  <span class="value">{{ todayData.countRepayment }}</span>
                </div>
                <div class="item">
                  <span class="title">展期单数</span>
                  <span class="value">{{ todayData.countExtend }}</span>
                </div>
                <div class="item">
                  <span class="title">逾期单数</span>
                  <span class="value">{{ todayData.countOverdue }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="data-wrap">
                <div class="item">
                  <span class="title">借款金额</span>
                  <span class="value">{{ todayData.cashMoney }}</span>
                </div>
                <div class="item">
                  <span class="title">放款金额</span>
                  <span class="value">{{ todayData.collectionMoney }}</span>
                </div>
                <div class="item">
                  <span class="title">还款金额</span>
                  <span class="value">{{ todayData.repaymentMoney }}</span>
                </div>
                <div class="item">
                  <span class="title">展期金额</span>
                  <span class="value">{{ todayData.extendMoney }}</span>
                </div>
                <div class="item">
                  <span class="title">逾期金额</span>
                  <span class="value">{{ todayData.overdueMoney }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="data-wrap">
                <div class="item">
                  <span class="title">认证率</span>
                  <span class="value">{{ countRate(todayData.countIdentify, todayData.countRegist) }}%</span>
                </div>
                <div class="item">
                  <span class="title">放款率</span>
                  <span class="value">{{ countRate(todayData.countCollection, todayData.countCash) }}%</span>
                </div>
                <div class="item">
                  <span class="title">还款率</span>
                  <span class="value">{{ countRate(todayData.countRepayment, todayData.countCollection) }}%</span>
                </div>
                <div class="item">
                  <span class="title">逾期率</span>
                  <span class="value">{{ countRate(todayData.countOverdue, todayData.countCollection) }}%</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-card shadow="hover" style="margin-top: 20px">
      <div v-echarts="barChartOptions" id="this-is-bar-chart" class="chart"/>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Dashboard',
  components: { },
  data() {
    return {
      todayData: {},
      historyData: {},
      turnoverList: []
    }
  },
  computed: {
    barChartOptions() {
      const turnoverList = []
      this.turnoverList.map((item) => {
        turnoverList.push(item)
      })
      turnoverList.sort((a, b) => {
        return moment(a.clickDate).isAfter(b.clickDate)
      })
      const xData = []
      const yData = []
      const yData2 = []
      this.turnoverList.map((item) => {
        xData.push(moment(item.clickDate).format('YYYY-MM-DD'))
        yData.push(item.countStatistics)
        yData2.push(item.sumStatistics)
      })
      return {
        color: [
          '#19d4ae', '#5ab1ef', '#fa6e86',
          '#ffb980', '#0067a6', '#c4b4e4',
          '#d87a80', '#9cbbff', '#d9d0c7',
          '#87a997', '#d49ea2', '#5b4947',
          '#7ba3a8'
        ],
        title: {
          text: '15天内进出金额统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['放款金额', '还款金额']
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '8%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData,
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
        series: [
          {
            name: '放款金额',
            type: 'line',
            stack: '总量',
            data: yData
          },
          {
            name: '还款金额',
            type: 'line',
            stack: '总量',
            data: yData2
          }
        ]
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
      this.$http.post('sys_index/StatisticsToday', {
        type: 1
      }).then((res) => {
        this.todayData = res.data
      }).catch(() => {
      })
      this.$http.post('sys_index/StatisticsToday', {
        type: 0
      }).then((res) => {
        this.historyData = res.data
      }).catch(() => {
      })
      this.$http.post('sys_index/turnoverList').then((res) => {
        this.turnoverList = res.data
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/variables.scss";
  .date {
    float: right;
    color: $theme-color;
  }
  .chart {
    width: 100%;
    height: 400px;
  }
  .data-wrap {
    cursor: pointer;
    .item {
      margin: 5px 0;
      line-height: 20px;
      height: 20px;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        background-color: $hover-color;
      }
    }
    .value {
      float: right;
      font-size: 18px;
    }
    .title {
      font-size: 14px;
      vertical-align: text-bottom;
    }
  }
</style>
