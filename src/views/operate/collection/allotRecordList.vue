<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="left" label-width="90px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="repaymentId" label="订单ID：" label-width="70px">
                <el-input v-model="searchForm.repaymentId"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="userName" label="催收人员姓名：" label-width="120px">
                <el-input v-model="searchForm.userName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="time" label="分配时间：">
                <el-date-picker
                  v-model="searchForm.time"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: right">
          <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置</el-button>
          <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        key="id"
        :data="allotRecordList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="订单ID" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.repaymentId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="催收人员ID" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="催收人员姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分配时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.allotTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import moment from 'moment'
const searchFormBase = {
  repaymentId: '',
  userName: '',
  time: ['', '']
}

export default {
  name: 'OperateCollectionAllotRecordList',
  components: { Pagination },
  data() {
    return {
      searchLoading: false,
      loading: false,
      listLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      allotRecordList: [],
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
      this.$http.post('collection/allotRecord', {
        ...this.formatSearch(),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.allotRecordList = res.data.list
        this.currentSize = res.data.list.length
        this.listTotal = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    formatSearch() {
      const data = {}
      for (const key in this.searchForm) {
        if (key === 'time') {
          if (this.searchForm['time'][0]) {
            data.beginTime = moment(this.searchForm.time[0]).format('YYYY-MM-DD')
            data.endTime = moment(this.searchForm.time[1]).format('YYYY-MM-DD')
          }
        } else {
          data[key] = this.searchForm[key]
        }
      }
      return data
    },
    resetPaging() {
      this.paging.pageNo = 1
    },
    handleSearch() {
      this.resetPaging()
      this.queryList()
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, searchFormBase)
    }
  }
}
</script>
