<template>
  <el-card shadow="nerver">
    <div class="filter-container">
      <el-form ref="searchForm" :model="searchForm" label-position="left">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-form-item prop="name" label="姓名：" label-width="60px">
              <el-input v-model="searchForm.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="phone" label="手机号：" label-width="70px">
              <el-input v-model="searchForm.phone"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="time" label="创建时间：" label-width="90px">
              <el-date-picker
                v-model="searchForm.time"
                style="width: 100%"
                type="daterange"
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"/>
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
      :data="collectionUserList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @row-click="handleCurrentChange"
    >
      <el-table-column label="ID" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮件" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
import moment from 'moment'
const searchFormBase = {
  name: '',
  phone: '',
  time: ['', '']
}

export default {
  name: 'OperateCollectionCollectionManListSmall',
  components: { Pagination },
  props: {
    rowchange: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      searchLoading: false,
      loading: false,
      listLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      collectionUserList: [],
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
      this.$http.post('collection/collectionUser', {
        ...this.formatSearch(),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.collectionUserList = res.data.list
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
    },
    handleCurrentChange(val) {
      this.rowchange(val)
    }
  }
}
</script>
