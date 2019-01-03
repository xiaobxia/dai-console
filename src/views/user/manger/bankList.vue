<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="right" label-width="100px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="userId" label="用户ID：">
                <el-input v-model="searchForm.userId"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="userName" label="用户姓名：">
                <el-input v-model="searchForm.userName"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="mobile" label="用户手机号：">
                <el-input v-model="searchForm.mobile"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name" label="提交时间：">
                <el-date-picker
                  v-model="searchForm.time"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置</el-button>
              <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
              <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        v-loading="listLoading"
        key="id"
        :data="bankList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="借款人ID" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="持卡人姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="银行名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bankName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="银行卡号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bankCardNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开户行地址" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否主卡" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="卡类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="170">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" title="添加银行卡" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="120px">
        <el-form-item prop="name" label="用户ID">
          <el-input v-model="dialogForm.name"/>
        </el-form-item>
        <el-form-item prop="roles" label="开卡银行：">
          <el-select v-model="searchForm.black" class="filter-item">
            <el-option label="全部" value="全部"/>
            <el-option label="生效" value="生效"/>
            <el-option label="失效" value="失效"/>
            <el-option label="已删除" value="已删除"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="roles" label="银行卡类型：">
          <el-select v-model="searchForm.black" class="filter-item">
            <el-option label="信用卡" value="信用卡"/>
            <el-option label="储蓄卡" value="储蓄卡"/>
            <el-option label="未知" value="未知"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="银行卡号">
          <el-input v-model="dialogForm.name"/>
        </el-form-item>
        <el-form-item prop="name" label="预留手机号">
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
import moment from 'moment'
const searchFormBase = {
  userId: '',
  userName: '',
  mobile: '',
  time: ['', '']
}
const dialogFormBase = {
  name: '',
  phone: ''
}

export default {
  name: 'UserBankList',
  components: { Pagination },
  data() {
    return {
      searchLoading: false,
      loading: false,
      listLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      dialogFormVisible: false,
      dialogForm: Object.assign({}, dialogFormBase),
      dialogFormRules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
      },
      bankList: [],
      listTotal: 0,
      currentSize: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      }
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
      console.log(this.paging)
      this.listLoading = true
      this.$http.post('user/findBankList', {
        ...this.formatSearch(),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.bankList = res.data.list
        this.listTotal = res.data.count
        this.currentSize = res.data.list.length
        console.log(res)
      }).catch(() => {
        this.listLoading = false
      })
    },
    formatSearch() {
      const data = {}
      for (const key in this.searchForm) {
        if (key === 'time') {
          if (this.searchForm['time'][0]) {
            // data.beginTime = this.searchForm.time[0]
            // data.endTime = this.searchForm.time[1]
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
    handleCancel() {
      this.closeForm()
    },
    closeForm() {
      this.dialogFormVisible = false
      this.dialogForm = Object.assign({}, dialogFormBase)
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogFormStatus = 'add'
    },
    verifyAfterDelete() {
      if (this.currentSize < 2) {
        if (this.paging.pageNo > 1) {
          this.paging.pageNo = this.paging.pageNo - 1
        }
      }
    },
    handleConfirm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post('ab').then(() => {
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
