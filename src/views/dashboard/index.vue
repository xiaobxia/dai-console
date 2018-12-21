<template>
  <div class="app-container">
    <el-alert
      :closable="false"
      :title="title"
      type="success"
      description=""/>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  components: { },
  data() {
    return {
      title: `欢迎来到${process.env.APP_NAME}`
    }
  },
  computed: {
  },
  created() {
  }
}
</script>
