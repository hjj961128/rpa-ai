<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="$route.path"
        router
        class="el-menu-vertical-demo"
      >
        <!-- <el-menu-item
        v-for="(menuItem, index) in navList"
        :key="index"
        :index="menuItem.path"
      >
        <svg-icon :name="menuItem.icon"></svg-icon>
        <span> {{ menuItem.navName }} </span>
      </el-menu-item> -->
        <el-menu-item index="/workBoxList">
          <svg-icon name="workBox"></svg-icon>
          <span> 通用工具 </span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <svg-icon name="customization"></svg-icon>
            <span> 定制化工具 </span>
          </template>
            <el-menu-item class="aaa" index="/customization">
              <svg-icon name="toubiao"></svg-icon>
              <span> 投标管理系统 </span>
            </el-menu-item>

          <el-menu-item class="aaa" index="/email-system">
              <svg-icon name="email-system"></svg-icon>
              <span> 邮件收发管理 </span>
            </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
const navList = [
  {
    id: "1",
    navName: "通用工具",
    path: "/workBoxList",
    icon: "workBox",
  },
  {
    id: "1",
    navName: "定制化工具",
    path: "/customization",
    icon: "customization",
  },
];
</script>
<style lang="less" scoped>
.el-menu {
  border: 0;
  height: 100vh;
  background-color: #f3f7fe;
}

.mb-2 {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  color: #7f7f7f;
}
svg {
  margin-right: 15px;
  width: 24px;
  height: 24px;
}
.aaa{
  background-color: #f3f7fe;
}
</style>
