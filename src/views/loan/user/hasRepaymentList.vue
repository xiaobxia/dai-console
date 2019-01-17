<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="left" label-width="90px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="cno" label="借款编号：">
                <el-input v-model="searchForm.cno"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="collectionId" label="催收人ID：">
                <el-input v-model="searchForm.collectionId"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button :loading="downloadLoading" class="filter-item" icon="el-icon-download" type="primary" @click="handleExport">导出</el-button>
              <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        v-loading="listLoading"
        key="cno"
        :data="cashReplyList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="借款编号" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.cno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
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
        <el-table-column label="应还金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repaymentTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际还款金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repaidTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际还款时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.repaidTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际还款方式" align="center">
          <template slot-scope="scope">
            <span>{{ formatPayType(scope.row.repaymentWay) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="催收人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.collectionUser }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import excel from '@/vendor/Export2Excel'

const searchFormBase = {
  type: 0,
  cno: '',
  collectionId: ''
}

export default {
  name: 'LoadUserHasRepaymentList',
  components: { Pagination },
  data() {
    return {
      downloadLoading: false,
      searchLoading: false,
      loading: false,
      listLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      cashReplyList: [],
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
      this.$http.post('cashloan/cashreply', {
        ...this.searchForm,
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.cashReplyList = res.data.list
        this.currentSize = res.data.list.length
        this.listTotal = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
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
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        switch (j) {
          case 'repaymentWay':
            return this.formatPayType(v[j])
        }
        return v[j] || ''
      }))
    },
    handleExport() {
      this.downloadLoading = true
      this.$http.post('cashloan/cashreply', {
        ...this.searchForm
      }).then((res) => {
        const list = res.data.list
        const tHeader = ['借款编号', '姓名', '手机号', '借款金额', '应还金额', '实际还款金额', '实际还款时间', '实际还款方式', '催收人']
        const filterVal = ['cno', 'cashUser', 'mobile', 'totalAmount', 'repaymentTotal', 'repaidTotal', 'repaidTime', 'repaymentWay', 'collectionUser']
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户已还款列表',
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

