<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="right" label-width="100px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="routeName" label="渠道名称：">
                <el-input v-model="searchForm.routeName"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
        <el-table-column label="ID" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.routeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="添加人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="170">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
const searchFormBase = {
  routeName: ''
}
const dialogFormBase = {
  name: '',
  phone: ''
}

export default {
  name: 'ChannelList',
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
      bankList: []
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
      this.$http.post('route/routeList', {
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.bankList = res.data.list
        console.log(res)
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleSearch() {
      this.queryList()
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
