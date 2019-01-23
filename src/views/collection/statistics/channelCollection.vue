<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="right" label-width="60px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="suId" label="ID：">
                <el-input v-model="searchForm.suId"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="collectionName" label="催收人昵称：" label-width="120px">
                <el-input v-model="searchForm.collectionName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="time" label="时间：">
                <el-date-picker
                  v-model="searchForm.time"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: right">
          <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置</el-button>
          <el-button :loading="downloadLoading" class="filter-item" icon="el-icon-download" type="primary" @click="handleExport">导出</el-button>
          <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        key="id"
        :data="channelCollectionList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="渠道名称" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.routeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道总数量" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.countCollection }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道还款数量" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.countRepayment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道展期数量" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.countExtend }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道逾期数量" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.countCollection - scope.row.countRepayment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道总金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.collectionMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道还款金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repaymentMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道展期金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.extendMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="还款率" align="center">
          <template slot-scope="scope">
            <span>{{ countRate(scope.row.countRepayment, scope.row.countCollection) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="展期率" align="center">
          <template slot-scope="scope">
            <span>{{ countRate(scope.row.countExtend, scope.row.countCollection) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期率" align="center">
          <template slot-scope="scope">
            <span>{{ countRate(scope.row.countCollection - scope.row.countRepayment, scope.row.countCollection) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import moment from 'moment'
import excel from '@/vendor/Export2Excel'
const searchFormBase = {
  suId: '',
  collectionName: '',
  time: ['', '']
}

export default {
  name: 'CollectionStatisticsChannelCollection',
  components: { Pagination },
  data() {
    return {
      searchLoading: false,
      downloadLoading: false,
      loading: false,
      listLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      channelCollectionList: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      },
      currentSize: 0
    }
  },
  computed: {
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.queryList()
    },
    queryList() {
      this.listLoading = true
      this.$http.post('route/channelCollection', {
        // ...this.formatSearch(),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.channelCollectionList = res.data.list
        this.currentSize = res.data.list.length
        this.listTotal = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    formatSearch() {
      const data = {}
      for (const key in this.searchForm) {
        if (key === 'time') {
          if (this.searchForm['time'][0]) {
            data.beginTime = moment(this.searchForm.time[0]).format('YYYY-MM-DD')
            data.endTime = moment(this.searchForm.time[1]).format('YYYY-MM-DD')
          }
        } else {
          data[key] = this.searchForm[key]
        }
      }
      return data
    },
    resetPaging() {
      this.paging.pageNo = 1
    },
    handleSearch() {
      this.resetPaging()
      this.queryList()
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, searchFormBase)
    },
    handleExport() {
      this.downloadLoading = true
      this.$http.post('route/channelCollection', {
        ...this.formatSearch()
      }).then((res) => {
        const list = res.data.list
        const exportConfig = {
          routeName: {
            name: '渠道名称'
          },
          countCollection: {
            name: '渠道总数量'
          },
          countRepayment: {
            name: '渠道还款数量'
          },
          countExtend: {
            name: '渠道展期数量'
          },
          '渠道逾期数量': {
            name: '渠道逾期数量',
            count: (params) => {
              return params[1] - params[0]
            },
            countKeys: ['countRepayment', 'countCollection']
          },
          collectionMoney: {
            name: '渠道总金额'
          },
          repaymentMoney: {
            name: '渠道还款金额'
          },
          extendMoney: {
            name: '渠道展期金额'
          },
          '还款率': {
            name: '还款率',
            count: (params) => {
              return this.countRate(params[0], params[1])
            },
            countKeys: ['countRepayment', 'countCollection']
          },
          '展期率': {
            name: '展期率',
            count: (params) => {
              return this.countRate(params[0], params[1])
            },
            countKeys: ['countExtend', 'countCollection']
          },
          '逾期率': {
            name: '逾期率',
            count: (params) => {
              return this.countRate(params[1] - params[0], params[1])
            },
            countKeys: ['countRepayment', 'countCollection']
          }
        }
        const data = this.formatExport(exportConfig, list)
        excel.export_json_to_excel({
          header: data.tHeader,
          data: data.data,
          filename: '个人催回量统计',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      }).catch(() => {
        this.downloadLoading = false
      })
    }
  }
}
</script>
