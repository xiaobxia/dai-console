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
              <el-form-item prop="mobile" label="用户手机号：" label-width="110px">
                <el-input v-model="searchForm.mobile"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="time" label="提交时间：">
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
              <el-form-item prop="state" label="借款状态：">
                <el-select v-model="searchForm.state" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option v-for="(item) in loanStateList" :key="item.state" :value="item.state" :label="item.name"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置</el-button>
              <el-button :loading="downloadLoading" class="filter-item" icon="el-icon-download" type="primary" @click="handleExport">导出</el-button>
              <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        v-loading="listLoading"
        key="cno"
        :data="loanList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="借款编号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cashUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款总额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款期限" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.period }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款状态" align="center">
          <template slot-scope="scope">
            <span>{{ formatLoanState(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请次数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.countApply }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作" align="center" width="170">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>-->
        <!--<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加借款':'修改借款'" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="110px">
        <el-form-item prop="title" label="借款标题：">
          <el-input v-model="dialogForm.title"/>
        </el-form-item>
        <el-form-item prop="content" label="借款内容：">
          <el-input :autosize="{ minRows: 2}" v-model="dialogForm.content" type="textarea"/>
        </el-form-item>
        <el-form-item prop="type" label="借款类型：">
          <el-select v-model="dialogForm.type">
            <el-option :value="0" label="系统借款"/>
            <el-option :value="1" label="营销借款"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!ifAddDialogForm" prop="isDel" label="是否删除：">
          <el-select v-model="dialogForm.isDel">
            <el-option :value="0" label="未删除"/>
            <el-option :value="1" label="已删除"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="mark" label="借款备注：">
          <el-input v-model="dialogForm.mark"/>
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
import excel from '@/vendor/Export2Excel'

const dialogFormBase = {
  title: '',
  type: 0,
  content: '',
  mark: ''
}
const searchFormBase = {
  cno: '',
  mobile: '',
  time: ['', ''],
  state: ''
}

const loanStateList = [
  {
    state: -3,
    name: '放款失败'
  },
  {
    state: -2,
    name: '审核失败'
  },
  {
    state: -1,
    name: '待审核'
  },
  {
    state: 0,
    name: '审核中'
  },
  {
    state: 11,
    name: '机审成功'
  },
  {
    state: 1,
    name: '审核成功'
  },
  {
    state: 2,
    name: '待还款'
  },
  {
    state: 3,
    name: '已展期'
  },
  {
    state: 4,
    name: '已逾期'
  },
  {
    state: 5,
    name: '还款'
  },
  {
    state: 6,
    name: '逾期-已还款'
  }
]

export default {
  name: 'LoadUserLoanList',
  components: { Pagination },
  data() {
    return {
      downloadLoading: false,
      searchLoading: false,
      loading: false,
      listLoading: false,
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      dialogForm: Object.assign({}, dialogFormBase),
      dialogFormRules: {
        title: [{ required: true, message: '请输入借款标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入借款内容', trigger: 'blur' }]
      },
      searchForm: Object.assign({}, searchFormBase),
      loanList: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      },
      currentSize: 0,
      loanStateList
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
      this.$http.post('cashloan/cashlist', {
        ...this.formatSearch(),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.loanList = res.data.list
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
    handleEdit(row) {
      // this.dialogFormVisible = true
      // this.dialogFormStatus = 'edit'
      // this.dialogForm = {
      //   title: row.title,
      //   type: parseInt(row.type),
      //   content: row.content,
      //   mark: row.mark,
      //   id: row.id,
      //   isDel: parseInt(row.isDel)
      // }
    },
    handleDelete(row) {
      // this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$http.post(`announcement/editAnnouncement`, {
      //     id: row.id,
      //     isDel: 1
      //   }).then((res) => {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      //     this.verifyAfterDelete()
      //     this.initPage()
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    },
    handleConfirm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post(
            this.dialogFormStatus === 'add' ? 'announcement/addAnnouncement' : 'announcement/editAnnouncement',
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
    formatLoanState(state) {
      const loanState = loanStateList.find((item) => {
        return item.state === state
      })
      if (loanState) {
        return loanState.name
      }
      return '未知'
    },
    handleExport() {
      this.downloadLoading = true
      this.$http.post('cashloan/cashlist', {
        ...this.formatSearch()
      }).then((res) => {
        const list = res.data.list
        const exportConfig = {
          cno: {
            name: '借款编号'
          },
          cashUser: {
            name: '用户'
          },
          mobile: {
            name: '手机号'
          },
          totalAmount: {
            name: '借款总额'
          },
          period: {
            name: '借款期限'
          },
          addTime: {
            name: '申请时间'
          },
          state: {
            name: '借款状态',
            format: this.formatLoanState
          }
        }
        const data = this.formatExport(exportConfig, list)
        excel.export_json_to_excel({
          header: data.tHeader,
          data: data.data,
          filename: '用户借款列表',
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
