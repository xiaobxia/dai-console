<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增</el-button>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加菜单':'修改菜单'">
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
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      dialogForm: Object.assign({}, dialogFormBase),
      formRules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ifAddDialogForm() {
      return this.dialogFormStatus === 'add'
    }
  },
  created() {
  },
  methods: {
    closeForm() {
      this.dialogFormVisible = false
      this.dialogForm = Object.assign({}, dialogFormBase)
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    handleCancel() {
      this.closeForm()
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
