<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div slot="header" class="clearfix">
        <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增根菜单</el-button>
      </div>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-tree
            ref="tree"
            :data="menuTree"
            :expand-on-click-node="false"
            default-expand-all
            node-key="id"
            highlight-current>
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <el-tag v-if="data.isLeaf === 1" size="mini">{{ node.label }}</el-tag>
              <el-tag v-if="data.isLeaf === 2" type="warning" size="mini">{{ node.label }}</el-tag>
              <span class="custom-tree-button">
                <el-button
                  v-if="node.level < 3 && data.isLeaf === 1"
                  type="text"
                  size="mini"
                  @click="() => appendMenu(node, data)">
                  添加
                </el-button>
                <el-button
                  v-if="!ifNotDelete(data)"
                  type="text"
                  size="mini"
                  @click="() => editMenu(node, data)">
                  编辑
                </el-button>
                <el-button
                  v-if="!ifNotDelete(data)"
                  type="text"
                  size="mini"
                  @click="() => removeMenu(node, data)">
                  删除
                </el-button>
              </span>
          </span></el-tree>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加菜单':'修改菜单'" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="100px">
        <el-form-item v-if="ifAddDialogForm && !ifRoot && dialogForm.level !== 2" prop="isLeaf" label="菜单类型：">
          <el-select v-model="dialogForm.isLeaf" style="width: 100%">
            <el-option :value="1" label="目录"/>
            <el-option :value="2" label="菜单"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="菜单名称：">
          <el-input v-model="dialogForm.title"/>
        </el-form-item>
        <el-form-item v-if="dialogForm.isLeaf === 2" prop="link" label="菜单链接：">
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
  title: '',
  link: '',
  isLeaf: 1,
  type: 2,
  level: 0,
  pid: 0
}

export default {
  name: 'SystemAuthMenu',
  components: { Pagination },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      ifRoot: true,
      dialogForm: Object.assign({}, dialogFormBase),
      dialogFormRules: {
        title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        link: [{ required: true, message: '请输入菜单链接', trigger: 'blur' }]
      },
      menuTree: []
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
      this.$http.get('permission/sysMenuInfoPageData').then((res) => {
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
    appendMenu(node, data) {
      this.dialogForm.pid = data.id
      // 后端0开始，组件1开始
      this.dialogForm.level = node.level
      if (node.level === 2) {
        this.dialogForm.isLeaf = 2
      }
      this.dialogFormVisible = true
      this.dialogFormStatus = 'add'
      this.ifRoot = false
    },
    editMenu(node, data) {
      this.ifRoot = node.level === 1
      this.dialogFormVisible = true
      this.dialogFormStatus = 'edit'
      this.dialogForm = {
        isLeaf: data.isLeaf,
        title: data.label,
        link: data.link,
        id: data.id
      }
    },
    removeMenu(node, data) {
      this.handleShowDelete(node, data)
    },
    closeForm() {
      this.dialogFormVisible = false
      this.ifRoot = true
      this.dialogForm = Object.assign({}, dialogFormBase)
    },
    handleCancel() {
      this.closeForm()
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogFormStatus = 'add'
      this.ifRoot = true
    },
    handleShowDelete(node, data) {
      this.$confirm(`此操作将删除菜单“ ${data.label} ”, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`permission/deleteSysMenuInfo/${data.id}`).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.initPage()
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
            this.dialogFormStatus === 'add' ? 'permission/addSysMenuInfo' : 'permission/editSysMenuInfo',
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
    ifNotDelete(data) {
      return ['系统管理', '权限管理', '管理员列表', '角色列表', '菜单列表', '菜单按钮列表'].indexOf(data.label) !== -1
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
