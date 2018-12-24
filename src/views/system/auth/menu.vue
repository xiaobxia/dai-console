<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增</el-button>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加菜单':'修改菜单'">
      <el-form ref="form" :model="dialogForm" label-position="left" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="dialogForm.name"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确定</el-button>
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
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      dialogForm: Object.assign({}, dialogFormBase)
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
    handleCreate() {
      this.dialogFormVisible = true
    },
    handleClose() {
      this.dialogFormVisible = false
      this.dialogForm = Object.assign({}, dialogFormBase)
    }
  }
}
</script>
