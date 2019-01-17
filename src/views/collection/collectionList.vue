<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="right" label-width="90px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="repaymentId" label="订单ID：">
                <el-input v-model="searchForm.repaymentId"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="collectionType" label="催收类型：">
                <el-select v-model="searchForm.collectionType" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option v-for="(item) in COLLECTION_TYPE" :key="item.number" :value="item.number" :label="item.label"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="comittedRepayment" label="承诺还款：">
                <el-select v-model="searchForm.comittedRepayment" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option :value="0" label="承诺"/>
                  <el-option :value="1" label="未承诺"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="isConnect" label="是否接通：">
                <el-select v-model="searchForm.isConnect" class="filter-item">
                  <el-option label="全部" value=""/>
                  <el-option v-for="(item) in IS_CONNECT" :key="item.number" :value="item.number" :label="item.label"/>
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
        :data="collectionList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="expand" label="展开" width="50">
          <template slot-scope="props">
            <el-form>
              <el-row :gutter="12">
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
        <el-table-column label="订单ID" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repaymentId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cashUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.collectionName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关系" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.collectionRelation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.collectionPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column label="催收类型" align="center">
          <template slot-scope="scope">
            <span>{{ formatCollectionType(scope.row.collectionType, true) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="承诺还款" align="center">
          <template slot-scope="scope">
            <span>{{ formatComittedRepayment(scope.row.comittedRepayment, true) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否接通" align="center">
          <template slot-scope="scope">
            <span>{{ formatIsConnect(scope.row.isConnect, true) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="催收时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="催收人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addUser }}</span>
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
  title: '',
  type: ''
}

export default {
  name: 'CollectionCollectionList',
  components: { Pagination },
  data() {
    return {
      downloadLoading: false,
      searchLoading: false,
      loading: false,
      listLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      collectionList: [],
      listTotal: 0,
      paging: {
        pageNo: 1,
        pageSize: 10
      },
      currentSize: 0
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
      this.$http.post('collection/collectionrecordlist', {
        // ...this.searchForm,
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.collectionList = res.data.list
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
    }
  }
}
</script>
