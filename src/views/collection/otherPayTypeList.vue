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
                  <el-option :value="0" label="银行支付"/>
                  <el-option :value="1" label="微信支付"/>
                  <el-option :value="2" label="支付宝支付"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="isConfirm" label="审核状态：" label-width="90px">
                <el-select v-model="searchForm.isConfirm" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option :value="0" label="审核通过"/>
                  <el-option :value="1" label="审核未通过"/>
                  <el-option :value="2" label="等待审核"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: right">
          <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
          <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增</el-button>
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
        <el-table-column type="expand" label="展开" width="70">
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
        <el-table-column label="支付时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.payTime }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="通知财务" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ formatInform(scope.row.isInform) }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <span>{{ formatConfirm(scope.row.isConfirm) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提交人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addUser }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '通知财务':'修改公告'" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="110px">
        <el-form-item prop="repaymentId" label="订单id：">
          <el-input v-model="dialogForm.repaymentId"/>
        </el-form-item>
        <el-form-item prop="payMobile" label="支付手机号：">
          <el-input v-model="dialogForm.payMobile"/>
        </el-form-item>
        <el-form-item prop="payType" label="支付方式：">
          <el-select v-model="dialogForm.payType" style="width: 100%">
            <el-option :value="0" label="银行支付"/>
            <el-option :value="1" label="微信支付"/>
            <el-option :value="2" label="支付宝支付"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="payCno" label="支付订单号：">
          <el-input v-model="dialogForm.payCno"/>
        </el-form-item>
        <el-form-item prop="payMoney" label="支付金额：">
          <el-input v-model="dialogForm.payMoney"/>
        </el-form-item>
        <el-form-item prop="payTime" label="支付时间：">
          <el-date-picker
            v-model="dialogForm.payTime"
            style="width: 100%"
            type="datetime"
            placeholder="选择日期时间"/>
        </el-form-item>
        <el-form-item prop="mark" label="备注：">
          <el-input :autosize="{ minRows: 2}" v-model="dialogForm.mark" type="textarea"/>
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
import moment from 'moment'

const dialogFormBase = {
  repaymentId: '',
  payMobile: '',
  payType: 0,
  payCno: '',
  payTime: '',
  payMoney: '',
  mark: ''
}
const searchFormBase = {
  repaymentId: '',
  payMobile: '',
  payType: '',
  isConfirm: ''
}

export default {
  name: 'CollectionOtherPayTypeList',
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
    ifAddDialogForm() {
      return this.dialogFormStatus === 'add'
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
    closeForm() {
      this.dialogFormVisible = false
      this.dialogForm = Object.assign({}, dialogFormBase)
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogFormStatus = 'add'
    },
    handleCancel() {
      this.closeForm()
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(``, {
          id: row.id,
          isDel: 1
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.verifyAfterDelete()
          this.initPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleConfirm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          const postData = {
            ...this.dialogForm
          }
          if (postData.payTime) {
            postData.payTime = moment(postData.payTime).format('YYYY-MM-DD HH:mm:ss')
          }
          this.loading = true
          this.$http.post(
            this.dialogFormStatus === 'add' ? 'collection/informfinance' : '',
            postData
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
