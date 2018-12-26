<template>
  <div class="app-container">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>借款用户信息</span>
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
            <el-form-item label="生日：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>打款信息</span>
      </div>
      <el-form>
        <el-row :gutter="12">
          <el-col :span="6">
            <el-form-item label="业务订单号：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="借款来源：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打款金额：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打款手续费：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实际打款金额：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请时间：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单ID：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打款状态：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打款摘要：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请打款渠道类型：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>打款银行卡信息</span>
      </div>
      <el-form>
        <el-row :gutter="12">
          <el-col :span="6">
            <el-form-item label="打款银行卡号：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打款银行名称：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="持卡人姓名：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开户行地址：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>审核</span>
      </div>
      <el-form>
        <el-row :gutter="12">
          <el-col :span="6">
            <el-form-item label="审核人：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核时间：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核状态：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打款状态：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最近更新时间：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>订单信息</span>
      </div>
      <el-form>
        <el-row :gutter="12">
          <el-col :span="6">
            <el-form-item label="商户端订单号：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单日期：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打款金额：">
              <span class="value">aaaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="流程实例号：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="直连打款结果：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="回调业务方结果：">
              <span class="value">aaa</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'FinanceMakeMoneyDetail',
  components: { },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    margin: 0;
  }
  .el-card {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
</style>

