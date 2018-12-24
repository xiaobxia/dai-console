<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增</el-button>
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
        <el-table-column label="id" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
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
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加菜单':'修改菜单'" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="formRules" label-position="left" label-width="80px">
        <el-form-item prop="name" label="菜单名称">
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

const dialogFormBase = {
  name: ''
}

export default {
  name: 'SystemAuthMenu',
  components: { },
  data() {
    return {
      loading: false,
      listLoading: false,
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      dialogForm: Object.assign({}, dialogFormBase),
      formRules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
      },
      menuList: []
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
      this.listLoading = true
      this.$http.get('/article/list').then((res) => {
        this.listLoading = false
        this.menuList = res.items
        console.log(res)
      }).catch(() => {
        this.listLoading = false
      })
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
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogFormStatus = 'add'
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.dialogFormStatus = 'edit'
      this.dialogForm = Object.assign({}, row)
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
