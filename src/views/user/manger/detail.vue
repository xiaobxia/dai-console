<template>
  <div class="app-container">
    <el-card shadow="hover">
      <el-card shadow="nerver">
        <div slot="header" class="clearfix">
          <span>个人信息详情页</span>
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
      <el-card shadow="nerver">
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
      <el-card shadow="nerver">
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
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'UserDetail',
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
    margin-bottom: 20px;
    .is-nerver-shadow{
      margin-bottom: 0;
      .el-card__header {
        padding: 10px!important;
      }
      .el-card__body {
        padding: 10px!important;
      }
    }
  }
</style>

