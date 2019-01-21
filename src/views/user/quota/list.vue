<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="left" label-width="90px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="userName" label="用户账号：">
                <el-input v-model="searchForm.userName"/>
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
        key="id"
        :data="quotaList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="用户ID" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总额度" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="可借额度" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="冻结金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.freezeAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="90">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">调整</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" title="修改额度" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="100px">
        <el-form-item prop="type" label="类型：">
          <el-select v-model="dialogForm.type" style="width: 100%">
            <el-option v-for="(item) in QUOTA_TYPE" :key="item.number" :value="item.number" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="名称：">
          <el-select v-model="dialogForm.name" style="width: 100%">
            <el-option v-for="(item) in QUOTA_NAME" :key="item.number" :value="item.number" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="amount" label="操作金额：">
          <el-input v-model="dialogForm.amount"/>
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
          <el-input :autosize="{ minRows: 2}" v-model="dialogForm.remark" type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import excel from '@/vendor/Export2Excel'
const searchFormBase = {
  userName: ''
}
const dialogFormBase = {
  type: 0,
  name: 0,
  amount: '',
  remark: '',
  total: '',
  balance: '',
  freezeAmount: ''
}

export default {
  name: 'UserQuotaList',
  components: { Pagination },
  data() {
    return {
      downloadLoading: false,
      searchLoading: false,
      loading: false,
      listLoading: false,
      dialogFormVisible: false,
      dialogForm: Object.assign({}, dialogFormBase),
      searchForm: Object.assign({}, searchFormBase),
      dialogFormRules: {
      },
      quotaList: [],
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
      this.$http.post('user/accountList', {
        ...this.searchForm,
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.quotaList = res.data.list
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
    handleEdit(row) {
      this.dialogFormVisible = true
      this.dialogForm = this.copyKeys(dialogFormBase, row)
      this.dialogForm.id = row.id
      this.dialogForm.userId = row.userId
      this.dialogForm.total = row.totalMoney
    },
    closeForm() {
      this.dialogFormVisible = false
      this.dialogForm = Object.assign({}, dialogFormBase)
    },
    handleCancel() {
      this.closeForm()
    },
    handleConfirm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post(
            'user/updateAccount',
            this.dialogForm
          ).then(() => {
            this.loading = false
            this.closeForm()
            this.initPage()
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j] || ''
      }))
    },
    handleExport() {
      this.downloadLoading = true
      this.$http.post('user/accountList', {
        ...this.searchForm
      }).then((res) => {
        const list = res.data.list
        const tHeader = ['用户ID', '用户账号', '真实姓名', '总额度', '可借额度', '冻结金额']
        const filterVal = ['userId', 'userName', 'realName', 'totalMoney', 'balance', 'freezeAmount']
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户额度列表',
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
