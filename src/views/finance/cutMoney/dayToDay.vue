<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="right" label-width="90px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="userName" label="用户账号：">
                <el-input v-model="searchForm.userName"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="mobile" label="手机号：">
                <el-input v-model="searchForm.mobile"/>
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
            <el-col :span="6">
              <el-form-item prop="sName" label="操作人：">
                <el-input v-model="searchForm.sName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button :loading="downloadLoading" class="filter-item" icon="el-icon-download" type="primary" @click="handleExport">导出</el-button>
              <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置</el-button>
              <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        v-loading="listLoading"
        key="id"
        :data="cutMoneyList"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        >
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cashMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应还款金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repaymentMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="银行名称" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.bankName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="银行卡号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bankCardNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际扣款金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.witholdMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扣款时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.witholdDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sname }}</span>
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
  userName: '',
  mobile: '',
  sName: '',
  time: ['', '']
}

export default {
  name: 'FinanceCutMoneyDayToDay',
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
      cutMoneyList: [],
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
      this.$http.post('cashloan/witholdStream', {
        ...this.formatSearch(),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.cutMoneyList = res.data.list
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
      this.$http.post('cashloan/witholdStream', {
        ...this.formatSearch()
      }).then((res) => {
        const list = res.data.list
        const exportConfig = {
          userName: {
            name: '姓名'
          },
          mobile: {
            name: '手机号'
          },
          cashMoney: {
            name: '借款金额'
          },
          repaymentMoney: {
            name: '应还款金额'
          },
          bankName: {
            name: '银行名称'
          },
          bankCardNo: {
            name: '银行卡号'
          },
          witholdMoney: {
            name: '实际扣款金额'
          },
          witholdDate: {
            name: '扣款时间'
          },
          sname: {
            name: '操作人'
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
