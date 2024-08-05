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
        <el-icon><setting /></el-icon>
        <span> {{ menuItem.navName }} </span>
      </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
const navList = [
  {
    id:'2',
    navName: '角色管理',
    path: '/roleList'
  },
  {
    id:'1',
    navName: '用户管理',
    path: '/userList'
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

</style>
