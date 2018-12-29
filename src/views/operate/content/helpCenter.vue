<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="left" label-width="90px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="title" label="问题标题：">
                <el-input v-model="searchForm.title"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="type" label="问题类型：">
                <el-select v-model="searchForm.type" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option value="0" label="认证相关"/>
                  <el-option value="1" label="借款相关"/>
                  <el-option value="2" label="还款相关"/>
                  <el-option value="3" label="费用相关"/>
                  <el-option value="4" label="其他问题"/>
                </el-select>
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
        :data="helpList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="expand" label="展开" width="80">
          <template slot-scope="props">
            <el-form>
              <el-row :gutter="12">
                <el-form-item label="内容：" style="margin: 0">
                  <span class="value">  {{ props.row.content }}</span>
                </el-form-item>
                <el-form-item label="备注：" style="margin: 0">
                  <span class="value">  {{ props.row.mark }}</span>
                </el-form-item>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            <span>{{ formatType(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="170">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加问题':'修改问题'" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="110px">
        <el-form-item prop="title" label="问题标题：">
          <el-input v-model="dialogForm.title"/>
        </el-form-item>
        <el-form-item prop="content" label="问题内容：">
          <el-input :autosize="{ minRows: 2}" v-model="dialogForm.content" type="textarea"/>
        </el-form-item>
        <el-form-item prop="type" label="问题类型：">
          <el-select v-model="dialogForm.type" class="filter-item">
            <el-option value="0" label="认证相关"/>
            <el-option value="1" label="借款相关"/>
            <el-option value="2" label="还款相关"/>
            <el-option value="3" label="费用相关"/>
            <el-option value="4" label="其他问题"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!ifAddDialogForm" prop="isDel" label="是否删除：">
          <el-select v-model="dialogForm.isDel" class="filter-item">
            <el-option :value="0" label="未删除"/>
            <el-option :value="1" label="已删除"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="mark" label="问题备注：">
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
const dialogFormBase = {
  title: '',
  type: '0',
  content: '',
  mark: ''
}
const searchFormBase = {
  title: '',
  type: ''
}

export default {
  name: 'OperateContentHelpCenter',
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
        title: [{ required: true, message: '请输入问题标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入问题内容', trigger: 'blur' }]
      },
      searchForm: Object.assign({}, searchFormBase),
      helpList: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      },
      currentSize: 0
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
      this.$http.post('announcement/findHelpCenter', {
        ...this.searchForm,
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.helpList = res.data.list
        this.currentSize = res.data.list.length
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
        title: row.title,
        type: row.type,
        content: row.content,
        mark: row.mark,
        id: row.id,
        isDel: parseInt(row.isDel)
      }
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`announcement/editHelpCenter`, {
          id: row.id,
          isDel: 1
        }).then((res) => {
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
            this.dialogFormStatus === 'add' ? 'announcement/addHelpCenter' : 'announcement/editHelpCenter',
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
    formatType(row) {
      if (row.type === '0') {
        return '认证相关'
      } else if (row.type === '1') {
        return '借款相关'
      } if (row.type === '2') {
        return '还款相关'
      } else if (row.type === '3') {
        return '费用相关'
      } else if (row.type === '4') {
        return '其他问题'
      } else {
        return '未知'
      }
    }
  }
}
</script>
