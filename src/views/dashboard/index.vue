<template>
  <div class="app-container">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>统计信息</span>
            <span class="date">(2018-12-24)</span>
          </div>
          <div class="data-wrap">
            <div class="item">
              <span class="title">注册人数</span>
              <span class="value">1</span>
            </div>
            <div class="item">
              <span class="title">借款单数</span>
              <span class="value">1</span>
            </div>
            <div class="item">
              <span class="title">放款单数</span>
              <span class="value">1</span>
            </div>
            <div class="item">
              <span class="title">还款单数</span>
              <span class="value">1</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>渠道信息</span>
            <span class="date">(2018-12-24)</span>
          </div>
          <div class="data-wrap">
            <div class="item">
              <span class="title">注册量</span>
              <span class="value">1</span>
            </div>
            <div class="item">
              <span class="title">进件量</span>
              <span class="value">1</span>
            </div>
            <div class="item">
              <span class="title">放款量</span>
              <span class="value">1</span>
            </div>
            <div class="item">
              <span class="title">拒绝量</span>
              <span class="value">1</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>历史信息</span>
            <span class="date">(2018-12-24)</span>
          </div>
          <div class="data-wrap">
            <div class="item">
              <span class="title">历史放款总量(笔)</span>
              <span class="value">1</span>
            </div>
            <div class="item">
              <span class="title">历史还款总量(笔)</span>
              <span class="value">1</span>
            </div>
            <div class="item">
              <span class="title">待还总额(元)</span>
              <span class="value">1</span>
            </div>
            <div class="item">
              <span class="title">逾期未还总额(元)</span>
              <span class="value">1</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card shadow="hover" style="margin-top: 20px">
      <div v-echarts="barChartOptions" id="this-is-bar-chart" class="chart"/>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  components: { },
  data() {
    return {
    }
  },
  computed: {
    barChartOptions() {
      return {
        color: [
          '#19d4ae', '#5ab1ef', '#fa6e86',
          '#ffb980', '#0067a6', '#c4b4e4',
          '#d87a80', '#9cbbff', '#d9d0c7',
          '#87a997', '#d49ea2', '#5b4947',
          '#7ba3a8'
        ],
        title: {
          text: '折线图堆叠'
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '还款金额',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
    }
  },
  created() {
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
