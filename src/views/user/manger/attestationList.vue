<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="right" label-width="80px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="userId" label="用户ID：">
                <el-input v-model="searchForm.userId"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="userName" label="姓名：">
                <el-input v-model="searchForm.userName"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="mobile" label="手机号：">
                <el-input v-model="searchForm.mobile"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="state" label="认证状态：" label-width="90px">
                <el-select v-model="searchForm.state" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option :value="1" label="已认证"/>
                  <el-option :value="0" label="待审核"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: right">
          <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        key="id"
        :data="attestationList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="用户ID" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实名认证" align="center">
          <template slot-scope="scope">
            <span>{{ formatStateRZ(scope.row.realNameState) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="银行卡认证" align="center">
          <template slot-scope="scope">
            <span>{{ formatStateRZ(scope.row.bankState) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="社交认证" align="center">
          <template slot-scope="scope">
            <span>{{ formatStateRZ(scope.row.gamState) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="基本信息认证" align="center">
          <template slot-scope="scope">
            <span>{{ formatStateRZ(scope.row.basicInfoState) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号认证" align="center">
          <template slot-scope="scope">
            <span>{{ formatStateRZ(scope.row.mobileState) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="淘宝认证" align="center">
          <template slot-scope="scope">
            <span>{{ formatStateRZ(scope.row.tbState) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="认证状态" align="center">
          <template slot-scope="scope">
            <span>{{ formatStateRZ(scope.row.state) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
const searchFormBase = {
  userId: '',
  userName: '',
  mobile: '',
  state: ''
}

export default {
  name: 'UserAttestationList',
  components: { Pagination },
  data() {
    return {
      searchLoading: false,
      loading: false,
      listLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      attestationList: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      }
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
      this.$http.post('user/findIdentifyList', {
        ...this.searchForm,
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.attestationList = res.data.list
        this.listTotal = res.data.total
        console.log(res)
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
    }
  }
}
</script>
