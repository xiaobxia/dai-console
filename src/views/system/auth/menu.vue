<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增</el-button>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="添加菜单">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'SystemAuthMenu',
  components: { },
  data() {
    return {
      dialogFormVisible: false,
      addForm: {

      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleCreate() {
      this.dialogFormVisible = true
    },
    handleClose() {
      this.dialogFormVisible = false
    }
  }
}
</script>
