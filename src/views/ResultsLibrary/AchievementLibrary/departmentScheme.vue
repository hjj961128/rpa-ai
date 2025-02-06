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
    <div class="main">
      <div class="bumen">{{ route.query.departmentName }}</div>
      <div class="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="流程名称：">
            <el-input v-model="formInline.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row :gutter="20">
        <el-col
          v-for="(menuItem, index) in processList"
          :key="index"
          :index="menuItem.id"
          :span="8"
        >
          <div class="kuang">
            <div class="title">
              <div class="titlel">
                {{ menuItem.name }}
                <img
                  v-if="index <= 1"
                  src="../../../assets/images/hot.png"
                  alt=""
                />
                <!-- <svg-icon name="hot" class="hot"></svg-icon> -->
              </div>
              <div class="gotoname">
                详情
                <svg-icon
                  name="goto"
                  class="goto"
                  @click="goDetail(menuItem)"
                ></svg-icon>
              </div>
            </div>
            <div class="liangdian">
              {{ menuItem.process_introduction }}
            </div>
            <div class="detailLink"></div>
          </div>
        </el-col>
        <div class="pagenum">
          <el-pagination
            v-model:current-page="pageValue.page_num"
            v-model:page-size="pageValue.page_size"
            layout="total, prev, pager, next"
            :total="total"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="page"
          />
        </div>
      </el-row>
    </div>
  </div>
</template>

<script setup>
// import router from "../../../router/index.js";
import { onMounted, watch, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import request from "@/utils/request";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
///
watch(
  route,
  (newValue, oldValue) => {
    getProcessList();
  },
  { deep: true }
);
const formInline = ref({
  name: "",
});
const total = ref(0);
const handleSizeChange = (val) => {
  pageValue.value.page_size = val;
  getProcessList();
};
const handleCurrentChange = (val) => {
  pageValue.value.page_num = val;
  getProcessList();
};

const goDetail = (val) => {
  router.push({ name: "schemeDetail", query: { id: val.id } });
};

const pageValue = ref({
  page_num: 1,
  page_size: 9,
});
const processList = ref([]);
const getProcessList = () => {
  request({
    method: "GET",
    url: "/api/process",
    params: {
      online: true,
      page_num: pageValue.value.page_num,
      page_size: pageValue.value.page_size,
      department_id: route.query.id,
    },
  })
    .then((res) => {
      processList.value = res.data.data.list;
      total.value = res.data.data.total;
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
const departmentId = ref(null);
const gohome = () => {
  router.push("/home");
};
const goBack = () => {
  router.go(-1);
};
onMounted(() => {
  departmentId.value = route.query.id;
  getProcessList();
});
</script>
<style lang="scss" scoped>
.mainpage {
  padding: 24px;
  background-color: #f5f7fa;
  .main {
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding: 0px 26px;
    .bumen:before {
      content: "";
      /* 使用空内容生成内容 */
      background-color: #079b79;
      /* 设置背景颜色为蓝色 */
      /* 圆点形状 */
      display: inline-block;
      /* 使其成为行内块元素 */
      width: 4px;
      /* 宽度 */
      height: 20px;
      /* 高度 */
      // margin-left: -1.5em;
      /* 向左移动半个列表项内边距，使得小圆点与文本对齐 */
      margin-right: 0.5em;
      /* 向右移动，为了间隔效果 */
    }
    .bumen {
      width: 100%;
      height: 57px;
      font-family: YouSheBiaoTiHei;
      font-size: 22px;
      color: #303133;
      line-height: 57px;
      text-align: left;
      font-style: normal;
      box-shadow: inset 0px 0px 0px 0px #e0e3e5;
      border-bottom: 1px solid #e0e3e5;
    }
    .search {
      margin: 24px;
      height: 48px;
      font-family: AlibabaPuHuiTiM;
      font-size: 14px;
      color: #303133;
      line-height: 48px;
      font-style: normal;
      display: flex;
      align-items: center; /* 垂直居中 */
    }
  }
  .kuang {
    height: 178px;
    background: url("../../../assets/images/cardbg.png") no-repeat center/cover;
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;

    .title {
      font-size: 24px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center; /* 垂直居中 */
      height: 28px;
      line-height: 28px;
      img {
        height: 18px;
        width: 30px;
      }

      .detail {
        float: right;
      }
      .gotoname {
        font-family: AlibabaPuHuiTiR;
        font-size: 14px;
        color: #079b79;
        line-height: 28px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }

    .titlel {
      display: inline-block;
      white-space: nowrap;
      /* 确保文本在一行内显示 */
      overflow: hidden;
      /* 隐藏超出容器的内容 */
      text-overflow: ellipsis;
      font-family: AlibabaPuHuiTiB;
      font-size: 18px;
      color: #303133;
      line-height: 28px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .liangdian {
      margin-top: 10px;
      color: #666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: AlibabaPuHuiTiR;
font-size: 14px;
color: #606266;
line-height: 22px;
text-align: left;
font-style: normal;
text-transform: none;
    }

    .detailLink {
      margin-top: 20px;
      color: #2468f2;
    }
  }

  svg {
    width: 40px;
    height: 40px;
  }

  .hot {
    margin-left: 15px;
  }

  .goto {
    // float: right;
    height: 8px;
    color: #079b79;
  }
}
.pagenum{
  width: 100%;
  float: right;
  text-align: right;
  margin-top: 4px;
  margin-bottom: 30px;
  padding-right: 24px;
  .page{
    float: right;
  }
}
</style>
