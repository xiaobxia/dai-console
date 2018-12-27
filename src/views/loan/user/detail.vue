<template>
  <div class="app-container">
    <el-card shadow="hover" class="medium-card">
      <div slot="header" class="clearfix">
        <span>零钱贷借款详情页</span>
      </div>
      <el-card shadow="nerver" class="small-card">
        <div slot="header" class="clearfix">
          <span>借款详情</span>
        </div>
        <el-form>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="用户ID：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单号：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="钱包白名单：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="钱包黑名单：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="借款项目：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="借款金额(元)：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="服务费：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="借款利息：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="借款利率(‱)：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="服务费率(‱)：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最迟还款日：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总额度：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="剩余额度：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="授信总额度：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="基础额度：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公积金额度：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-card>
    <el-card shadow="hover" class="medium-card">
      <div slot="header" class="clearfix">
        <span>个人信息详情页</span>
      </div>
      <el-card shadow="nerver" class="small-card">
        <div slot="header" class="clearfix">
          <span>个人详情</span>
        </div>
        <el-form>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="用户ID：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户手机：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户名：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="身份证：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="生日：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年龄：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="婚姻：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="学历：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="身份证地址：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="常住地址：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账号申请创建时间：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card shadow="nerver" class="small-card">
        <div slot="header" class="clearfix">
          <span>银行卡信息</span>
        </div>
        <el-form>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="种类：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="类型：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="卡号：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发卡行：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="银行预留手机号：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="添加时间：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card shadow="nerver" class="small-card">
        <div slot="header" class="clearfix">
          <span>联系人</span>
        </div>
        <el-form>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="关系：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="添加时间：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="来源：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card shadow="nerver" class="small-card">
        <div slot="header" class="clearfix">
          <span>工作信息</span>
        </div>
        <el-form>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="单位名称：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公司电话：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公司地址：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工作证照：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工作证明：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收入证明：">
                <span class="value">aaa</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-card>
    <el-card shadow="hover" class="medium-card">
      <div slot="header" class="clearfix">
        <span>行为信息详情页</span>
      </div>
      <el-card shadow="nerver" class="small-card">
        <div slot="header" class="clearfix">
          <span>注册信息</span>
        </div>
        <el-form>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="注册终端类型：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册app版本：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册设备名称：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="os版本：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册来源：">
                <span class="value">aaaa</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-card>
    <el-card shadow="hover" class="medium-card">
      <div slot="header" class="clearfix">
        <span>审核信息</span>
      </div>
      <el-table
        v-loading="listLoading"
        key="id"
        :data="menuList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="审核人" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核类型" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核内容" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核前状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核后状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否可再借" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拒绝节点" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拒绝详情" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'LoadUserDetail',
  components: { },
  data() {
    return {
      menuList: []
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
      this.$http.get('/article/list').then((res) => {
        this.menuList = res.items
        console.log(res)
      }).catch(() => {
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    margin: 0;
  }
  .el-card {
    margin-bottom: 20px;
    .is-nerver-shadow{
      margin-bottom: 0;
    }
  }
</style>

