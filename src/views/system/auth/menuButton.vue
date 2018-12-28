<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <el-tree
              ref="tree"
              :data="menuTree"
              :expand-on-click-node="false"
              node-key="id"
              highlight-current
              @node-click="nodeClick">
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <el-tag v-if="data.isLeaf === 1" size="mini">{{ node.label }}</el-tag>
                <el-tag v-if="data.isLeaf === 2" type="warning" size="mini">{{ node.label }}</el-tag>
              </span>
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card v-if="!currentSelect.isLeaf" shadow="hover">
            请选择菜单
          </el-card>
          <el-card v-else-if="currentSelect.isLeaf === 1" shadow="hover">
            目录无法添加按钮
          </el-card>
          <el-card v-else shadow="hover">
            <div slot="header" class="clearfix">
              <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增按钮</el-button>
            </div>
            <el-table
              v-loading="listLoading"
              key="id"
              :data="buttonList"
              border
              fit
              highlight-current-row
              style="width: 100%;"
            >
              <el-table-column label="按钮CODE" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.code }}</span>
                </template>
              </el-table-column>
              <el-table-column label="描述" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.remark }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="170">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加按钮':'修改按钮'" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="120px">
        <el-form-item prop="code" label="按钮CODE：">
          <el-input v-model="dialogForm.code"/>
        </el-form-item>
        <el-form-item prop="remark" label="按钮描述：">
          <el-input v-model="dialogForm.remark"/>
        </el-form-item>
        <el-form-item prop="link" label="按钮链接：">
          <el-input v-model="dialogForm.link"/>
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
  code: '',
  link: '',
  remark: '',
  menuId: 0
}

export default {
  name: 'SystemAuthMenuButton',
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      loading: false,
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      dialogForm: Object.assign({}, dialogFormBase),
      dialogFormRules: {
        code: [{ required: true, message: '请输入按钮CODE', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入按钮描述', trigger: 'blur' }],
        link: [{ required: true, message: '请输入按钮链接', trigger: 'blur' }]
      },
      currentSelect: {},
      menuTree: [],
      buttonList: []
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
      this.$http.get('permission/sysButtonInfoPageData').then((res) => {
        const menuList = JSON.parse(res.data.menuList)
        console.log(menuList)
        this.menuTree = this.formatTree(menuList)
      })
    },
    formatTree(tree) {
      const tempTree = []
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i]
        const menu = {
          id: item.id,
          label: item.text,
          isLeaf: item.isLeaf,
          link: item.link
        }
        if (item.nodes) {
          menu.children = this.formatTree(item.nodes)
        }
        tempTree.push(menu)
      }
      return tempTree
    },
    nodeClick(data, node) {
      this.currentSelect = data
      if (data.isLeaf === 2) {
        this.queryMenuButton()
      }
    },
    queryMenuButton() {
      this.listLoading = true
      this.$http.post(`permission/selectByMenuId/${this.currentSelect.id}`).then((res) => {
        this.buttonList = res.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleEdit(data) {
      this.dialogFormVisible = true
      this.dialogFormStatus = 'edit'
      this.dialogForm = {
        code: data.code,
        link: data.link,
        remark: data.remark,
        menuId: data.menuId,
        id: data.id
      }
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
      this.dialogForm.menuId = this.currentSelect.id
    },
    handleDelete(data) {
      this.$confirm('此操作将删除按钮, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`permission/deleteSysButtonInfo/${data.id}`).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.queryMenuButton()
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
          this.$http.post(
            this.dialogFormStatus === 'add' ? 'permission/addSysButtonInfo' : 'permission/editSysButtonInfo',
            this.dialogForm
          ).then(() => {
            this.loading = false
            this.closeForm()
            this.queryMenuButton()
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
