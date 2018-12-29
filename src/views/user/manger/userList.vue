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
              <el-form-item prop="phone" label="手机号：">
                <el-input v-model="searchForm.phone"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="姓名：">
                <el-input v-model="searchForm.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="身份证：">
                <el-input v-model="searchForm.idCard"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name" label="注册时间：">
                <el-date-picker
                  v-model="searchForm.register"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roles" label="是否黑名单：">
                <el-select v-model="searchForm.black" class="filter-item">
                  <el-option label="全部" value="全部"/>
                  <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roles" label="是否认证：">
                <el-select v-model="searchForm.roles" class="filter-item">
                  <el-option label="全部" value="全部"/>
                  <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
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
        :data="userList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="用户ID" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公司名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.device }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否黑名单" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.blackState }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="170">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
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
  userId: '',
  userName: '',
  mobile: '',
  beginTime: '',
  endTime: '',
  qudao: '',
  blackState: '',
  identifyState: ''
}

export default {
  name: 'UserUserList',
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
      userList: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
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
      console.log(this.paging)
      this.listLoading = true
      this.$http.post('user/findUserList', {
        // ...this.searchForm,
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.userList = res.data.list
        this.listTotal = res.data.total
        console.log(res)
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetPaging() {
      this.paging.pageNo = 1
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
      this.$router.push({ name: 'UserDetail' })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
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
