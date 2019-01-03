<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="right" label-width="100px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="routeType" label="渠道类型：">
                <el-select v-model="searchForm.routeType" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option :value="1" label="S"/>
                  <el-option :value="0" label="A"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="routeName" label="渠道名称：">
                <el-input v-model="searchForm.routeName"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="routeLiable" label="渠道负责人：">
                <el-input v-model="searchForm.routeLiable"/>
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
        :data="channelList"
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
        <el-table-column label="渠道链接" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.routeUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道标识" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.routeChannel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道负责人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.routeLiable }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道备注" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.routeMark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道类型" align="center">
          <template slot-scope="scope">
            <span>{{ formatType(scope.row.routeType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="添加人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="170">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" title="添加渠道" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="120px">
        <el-form-item prop="routeName" label="渠道名称">
          <el-input v-model="dialogForm.routeName"/>
        </el-form-item>
        <el-form-item prop="routeUrl" label="渠道链接">
          <el-input v-model="dialogForm.routeUrl"/>
        </el-form-item>
        <el-form-item prop="routeChannel" label="渠道标识">
          <el-input v-model="dialogForm.routeChannel"/>
        </el-form-item>
        <el-form-item prop="routeLiable" label="渠道负责人">
          <el-input v-model="dialogForm.routeLiable"/>
        </el-form-item>
        <el-form-item prop="routeMark" label="渠道备注">
          <el-input v-model="dialogForm.routeMark"/>
        </el-form-item>
        <el-form-item prop="routeType" label="渠道类型：">
          <el-select v-model="dialogForm.routeType" class="filter-item">
            <el-option :value="1" label="S"/>
            <el-option :value="0" label="A"/>
          </el-select>
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
  routeName: '',
  routeLiable: '',
  routeType: ''
}
const dialogFormBase = {
  routeName: '',
  routeUrl: '',
  routeChannel: '',
  routeLiable: '',
  routeMark: '',
  routeType: 1
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
        name: [{ required: true, message: '请输入渠道名称', trigger: 'blur' }]
      },
      channelList: [],
      paging: {
        pageNo: 1,
        pageSize: 10
      },
      listTotal: 0
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
      this.listLoading = true
      this.$http.post('route/routeList', {
        ...this.searchForm,
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.channelList = res.data.list
        this.listTotal = res.data.total
        this.currentSize = res.data.list.length
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
    handleDelete(row) {
      this.$http.post('route/updateRoute', {
        id: row.id,
        deleted: 1
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.initPage()
      })
    },
    closeForm() {
      this.dialogFormVisible = false
      this.dialogForm = Object.assign({}, dialogFormBase)
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.dialogFormStatus = 'edit'
      this.dialogForm = Object.assign({}, row)
      this.dialogForm.routeType = parseInt(this.dialogForm.routeType || '1')
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
          let data = {}
          if (this.dialogFormStatus === 'add') {
            data = this.dialogForm
          } else {
            data = this.filterKeys(this.dialogForm, ['addUser', 'addTime'])
          }
          this.$http.post(
            this.dialogFormStatus === 'add' ? 'route/addRoute' : 'route/updateRoute',
            data
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
    formatType(state) {
      if (state === '1') {
        return 'S'
      } else if (state === '0') {
        return 'A'
      }
      return '未知'
    }
  }
}
</script>
