<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/recently">Recently</el-menu-item>
    </el-menu>

    <router-view>
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'unity-launcher'
  }
</script>

<style>
  /* CSS */
</style>
