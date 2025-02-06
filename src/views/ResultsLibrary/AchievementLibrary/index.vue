<template>
  <div>
    <!-- 成果库-方案库主体框架 -->
    <div class="common-layout">
      <el-container>
        <!-- <el-aside width="200px">
          <AsideMenu></AsideMenu>
        </el-aside> -->
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import AsideMenu from './AsideMenu.vue'
</script>
<style lang="less" scoped>
.el-main{
  padding: 0;
  background-color: #F5F7FA ;
}
.el-aside{
  background-color: #F3F7FE;
}
</style>