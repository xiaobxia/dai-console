<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <el-table
        v-loading="listLoading"
        key="id"
        :data="projectList"
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
        <el-table-column label="id" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="期限" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.period }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最大期限" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.maxPeriod }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最小期限" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.minPeriod }}</span>
          </template>
        </el-table-column>
        <el-table-column label="期限单位" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.periodUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目管理费率" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.projectFeeRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日利率" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期日罚息" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.overdueRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="互保准备金利率" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.reservesFeeRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批费利率" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.reviewFeeRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手续费率" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceFeeRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="版本控制" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.version }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加项目':'修改项目'" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="150px">
        <el-form-item prop="name" label="项目名称：">
          <el-input v-model="dialogForm.name"/>
        </el-form-item>
        <el-form-item prop="maxPeriod" label="最大期限：">
          <el-input v-model="dialogForm.maxPeriod" type="number"/>
        </el-form-item>
        <el-form-item prop="minPeriod" label="最小期限：" type="number">
          <el-input v-model="dialogForm.minPeriod"/>
        </el-form-item>
        <el-form-item prop="overdueRate" label="逾期日罚息：" type="number">
          <el-input v-model="dialogForm.overdueRate"/>
        </el-form-item>
        <el-form-item prop="period" label="期限：" type="number">
          <el-input v-model="dialogForm.period"/>
        </el-form-item>
        <el-form-item prop="periodUnit" label="期限单位：">
          <el-input v-model="dialogForm.periodUnit"/>
        </el-form-item>
        <el-form-item prop="projectFeeRate" label="项目管理费率：" type="number">
          <el-input v-model="dialogForm.projectFeeRate"/>
        </el-form-item>
        <el-form-item prop="rate" label="日利率：" type="number">
          <el-input v-model="dialogForm.rate"/>
        </el-form-item>
        <el-form-item prop="reservesFeeRate" label="互保准备金利率：" type="number">
          <el-input v-model="dialogForm.reservesFeeRate"/>
        </el-form-item>
        <el-form-item prop="reviewFeeRate" label="审批费利率：" type="number">
          <el-input v-model="dialogForm.reviewFeeRate"/>
        </el-form-item>
        <el-form-item prop="serviceFeeRate" label="手续费率：" type="number">
          <el-input v-model="dialogForm.serviceFeeRate"/>
        </el-form-item>
        <el-form-item prop="version" label="版本控制：" type="number">
          <el-input v-model="dialogForm.version"/>
        </el-form-item>
        <el-form-item prop="content" label="项目内容：">
          <el-input v-model="dialogForm.content"/>
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
          <el-input v-model="dialogForm.remark"/>
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
  content: '',
  maxPeriod: '',
  minPeriod: '',
  name: '',
  overdueRate: '',
  period: '',
  periodUnit: '',
  projectFeeRate: '',
  rate: '',
  remark: '',
  reservesFeeRate: '',
  reviewFeeRate: '',
  serviceFeeRate: '',
  version: ''
}

export default {
  name: 'SystemConfigLoanParameter',
  components: { Pagination },
  data() {
    return {
      loading: false,
      listLoading: false,
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      dialogForm: Object.assign({}, dialogFormBase),
      dialogFormRules: {
      },
      projectList: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      }
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
      console.log(this.paging)
      this.listLoading = true
      this.$http.post('project/findProjectList', {
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.projectList = res.data.list
        this.listTotal = res.data.total
        console.log(res)
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetPaging() {
      this.paging.pageNo = 1
    },
    verifyAfterDelete() {
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.dialogFormStatus = 'edit'
      this.dialogForm = Object.assign({}, row)
    },
    closeForm() {
      this.dialogFormVisible = false
      this.dialogForm = Object.assign({}, dialogFormBase)
    },
    handleCancel() {
      this.closeForm()
    },
    handleConfirm(row) {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post(
            'project/updateProject',
            this.filterKeys(this.dialogForm, ['addTime', 'updateTime'])
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
