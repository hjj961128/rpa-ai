<template>
  <div class="main_page">
    <div class="top_search">
      <el-input
        :prefix-icon="Search"
        v-model="searchValue"
        style="max-width: 600px"
        placeholder="输入工具箱名称条件查询"
        class="input-with-select"
        size="large"
      >
        <template #append>
          <el-button type="primary">搜索</el-button>
        </template>
      </el-input>
    </div>
    <div class="toplist">
      <el-card class="boxcard" v-for="(item, index) in boxList" :key="index">
        <img src="../../../assets/images/login-bg.png" alt="" />
        <p class="title">{{ item.title }}</p>
        <p class="jianjie">
          {{ item.description }}
        </p>
        <div class="bth">
          <el-button @click="toDetail(item)" key="primary" type="primary" link>
            了解详情 >
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import request from "@/utils/request";
// import router from "../../../router/index.js";
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router';
const router = useRouter();

const searchValue = ref("");
const form = ref({
  name: "",
  page_num: 1,
  page_size: 8,
  limit: true,
  type: 0,
});
const boxList = ref([]);
const queryBoxList = () => {
  request({
    method: "GET",
    url: "/api/tool",
    params: form.value,
  })
    .then((res) => {
      boxList.value = res.data.data.list;
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
onMounted(() => {
  queryBoxList();
});
</script>
<style lang="scss" scoped>
.main_page {
  width: 100%;
  padding: 50px;
  .top_search {
    text-align: center;
  }
  .toplist {
    margin-top: 50px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    width: 100%;
    .boxcard {
      width: 20%;
      img {
        width: 100%;
      }
      .title {
        margin-top: 5px;
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
.el-input-group__append button.el-button,
.el-input-group__append button.el-button:hover,
.el-input-group__append div.el-select .el-select__wrapper,
.el-input-group__append div.el-select:hover .el-select__wrapper,
.el-input-group__prepend button.el-button,
.el-input-group__prepend button.el-button:hover,
.el-input-group__prepend div.el-select .el-select__wrapper,
.el-input-group__prepend div.el-select:hover .el-select__wrapper {
  // background-color: ;
}
</style>
