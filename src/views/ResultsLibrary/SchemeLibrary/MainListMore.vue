<template>
  <div class="mainpage">
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
            </div>
            <div>
              <svg-icon name="hot" class="hot"></svg-icon>
            </div>
            <div>
              <svg-icon name="goto" class="goto" @click="goDetail(menuItem)"></svg-icon>
            </div>
          </div>
          <div class="liangdian">
            {{ menuItem.process_introduction }}
          </div>
          <div class="detailLink"></div>
        </div>
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
</template>

<script setup>
import router from "../../../router/index.js";
import { onMounted,watch, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import request from "@/utils/request";
import { ElMessage } from "element-plus";

const route = useRoute();
///
watch(
  route,
  (newValue, oldValue) => {
    getProcessList()
  },
  {deep:true }
);
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
  router.push({name:'schemeDetail',query: { id: val.id }})
}

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
onMounted(() => {
  departmentId.value = route.query.id;
  getProcessList();
});

</script>
<style lang="scss" scoped>
.mainpage {
  padding: 20px;
  .kuang {
    height: 250px;
    background: url("../../../assets/images/cardbg.png") no-repeat center/cover;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    padding: 30px;
    border-radius: 8px;
    
    .title {
      font-size: 24px;
      margin-bottom: 15px;
      display: flex;
    justify-content: space-between;
      .detail {
        float: right;
      }
    }
    .titlel {
      display: inline-block;
      white-space: nowrap; /* 确保文本在一行内显示 */
      overflow: hidden; /* 隐藏超出容器的内容 */
      text-overflow: ellipsis;
    }
    .liangdian {
      margin-top: 10px;
      color: #666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      text-overflow: ellipsis;
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
  }
}
</style>

