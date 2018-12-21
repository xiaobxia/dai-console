<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logo-title">
      <img src="../../../../assets/login_title.png" alt="">
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" v-if="route.miss !== true" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .logo-title {
    position: relative;
    height: 50px;
    background-color: #304156;
    padding: 0 10px;
    line-height: 50px;
    img{
      display: inline-block;
      height: auto;
      width: 100%;
      vertical-align: middle;
    }
  }
</style>
