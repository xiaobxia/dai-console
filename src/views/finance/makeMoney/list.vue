<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="right" label-width="100px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="phone" label="打款ID：">
                <el-input v-model="searchForm.id"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="phone" label="订单ID：">
                <el-input v-model="searchForm.id"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roles" label="资方：">
                <el-select v-model="searchForm.black" class="filter-item">
                  <el-option label="全部" value="全部"/>
                  <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="phone" label="银行支付订单：">
                <el-input v-model="searchForm.phone"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="借款期限：">
                <el-input v-model="searchForm.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="用户ID：">
                <el-input v-model="searchForm.idCard"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="用户名：">
                <el-input v-model="searchForm.idCard"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="手机号：">
                <el-input v-model="searchForm.idCard"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roles" label="打款渠道：">
                <el-select v-model="searchForm.black" class="filter-item">
                  <el-option label="全部" value="全部"/>
                  <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roles" label="状态：">
                <el-select v-model="searchForm.black" class="filter-item">
                  <el-option label="全部" value="全部"/>
                  <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roles" label="业务类型：">
                <el-select v-model="searchForm.black" class="filter-item">
                  <el-option label="全部" value="全部"/>
                  <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roles" label="用户来源：">
                <el-select v-model="searchForm.black" class="filter-item">
                  <el-option label="全部" value="全部"/>
                  <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roles" label="审核状态：">
                <el-select v-model="searchForm.black" class="filter-item">
                  <el-option label="全部" value="全部"/>
                  <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roles" label="回调状态：">
                <el-select v-model="searchForm.black" class="filter-item">
                  <el-option label="全部" value="全部"/>
                  <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name" label="申请时间：">
                <el-date-picker
                  v-model="searchForm.register"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name" label="成功时间：">
                <el-date-picker
                  v-model="searchForm.register"
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
          <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        key="id"
        :data="menuList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="打款ID" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务订单ID" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户ID" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="资方" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款期限" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="抵扣券" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手续费" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="利息" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际打款" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="绑卡银行" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="银行卡号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="打款渠道" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="打款状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通知业务放结果" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="第三方状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="成功时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
            <el-button size="mini" type="warning" @click="handlePayDetail(scope.row)">付款查询</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.page" :limit.sync="paging.limit" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加用户':'修改用户'" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="left" label-width="80px">
        <el-form-item prop="name" label="用户名称">
          <el-input v-model="dialogForm.name"/>
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
  name: ''
}
const searchFormBase = {
  name: '',
  phone: ''
}

export default {
  name: 'FinanceMakeMoneyList',
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
        name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }]
      },
      searchForm: Object.assign({}, searchFormBase),
      menuList: [],
      listTotal: 0,
      paging: {
        page: 1,
        limit: 10
      }
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
      this.$http.get('/article/list').then((res) => {
        this.listLoading = false
        this.menuList = res.items
        this.listTotal = res.total
        console.log(res)
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetPaging() {
      this.paging = {
        page: 1,
        limit: 10
      }
    },
    handleSearch() {
      this.resetPaging()
    },
    verifyAfterDelete() {
    },
    closeForm() {
      this.dialogFormVisible = false
      this.dialogForm = Object.assign({}, dialogFormBase)
    },
    handleCancel() {
      this.closeForm()
    },
    handleDetail(row) {
      this.$router.push({ name: 'FinanceMakeMoneyDetail' })
    },
    handlePayDetail(row) {
      this.$router.push({ name: 'FinanceMakeMoneyPayDetail' })
    },
    handleConfirm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.get('ab').then(() => {
            this.loading = false
            this.closeForm()
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
