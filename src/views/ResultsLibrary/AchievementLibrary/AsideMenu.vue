<template>
  <el-row class="tac">
    <el-col>
      <h5 class="mb-2">方案库</h5>
      <el-menu
        default-active="$route.path"
        :router="true"
        class="el-menu-vertical-demo"
      >
        <el-menu-item
          v-for="(menuItem, index) in departmentList"
          :key="index"
          :index="menuItem.pathName"
        >
          <el-icon><setting /></el-icon>
          <span> {{ menuItem.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import request from "@/utils/request";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserStore } from '@/stores/modules/user'


const route = useRoute();
// 监听路由对象的变化
watch(() => route.params, (newParams, oldParams) => {
      // 当路由参数发生变化时，这里会被调用
      console.log('路由参数变化了', newParams, oldParams);
      // 在这里执行页面的更新逻辑
});

const userInfo = ref({
  roles: [],
});
const searchForm = ref({
  page_num: 1,
  page_size: 10,
});

//查询部门/api/department
const departmentList = ref([]);
const queryDepartmentList = () => {
  request({
    method: "GET",
    url: "/api/department",
    params: {
      limit: false,
    },
  })
    .then((res) => {
      departmentList.value = res.data.data.list;
      departmentList.value.forEach((item) => {
        item.pathName = "departmentScheme?id=" + item.id;
      });
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
       message: err,
        type: "error",
      });
    });
};
const queryDepartmentListid = () => {
  request({
    method: "GET",
    url: "/api/department",
    params: {
      id: userInfo.value.department_id,
    },
  })
    .then((res) => {
      departmentList.value = res.data.data.list;
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
onMounted(() => {
  userInfo.value = useUserStore().userInfo;
  console.log(userInfo.value.roles.indexOf('admin'))
  if (userInfo.value.roles.indexOf('admin') === -1) {
    //不是管理员
    // departmentList.value = [
    //   {
    //     id: userInfo.value.department_id,
    //     navName: userInfo.value.department_name,
    //   },
    // ];
    queryDepartmentListid()
    // console.log(departmentList.value);
  } else {
    queryDepartmentList();
  }
});
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
</style>
