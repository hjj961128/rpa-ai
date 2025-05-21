<template>
  <div class="main_page">
    <!-- 面包屑 -->
    <div class="search">
      <el-input
        placeholder="请输入关键词"
        class="search_input"
        v-model="searchValue"
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
    <!-- <div class="top_search">
      <el-input
        :prefix-icon="Search"
        v-model="searchValue"
        style="max-width: 600px"
        placeholder="输入工具箱名称条件查询"
        class="input-with-select"
        size="large"
        clearable
      >
        <template #append>
          <el-button @click="queryBoxList('1')" type="primary"
            >搜索</el-button
          >
        </template>
      </el-input>
    </div> -->
    <div class="toplist">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in boxList" :key="index" :span="8">
          <el-card class="boxcard">
            <img :src="item.imgurl" alt="" />
            <p class="title">{{ item.title }}</p>
            <p class="jianjie">
              {{ item.description }}

            </p>
            <div class="bth">
              <el-button
                @click="toDetail(item)"
                key="text"
                class="detailLink"

                link
              >
                了解详情 >
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
      v-model:current-page="pageValue.page_num"
      v-model:page-size="pageValue.page_size"
      layout="total, prev, pager, next"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 10px; display: flex; justify-content: center"
    />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import request from "@/utils/request";
// import router from "../../../router/index.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const baseURL = ref(import.meta.env.VUE_APP_BASE_URL);
import httpClient from "../../../utils/request.js";

const router = useRouter();
const pageValue = ref({
  page_num: 1,
  page_size: 8,
});
const total = ref(0);
const searchValue = ref("");
const form = ref({
  title: null,
  page_num: pageValue.value.page_num,
  page_size: pageValue.value.page_size,
  limit: true,
  type: 0,
});
const handleSizeChange = (val) => {
  form.value.page_size = val;
  getProcessList();
};
const handleCurrentChange = (val) => {
  form.value.page_num = val;
  queryBoxList();
};
const boxList = ref([]);
const imgurl = ref('')
const queryBoxList = (val) => {
  if (val=='1') {
    form.value.title = searchValue.value;
  }
  console.log(form.value);
  request({
    method: "GET",
    url: "/api/tool",
    params: form.value,
  })
    .then((res) => {
      boxList.value = res.data.data.list;
      total.value = res.data.data.total;
      boxList.value.forEach(item=>{
        item.imgurl = httpClient.defaults.baseURL +"api/image?name="+item.image
      })
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
const toDetail = (val) => {
  router.push({ name: "boxDetail", query: { id: val.id } });
};
const gohome = () => {
  router.push("/home");
};
const goBack = () => {
  router.go(-1);
};
onMounted(() => {
  queryBoxList();
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
.main_page {
  margin: 24px;
  padding: 100px 441px 0px 441px;
  background-image: url("../../../assets/images/cbg.png"); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 背景图片不重复 */
  .top_search {
    text-align: center;
  }
  .toplist {
    margin-top: 50px;
    width: 100%;
    .boxcard {
      background-image: url("../../../assets/images/bubg.png"); /* 替换为你的图片路径 */
    background-size: cover; /* 背景图片覆盖整个元素 */
    background-repeat: no-repeat; /* 背景图片不重复 */
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 200px;
      }
      .title {
        margin-top: 5px;
        height: 35px;
        font-weight: 900;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /*省略几行写几*/
        -webkit-box-orient: vertical;
      }
      .jianjie {
        margin-top: 5px;
        height: 70px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /*省略几行写几*/
        -webkit-box-orient: vertical;
      }
      .bth {
        margin-top: 10px;
      }
    }
  }
}
</style>
