<template>
  <div class="mainpage">
    <!-- 面包屑 -->
    <div style="margin-bottom: 20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-link type="primary" @click="gohome()">首页</el-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-link type="primary" @click="goBack()"
            >上一页</el-link
          ></el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col
        v-for="(menuItem, index) in departmentList"
        :key="index"
        :index="menuItem.id"
        :span="8"
      >
        <div class="kuang">
          <div class="title">
            {{ menuItem.name }}
          </div>
          <div style="height:130px">
            <div
              class="liangdian"
              v-for="(specilItem, Index) in menuItem.processList"
              :key="Index"
            >
              {{ specilItem.name }}
            </div>
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

<script setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
// import router from "../../../router/index.js";
import request from "@/utils/request";
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/modules/user'


const router = useRouter();
const gohome = () => {
  router.push("/home");
};
const goBack = () => {
  router.go(-1);
};
const handleOpen = (key, keyPath) => {};
const handleClose = (key, keyPath) => {};
const goDetail = (val) => {
  router.push({ name: "departmentScheme", query: { id: val } });
};
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
            online: true,
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
              message: err,
              type: "error",
            });
          });
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
        message: err,
        type: "error",
      });
    });
};
onMounted(() => {
  userInfo.value = useUserStore().userInfo
  if (userInfo.value.roles.indexOf("admin") === -1) {
    //不是管理员
    queryDepartmentListParams.value.id = userInfo.value.department_id;
  } else {
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

