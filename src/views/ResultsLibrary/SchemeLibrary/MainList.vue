<template>
  <div class="mainpage">
    <el-row :gutter="20">
      <el-col
        v-for="(menuItem, index) in departmentList"
        :key="index"
        :index="menuItem.id"
        :span="12"
      >
        <div class="kuang">
          <div class="title">
            {{ menuItem.name }}
          </div>
          <div
            class="liangdian"
            v-for="(specilItem, Index) in menuItem.processList"
            :key="Index"
          >
            {{ specilItem.name }}
          </div>
          <el-button
            type="text"
            link
            class="detailLink"
            @click="goDetail(menuItem.id)"
          >
            了解详情 >
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import router from "../../../router/index.js";
import request from "@/utils/request";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
function goDetail(val) {
  router.push({ name: "mainListMore", query: { id: val } });
}
const userInfo = ref({
  roles: [],
  department_id: null,
});
const processList = ref([]);
const queryDepartmentListParams = ref({
  id: null,
  limit: null,
});
//查询部门/api/department
const departmentList = ref([]);
const queryDepartmentList = () => {
  request({
    method: "GET",
    url: "/api/department",
    params: queryDepartmentListParams.value,
  })
    .then((res) => {
      departmentList.value = res.data.data.list;
      departmentList.value.forEach((item) => {
        request({
          method: "GET",
          url: "/api/process",
          params: {
            page_num: 1,
            page_size: 4,
            department_id: item.id,
          },
        })
          .then((res) => {
            item.processList = res.data.data.list;
          })
          .catch((err) => {
            ElMessage({
              showClose: true,
              message: err.response.data.detail,
              type: "error",
            });
          });
      });
      console.log(departmentList.value);
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err.response.data.detail,
        type: "error",
      });
    });
};
//查询流程列表/api/process
const queryprocessList = (val) => {
  request({
    method: "GET",
    url: "/api/process",
    params: {
      limit: false,
      department_id: val.id,
    },
  })
    .then((res) => {
      processList.value = res.data.data.list;
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err.response.data.detail,
        type: "error",
      });
    });
};
onMounted(() => {
  userInfo.value = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo.value.roles.indexOf("SA") == -1) {
    //不是管理员
    console.log("不是管理员");
    queryDepartmentListParams.value.id = userInfo.value.department_id;
  } else {
    console.log("是管理员");
    queryDepartmentListParams.value.limit = false;
  }
  queryDepartmentList();
});
</script>
<style lang="scss" scoped>
.mainpage {
  padding: 20px;
  .kuang {
    height: 330px;
    background-image: url("../../../assets/images/yewubg.jpg"); /* 替换为你的图片路径 */
    background-size: cover; /* 背景图片覆盖整个元素 */
    background-repeat: no-repeat; /* 背景图片不重复 */
    margin-bottom: 20px;
    padding: 30px;
    .title {
      font-weight: 900;
      font-size: 36px;
      margin-bottom: 20px;
      color: #000;
    }
    .liangdian {
      margin-top: 10px;
      color: #666;
    }
    .detailLink {
      margin-top: 20px;
      color: #2468f2;
    }
  }
}
</style>

