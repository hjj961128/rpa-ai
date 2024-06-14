<template>
  <div>
    <el-menu
          :default-active="$route.path"
          router
          class="el-menu-demo"
          mode="horizontal"
          background-color="transparent"
          text-color="#fff"
          active-text-color="#1890FF"
          @select="handleSelect"
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-sub-menu index="2">
            <template #title>成果库</template>
            <el-menu-item index="/schemeLibraryIndex">工具箱</el-menu-item>
            <el-menu-item index="/schemeLibraryIndex">方案库</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/processlist">流程</el-menu-item>
          <el-menu-item index="4">中控</el-menu-item>
          <el-menu-item index="/systemManagement">系统管理</el-menu-item>
        </el-menu>
  </div>
</template> 
<script setup>
function handleSelect (val) {
  console.log(val)
}
</script> 
<style lang="scss" scoped>
.el-menu {
  border-bottom: 0 !important;
}
.el-menu-demo {
  width: 100%;
  display: flex;
  justify-content: center;
}
/* 水平时，去除底部白边。 */
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.el-menu-item{
  width: 120px;
}
</style>