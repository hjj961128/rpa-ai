<template>
  <el-row class="tac">
    <el-col >
      <h5 class="mb-2">方案库</h5>
      <el-menu
        default-active="$route.path"
        router
        class="el-menu-vertical-demo"
      >
      <el-menu-item
        v-for="(menuItem, index) in navList"
        :key="index"
        index="/mainList"
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
    id:'1',
    navName: 'RPA营销'
  },
  {
    id:'2',
    navName: 'RPA人资'
  },
  {
    id:'3',
    navName: 'RPA党建'
  },
  {
    id:'4',
    navName: 'RPA财资'
  },
  {
    id:'5',
    navName: 'RPA运维'
  },
  {
    id:'6',
    navName: 'RPA调度自动化'
  }
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
