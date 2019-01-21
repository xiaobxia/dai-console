<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="left" label-width="80px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="repaymentId" label="订单ID：">
                <el-input v-model="searchForm.repaymentId"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="payMobile" label="支付手机号：" label-width="100px">
                <el-input v-model="searchForm.payMobile"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="payType" label="支付方式：" label-width="90px">
                <el-select v-model="searchForm.payType" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option v-for="(item) in PAY_TYPE" :key="item.number" :value="item.number" :label="item.label"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="isConfirm" label="审核状态：" label-width="90px">
                <el-select v-model="searchForm.isConfirm" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option v-for="(item) in IS_CONFIRM" :key="item.number" :value="item.number" :label="item.label"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: right">
          <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        key="id"
        :data="informList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="expand" label="展开" width="50">
          <template slot-scope="props">
            <el-form>
              <el-row :gutter="12">
                <el-form-item label="备注：" style="margin: 0">
                  <span class="value">  {{ props.row.mark }}</span>
                </el-form-item>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单ID" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.repaymentId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.payMobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.payMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" align="center">
          <template slot-scope="scope">
            <span>{{ formatPayType(scope.row.payType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付订单号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.payCno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.payTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <span>{{ formatISConfirm(scope.row.isConfirm) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提交人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleApproval(scope.row)">审批</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" title="审批" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="110px">
        <el-form-item prop="repaymentId" label="订单id：">
          <el-input v-model="dialogForm.repaymentId"/>
        </el-form-item>
        <el-form-item prop="payType" label="支付方式：">
          <el-select v-model="dialogForm.payType" style="width: 100%">
            <el-option v-for="(item) in PAY_TYPE" :key="item.number" :value="item.number" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="isConfirm" label="审核状态：">
          <el-select v-model="dialogForm.isConfirm" style="width: 100%">
            <el-option v-for="(item) in IS_CONFIRM" :key="item.number" :value="item.number" :label="item.label"/>
          </el-select>
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

const dialogFormBase = {
  repaymentId: '',
  payType: 0,
  id: '',
  isConfirm: ''
}
const searchFormBase = {
  repaymentId: '',
  payMobile: '',
  payType: '',
  isConfirm: ''
}

export default {
  name: 'FinanceOtherPayTypeList',
  components: { Pagination },
  data() {
    return {
      searchLoading: false,
      loading: false,
      listLoading: false,
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      dialogForm: Object.assign({}, dialogFormBase),
      dialogFormRules: {
      },
      searchForm: Object.assign({}, searchFormBase),
      informList: [],
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
      this.$http.post('collection/informlist', {
        ...this.searchForm,
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.informList = res.data.list
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
    verifyAfterDelete() {
      if (this.currentSize < 2) {
        if (this.paging.pageNo > 1) {
          this.paging.pageNo = this.paging.pageNo - 1
        }
      }
    },
    handleApproval(row) {
      this.dialogFormVisible = true
      this.dialogForm = this.copyKeys(dialogFormBase, row)
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
            this.dialogFormStatus === 'add' ? 'collection/approve' : '',
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
    }
  }
}
</script>
