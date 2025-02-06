<template>
  <div class="main-page">
    <div class="left">
      <div class="left_top">
        <div class="left_top_bg">
          <img class="jiantou" src="../assets/images/jiantou.png" alt="" />
          <span class="title">RPA概况</span>
        </div>
        <div>
          <Echarts1></Echarts1>
        </div>
      </div>
      <div class="left-bottom">22</div>
    </div>
    <div class="center">
      <div class="center_top">33</div>
      <div class="center-bottom">44</div>
    </div>
    <div class="right">
      <div class="right_top">55</div>
      <div class="right-center">66</div>
      <div class="right-bottom">77</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { ElMessage, ElMessageBox } from "element-plus";
import request from "@/utils/request";
import { useRouter } from "vue-router";
import Echarts1 from './echarts/echarts1.vue'

const router = useRouter();

const goDetail = (val) => {
  router.push({ name: "schemeDetail", query: { id: val.id } });
};
const tableData = ref([]);
const getProcessList = (val) => {
  request({
    method: "GET",
    url: "/api/process",
    params: {
      page_num: 1,
      page_size: 8,
    },
  })
    .then((res) => {
      tableData.value = res.data.data.list;
    })
    .catch((err) => {
      console.log(err);
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
onMounted(() => {
 
});
</script>
<style lang="scss" scoped>
.main-page {
  padding: 1%;
  width: 100%;
  height: 100%;
  .left,
  .center,
  .right {
    display: inline-block;
    width: 32%;
    margin-left: 1%;
    height: 100%;
    overflow: hidden;
    .left_top,
    .center_top {
      width: 100%;
      background-color: #fff;
      height: 391px;
      padding: 24px;
    }
    .left-bottom,
    .center-bottom {
      width: 100%;
      background-color: #fff;
      height: 575px;
      margin-top: 12px;
    }
    .right_top {
      height: 236px;
      margin-bottom: 12px;
      width: 100%;
      background-color: #fff;
      margin-bottom: 12px;
    }
    .right-center {
      width: 100%;
      background-color: #fff;
      height: 332px;
      margin-bottom: 12px;
    }
    .right-bottom {
      height: 386px;
      width: 100%;
      background-color: #fff;
    }
    .left_top_bg {
      width: 100%;
      height: 45px;
      background: url("../assets/images/top.png") no-repeat;
      line-height: 45px;
      display: flex;
      align-content: center;
      position: relative;
      .jiantou {
        display: inline-block;
        margin-left: 14px;
        height: 24px;
        width: 24px;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .title {
        font-family: YouSheBiaoTiHei;
        color: #323233;
        text-align: left;
        font-style: normal;
        margin-left: 41px;
        line-height: 45px;
      }
    }
  }
}
</style>
