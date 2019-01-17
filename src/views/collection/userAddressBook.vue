<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <el-table
        v-loading="listLoading"
        key="id"
        :data="userAddressList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="ID" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户ID" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAddRecord(scope.row)">添加催收记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" :title="ifAddDialogForm ? '添加催收记录':''" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="130px">
        <el-form-item prop="repaymentId" label="订单ID：">
          <el-input v-model="dialogForm.repaymentId"/>
        </el-form-item>
        <el-form-item prop="collectionType" label="催收类型：">
          <el-select v-model="dialogForm.collectionType" style="width: 100%">
            <el-option v-for="(item) in COLLECTION_TYPE" :key="item.number" :value="item.number" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="comittedRepayment" label="承诺还款：">
          <el-select v-model="dialogForm.comittedRepayment" style="width: 100%">
            <el-option v-for="(item) in COMITTED_REPAYMENT" :key="item.number" :value="item.number" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="isConnect" label="是否接通：">
          <el-select v-model="dialogForm.isConnect" style="width: 100%">
            <el-option v-for="(item) in IS_CONNECT" :key="item.number" :value="item.number" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="collectionName" label="催收联系人：">
          <el-input v-model="dialogForm.collectionName"/>
        </el-form-item>
        <el-form-item prop="collectionPhone" label="催收联系人电话：">
          <el-input v-model="dialogForm.collectionPhone"/>
        </el-form-item>
        <el-form-item prop="collectionRelation" label="与催收人关系：">
          <el-input v-model="dialogForm.collectionRelation"/>
        </el-form-item>
        <el-form-item prop="mark" label="备注：">
          <el-input :autosize="{ minRows: 2}" v-model="dialogForm.mark" type="textarea"/>
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
  repaymentId: '',
  collectionType: 0,
  comittedRepayment: 0,
  isConnect: 0,
  collectionName: '',
  collectionPhone: '',
  collectionRelation: '',
  mark: ''
}

export default {
  name: 'CollectionUserAddressBook',
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
      userAddressList: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      },
      currentSize: 0,
      query: {}
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
      this.query = this.$router.history.current.query
      this.queryList()
    },
    queryList() {
      this.listLoading = true
      this.$http.post('collection/phonebook', {
        userId: parseInt(this.query.userId),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.userAddressList = res.data.list
        this.currentSize = res.data.list.length
        this.listTotal = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetPaging() {
      this.paging.pageNo = 1
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
    handleAddRecord(row) {
      this.dialogFormVisible = true
      this.dialogFormStatus = 'add'
      this.dialogForm = Object.assign(dialogFormBase, {
        repaymentId: this.query.repaymentId,
        collectionName: row.name,
        collectionPhone: row.phoneNumber
      })
    },
    handleCancel() {
      this.closeForm()
    },
    handleConfirm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post(
            this.dialogFormStatus === 'add' ? 'collection/addcollectionrecord' : '',
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
