<template>
  <div class="navbar">
    <breadcrumb class="breadcrumb-container"/>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <div class="right-menu">
      <el-tooltip content="全屏" effect="dark" placement="bottom">
        <screenfull class="screenfull right-menu-item"/>
      </el-tooltip>
      <el-dropdown size="small" class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../../assets/头像.png" class="user-avatar">
          <span>{{ name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="logout"><i style="margin-right: 5px;" class="fas fa-sign-out-alt"/>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Hamburger,
    Screenfull,
    Breadcrumb
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      padding: 0 20px;
      height: 50px;
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0,0,0,.03);
      }
      .avatar-wrapper {
        margin-top: 0;
        position: relative;
        height: 50px;
        line-height: 50px;
        .user-avatar {
          vertical-align: baseline;
          margin-right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        span{
          vertical-align: text-bottom;
        }
      }
    }
  }
}
</style>
