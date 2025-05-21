<template>
  <el-row class="tac">
    <el-col >
      <el-menu
        default-active="$route.path"
        router
        class="el-menu-vertical-demo"
      >
      <el-menu-item
        v-for="(menuItem, index) in navList"
        :key="index"
        :index="menuItem.path"
      >
        <svg-icon :name="menuItem.icon"></svg-icon>
        <span> {{ menuItem.navName }} </span>
      </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
const navList = [
  {
    id:'1',
    navName: '用户管理',
    path: '/userList',
    icon: 'userlist'
  },
  {
    id:'2',
    navName: '角色管理',
    path: '/roleList',
    icon: 'role'
  },
  {
    id:'3',
    navName: '安全管控',
    path: '/security',
    icon: 'save'
  },
]
</script>
<style lang="less" scoped>
.el-menu{
  border: 0;
  height: 100vh;
  background-color: #F3F7FE;
}
.mb-2{
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  color: #7F7F7F;
}
svg{
  margin-right: 15px;
  width: 24px;
  height: 24px;
}
.el-menu-vertical-demo{}
</style>
