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
import { onMounted, reactive, ref } from "vue";
import request from "@/utils/request";
const userInfo = ref({
  roles:[]
})
const searchForm = ref({
  page_num: 1,
  page_size: 10
})
const navList = ref([])
onMounted(() => {
  userInfo.value = JSON.parse(sessionStorage.getItem("userInfo"))
  if(userInfo.value.roles.indexOf("SA") == -1){
    //不是管理员
    console.log('不是管理员');
    navList.value = [{
      id: userInfo.value.department_id,
      navName: userInfo.value.department_name
    }]
    
  }else{
    console.log('是管理员');
    // getProcessList()
    navList.value = [
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
  }
});
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
