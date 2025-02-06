<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <TopMenu></TopMenu>
      </el-header>
      <el-container class="bodys_all">
        <!-- <el-aside width="200px">菜单栏</el-aside> -->
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import TopMenu from './TopMenu.vue'
</script>
<style lang="less" scoped >
.common-layout{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .bodys_all{
    width: 100%;
    height: calc(100vh - 66px);
    display: flex;
    background-color: #F5F7FA;
  }
}
.el-header{
  width: 100%;
  height: 66px;
  padding: 0;
  margin: 0 auto;
  text-align: center;
  background-image: url('../assets/images/header-bg.png'); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 背景图片不重复 */
}
.el-menu-demo {
  width: 100%;
  // display: flex;
  // justify-content: center;
}
/* 水平时，去除底部白边。 */
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.el-menu-item{
  width: 150px;
  text-align: center;
  color: #079B79;
}
.el-aside{
  height: 100vh;
}
.el-main{
  padding: 0;
}
</style>