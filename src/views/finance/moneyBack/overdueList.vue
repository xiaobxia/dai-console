<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="left" label-width="90px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="repaymentId" label="订单号：">
                <el-input v-model="searchForm.repaymentId"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="cashUser" label="借款人姓名：" label-width="110px">
                <el-input v-model="searchForm.cashUser"/>
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
          <el-button :loading="downloadLoading" class="filter-item" icon="el-icon-download" type="primary" @click="handleExport">导出</el-button>
          <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置</el-button>
          <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        key="repaymentId"
        :data="overdueList"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        >
        <el-table-column label="订单ID" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repaymentId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cashUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应还款金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repaymentTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column label="滞纳金" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.overdueInterest }}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期应还总金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.allMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际还款金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repaidTotal }}</span>
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
  repaymentId: '',
  cashUser: '',
  time: ['', '']
}

export default {
  name: 'FinanceMoneyBackOverdueList',
  components: { Pagination },
  data() {
    return {
      searchLoading: false,
      loading: false,
      listLoading: false,
      downloadLoading: false,
      dialogVisible: false,
      dialogType: 'all',
      searchForm: Object.assign({}, searchFormBase),
      overdueList: [],
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
      this.$http.post('cashloan/overdueList', {
        ...this.formatSearch(),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.overdueList = res.data.list
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
    verifyAfterDelete() {
      if (this.currentSize < 2) {
        if (this.paging.pageNo > 1) {
          this.paging.pageNo = this.paging.pageNo - 1
        }
      }
    },
    handleExport() {
      this.downloadLoading = true
      this.$http.post('cashloan/overdueList', {
        ...this.formatSearch()
      }).then((res) => {
        const list = res.data.list
        const exportConfig = {
          repaymentId: {
            name: '订单ID'
          },
          cashUser: {
            name: '借款人'
          },
          mobile: {
            name: '手机号'
          },
          totalAmount: {
            name: '借款金额'
          },
          repaymentTotal: {
            name: '应还款金额'
          },
          overdueInterest: {
            name: '滞纳金'
          },
          allMoney: {
            name: '逾期应还总金额'
          },
          repaidTotal: {
            name: '实际还款金额'
          }
        }
        const data = this.formatExport(exportConfig, list)
        excel.export_json_to_excel({
          header: data.tHeader,
          data: data.data,
          filename: '扣款流水列表',
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

