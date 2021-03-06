<template>
  <div class="app-container">
    <el-card shadow="nerver">
      <div class="filter-container">
        <el-form ref="searchForm" :model="searchForm" label-position="right" label-width="90px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item prop="userName" label="用户账号：">
                <el-input v-model="searchForm.userName"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="realName" label="真实姓名：">
                <el-input v-model="searchForm.realName"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="操作：" label-width="70px">
                <el-select v-model="searchForm.name">
                  <el-option value="" label="全部"/>
                  <el-option v-for="(item) in QUOTA_NAME" :key="item.number" :value="item.number" :label="item.label"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="type" label="类型：" label-width="70px">
                <el-select v-model="searchForm.type">
                  <el-option value="" label="全部"/>
                  <el-option v-for="(item) in QUOTA_TYPE" :key="item.number" :value="item.number" :label="item.label"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name" label="提交时间：">
                <el-date-picker
                  v-model="searchForm.time"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button :loading="downloadLoading" class="filter-item" icon="el-icon-download" type="primary" @click="handleExport">导出</el-button>
              <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置</el-button>
              <el-button :loading="searchLoading" class="filter-item" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        v-loading="listLoading"
        key="id"
        :data="dayToDayList"
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
                  <span class="value">  {{ props.row.remark }}</span>
                </el-form-item>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户ID" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span>{{ formatQuotaName(scope.row.name, true) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            <span>{{ formatQuotaType(scope.row.type, true) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总额度" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="可借额度" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="冻结金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.freezeAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="paging.pageNo" :limit.sync="paging.pageSize" @pagination="queryList" />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import excel from '@/vendor/Export2Excel'
import moment from 'moment'

const searchFormBase = {
  userName: '',
  realName: '',
  name: '',
  type: '',
  time: ['', '']
}

export default {
  name: 'UserQuotaDayToDayList',
  components: { Pagination },
  data() {
    return {
      downloadLoading: false,
      searchLoading: false,
      loading: false,
      listLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      dayToDayList: [],
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
      this.$http.post('user/accountLog', {
        ...this.formatSearch(),
        ...this.paging
      }).then((res) => {
        this.listLoading = false
        this.dayToDayList = res.data.list
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
    handleExport() {
      this.downloadLoading = true
      this.$http.post('user/accountLog', {
        ...this.formatSearch()
      }).then((res) => {
        const list = res.data.list
        const exportConfig = {
          userId: {
            name: '用户ID'
          },
          userName: {
            name: '用户账号'
          },
          realName: {
            name: '真实姓名'
          },
          name: {
            name: '操作',
            format: this.formatQuotaName,
            params: true
          },
          type: {
            name: '类型',
            format: this.formatQuotaType,
            params: true
          },
          amount: {
            name: '操作金额'
          },
          totalMoney: {
            name: '总额度'
          },
          balance: {
            name: '可借额度'
          },
          freezeAmount: {
            name: '冻结金额'
          },
          nickName: {
            name: '操作人'
          },
          addTime: {
            name: '时间'
          },
          remark: {
            name: '备注'
          }
        }
        const data = this.formatExport(exportConfig, list)
        excel.export_json_to_excel({
          header: data.tHeader,
          data: data.data,
          filename: '用户额度流水列表',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      }).catch(() => {
        this.downloadLoading = false
      })
    }
  }
}
</script>
