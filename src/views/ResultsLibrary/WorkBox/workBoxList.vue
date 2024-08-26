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
        clearable
      >
        <template #append>
          <el-button @click="queryBoxList('1')" type="primary"
            >搜索</el-button
          >
        </template>
      </el-input>
    </div>
    <div class="toplist">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in boxList" :key="index" :span="6">
          <el-card class="boxcard">
            <img src="../../../assets/images/login-bg.png" alt="" />
            <p class="title">{{ item.title }}</p>
            <p class="jianjie">
              {{ item.description }}
            </p>
            <div class="bth">
              <el-button
                @click="toDetail(item)"
                key="primary"
                type="primary"
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
    width: 100%;
    .boxcard {
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
