<template>
  <div class="mainpage">
    <!-- 面包屑 -->
    <div class="search">
      <el-input
        placeholder="请输入关键词"
        class="search_input"
      ></el-input>
      <el-button
        type="primary"
        style="height: 48px; width: 82px; margin-left: 24px"
        >查询</el-button
      >
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-link type="primary" @click="gohome()">首页</el-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-link type="primary" @click="goBack()"
            >上一页</el-link
          ></el-breadcrumb-item
        >
      </el-breadcrumb> -->
    </div>
    <el-row :gutter="20">
      <el-col
        v-for="(menuItem, index) in departmentList"
        :key="index"
        :index="menuItem.id"
        :span="8"
      >
        <div class="kuang">
          <div class="title_icon"></div>
          <div class="title">
            {{ menuItem.name }}
          </div>
          <div>
            <div
              class="liangdian"
              v-for="(specilItem, Index) in menuItem.processList"
              :key="Index"
            >
              {{ specilItem.name }}
            </div>
          </div>
          <div class="btn">
            <el-button
              type="text"
              link
              class="detailLink"
              @click="goDetail(menuItem.id,menuItem.name)"
            >
              了解详情 >
            </el-button>
          </div>
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
import { useUserStore } from "@/stores/modules/user";

const router = useRouter();
const gohome = () => {
  router.push("/home");
};
const goBack = () => {
  router.go(-1);
};
const handleOpen = (key, keyPath) => {};
const handleClose = (key, keyPath) => {};
const goDetail = (val,departmentName) => {
  router.push({ name: "departmentScheme", query: { id: val,departmentName:departmentName} });
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
  userInfo.value = useUserStore().userInfo;
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
.search {
  width: 100%;
  margin: auto;
  text-align: center;
  .search_input {
    height: 48px;
    width: 618px;
  }
}
.mainpage {
  margin: 24px;
  padding: 100px 441px 0px 441px;
  background-image: url("../../../assets/images/cbg.png"); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 背景图片不重复 */
  .kuang {
    height: 326px;
    width: 314px;
    background-image: url("../../../assets/images/bubg.png"); /* 替换为你的图片路径 */
    background-size: cover; /* 背景图片覆盖整个元素 */
    background-repeat: no-repeat; /* 背景图片不重复 */
    margin: 23px auto;
    padding: 24px;
    .title_icon {
      margin: auto;
      width: 94px;
      height: 94px;
      background-color: #fff;
    }
    .title {
      margin-top: 17px;
      font-family: AlibabaPuHuiTiB;
      font-size: 20px;
      color: #303133;
      line-height: 28px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      font-weight: 600;
    }
    .liangdian {
      margin-top: 16px;
      font-family: AlibabaPuHuiTiR;
      font-size: 14px;
      color: #606266;
      line-height: 14px;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
    .btn {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      .detailLink {
        font-family: AlibabaPuHuiTiR;
        font-size: 14px;
        color: #079b79;
        line-height: 28px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}
</style>

