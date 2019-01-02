<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="left" label-width="60px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="name" label="名称：">
                <el-input v-model="searchForm.name"/>
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
        :data="roleList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="ID" align="center" width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="handleSet(scope.row)">设置权限</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加角色':'修改角色'" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="left" label-width="80px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="dialogForm.name"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="setMenuFormVisible" title="设置权限" @closed="handleSetMenuCancel">
      <el-tree
        ref="tree"
        :data="menuTree"
        :expand-on-click-node="false"
        :default-checked-keys="checkedKeys"
        show-checkbox
        node-key="id"
        highlight-current>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <el-tag v-if="data.type === 2 && data.isLeaf === 1" size="mini">{{ node.label }}</el-tag>
          <el-tag v-if="data.type === 2 && data.isLeaf === 2" type="warning" size="mini">{{ node.label }}</el-tag>
          <el-tag v-if="data.type === 1" type="info" size="mini">{{ node.label }}</el-tag>
      </span></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSetMenuCancel">取消</el-button>
        <el-button :loading="setMenuLoading" type="primary" @click="handleSetMenuConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
const dialogFormBase = {
  isSuper: 2,
  name: ''
}
const searchFormBase = {
  name: ''
}

export default {
  name: 'SystemAuthRole',
  components: { Pagination },
  data() {
    return {
      searchLoading: false,
      loading: false,
      setMenuLoading: false,
      listLoading: false,
      setMenuFormVisible: false,
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      dialogForm: Object.assign({}, dialogFormBase),
      dialogFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      searchForm: Object.assign({}, searchFormBase),
      roleList: [],
      menuTree: [],
      checkedKeys: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      },
      currentSize: 0,
      currentRoleId: ''
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
      this.$http.post('permission/querySysRoleInfos', {
        ...this.searchForm,
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.roleList = res.data.items
        this.currentSize = res.data.items.length
        this.listTotal = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetPaging() {
      this.paging.pageNo = 1
    },
    handleSearch() {
      this.resetPaging()
      this.queryList()
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
      this.dialogFormVisible = true
      this.dialogFormStatus = 'edit'
      this.dialogForm = {
        name: row.name,
        id: row.id
      }
    },
    handleSet(row) {
      this.setMenuFormVisible = true
      this.currentRoleId = row.id
      this.$http.get(`permission/setAuthoritysPageData/${row.id}`).then((res) => {
        const menuList = JSON.parse(res.data.authoritys)
        console.log(menuList)
        this.menuTree = this.formatTree(menuList)
      })
    },
    formatTree(tree) {
      const tempTree = []
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i]
        let menu = {}
        const newId = `${item.id}|${item.type}`
        if (item.type === 2) {
          menu = {
            id: newId,
            label: item.text,
            isLeaf: item.isLeaf,
            link: item.link,
            type: item.type
          }
          if (item.isLeaf === 2 && !item.nodes) {
            if (item.state && item.state.checked) {
              this.checkedKeys.push(newId)
            }
          }
          if (item.nodes) {
            menu.children = this.formatTree(item.nodes)
          }
        } else {
          // 按钮
          menu = {
            id: newId,
            label: item.text,
            type: item.type
          }
          if (item.state && item.state.checked) {
            this.checkedKeys.push(newId)
          }
        }
        tempTree.push(menu)
      }
      return tempTree
    },
    closeSetMenu() {
      this.setMenuFormVisible = false
      this.currentRoleId = ''
      this.menuTree = []
      this.checkedKeys = []
    },
    handleSetMenuCancel() {
      this.closeSetMenu()
    },
    handleSetMenuConfirm() {
      let keys = this.$refs.tree.getHalfCheckedKeys()
      keys = keys.concat(this.$refs.tree.getCheckedKeys())
      console.log(keys)
      this.setMenuLoading = true
      this.$http.post('permission/setAuthoritys', {
        authoritys: keys.join(','),
        roleId: this.currentRoleId
      }).then(() => {
        this.$message({
          type: 'success',
          message: '设置成功!'
        })
        this.setMenuLoading = false
        this.closeSetMenu()
      }).catch(() => {
        this.setMenuLoading = false
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`permission/deleteSysRoleInfo/${row.id}`).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.verifyAfterDelete()
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
            this.dialogFormStatus === 'add' ? 'permission/addSysRoleInfo' : 'permission/editSysRoleInfo',
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
    }
  }
}
</script>
