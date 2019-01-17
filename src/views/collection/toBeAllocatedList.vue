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
              <el-form-item prop="username" label="用户姓名：">
                <el-input v-model="searchForm.username"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="mobile" label="手机号：">
                <el-input v-model="searchForm.mobile"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="backTime" label="还款时间：">
                <el-select v-model="searchForm.backTime" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option v-for="(item) in BACK_TIME" :key="item.number" :value="item.number" :label="item.label"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: right">
          <el-button :loading="downloadLoading" class="filter-item" icon="el-icon-download" type="primary" @click="handleExport">导出</el-button>
          <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置</el-button>
          <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
          <el-button class="filter-item" icon="el-icon-more" type="primary" @click="handleAllotAll">分配</el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        key="repaymentId"
        :data="allocatedList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        >
        <el-table-column
          type="selection"
          align="center"
          width="55"/>
        <el-table-column label="订单ID" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.repaymentId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cashMobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cashMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期罚息" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.overdueinterest }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应还时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.revertiableTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应还金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.revertiableMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.orderState }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道来源" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.routeName }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作" align="center" width="80">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button type="primary" size="mini" @click="handleAllotOne(scope.row)">分配</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogVisible" title="分配" @closed="handleCancel">
      <collection-collection-man-list-small :rowchange="useRowChange"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import moment from 'moment'
import excel from '@/vendor/Export2Excel'
import CollectionCollectionManListSmall from './collectionManListSmall.vue'

const searchFormBase = {
  backTime: '',
  repaymentId: '',
  username: '',
  mobile: ''
}

export default {
  name: 'CollectionToBeAllocatedList',
  components: { CollectionCollectionManListSmall, Pagination },
  data() {
    return {
      searchLoading: false,
      loading: false,
      listLoading: false,
      downloadLoading: false,
      dialogVisible: false,
      dialogType: 'all',
      searchForm: Object.assign({}, searchFormBase),
      allocatedList: [],
      multipleSelection: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      },
      currentSize: 0,
      selectUserId: '',
      selectOrderId: ''
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
      this.$http.post('collection/waitallot', {
        ...this.formatSearch(),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.allocatedList = res.data.list
        this.currentSize = res.data.list.length
        this.listTotal = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    formatSearch() {
      const data = {}
      for (const key in this.searchForm) {
        if (key === 'backTime' && this.searchForm['backTime'] !== '') {
          const day = parseInt(this.searchForm['backTime'])
          data.beginTime = moment().add(day, 'day').format('YYYY-MM-DD')
          data.endTime = moment().add(day + 1, 'day').format('YYYY-MM-DD')
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j] || ''
      }))
    },
    handleExport() {
      this.downloadLoading = true
      this.$http.post('collection/waitallot', {
        ...this.formatSearch()
      }).then((res) => {
        const list = res.data.list
        const tHeader = ['订单id', '姓名', '手机号', '借款金额', '逾期罚息', '应还时间', '应还金额', '订单状态', '渠道来源']
        const filterVal = ['repaymentId', 'userName', 'cashMobile', 'cashMoney', 'overdueinterest', 'revertiableTime', 'revertiableMoney', 'orderState', 'routeName']
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '待分配列表',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      }).catch(() => {
        this.downloadLoading = false
      })
    },
    handleAllotAll() {
      if (this.multipleSelection.length > 0) {
        this.dialogVisible = true
        this.dialogType = 'all'
        this.selectUserId = ''
      } else {
        this.$message({
          type: 'info',
          message: '请勾选订单'
        })
      }
    },
    handleCancel() {
      this.dialogVisible = false
      this.dialogType = 'all'
      this.selectUserId = ''
      this.selectOrderId = ''
    },
    handleAllotOne(row) {
      this.dialogVisible = true
      this.dialogType = 'one'
      this.selectUserId = ''
      this.selectOrderId = row.repaymentId
    },
    useRowChange(row) {
      this.selectUserId = row.userId
    },
    handleConfirm() {
      if (this.selectUserId === '') {
        this.$message({
          type: 'info',
          message: '请点击人员'
        })
        return
      }
      const data = {
        type: 0,
        userId: this.selectUserId
      }
      if (this.dialogType === 'one') {
        data.repaymentIds = this.selectOrderId
      } else {
        const repaymentIds = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          repaymentIds.push(this.multipleSelection[i].repaymentId)
        }
        data.repaymentIds = repaymentIds.join(',')
      }
      this.loading = true
      this.$http.post(
        'collection/allotUser',
        data
      ).then(() => {
        this.loading = false
        this.handleCancel()
        this.initPage()
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
