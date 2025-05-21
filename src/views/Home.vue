<template>
  <div class="main-page">
    <div class="left">
      <div class="left_top">
        <div class="left_top_bg">
          <img class="jiantou" src="../assets/images/jiantou.png" alt="" />
          <span class="title">RPA概况</span>
        </div>
        <div class="titles">各业务机器人数量</div>
        <div>
          <Echarts1></Echarts1>
        </div>
      </div>
      <div class="left-bottom">
        <div class="left_top_bg">
          <img class="jiantou" src="../assets/images/jiantou.png" alt="" />
          <span class="title">RPA应用效果</span>
        </div>
        <div class="leftpie">
          <div class="piel">
            <div class="pie">
              <Echarts2></Echarts2>
            </div>
            <div class="piet">RPA覆盖业务</div>
          </div>
          <div class="pier">
            <div class="pie">
              <Echarts3></Echarts3>
            </div>
            <div class="piet">RPA覆盖业务场景</div>
          </div>
        </div>
        <div>
          <div class="titles">各业务机器人数量</div>
          <Echarts4></Echarts4>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="center_top">
        <div class="left_top_bg">
          <img class="jiantou" src="../assets/images/jiantou.png" alt="" />
          <span class="title">工具箱应用情况</span>
        </div>
        <div class="titles">日访问量</div>
        <div>
          <Echarts5></Echarts5>
        </div>
      </div>
      <div class="center-bottom">
        <div class="ct">
          <div class="left_top_bg">
            <img class="jiantou" src="../assets/images/jiantou.png" alt="" />
            <span class="title">工具箱应用情况</span>
          </div>
          <div class="titles">日访问量</div>
          <div>
            <Echarts6></Echarts6>
          </div>
        </div>
        <div class="cb">
          <div class="left_top_bg">
            <img class="jiantou" src="../assets/images/jiantou.png" alt="" />
            <span class="title">工具箱应用情况</span>
          </div>
          <div class="titles">日访问量</div>
          <div>
            <Echarts7></Echarts7>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right_top">
        <div class="top1">
          <img src="../assets/images/r1.png" alt="" />
          <div class="title">运行任务数</div>
          <div class="shu">
            <span class="shuzi">200</span><span class="danwei">个</span>
          </div>
        </div>
        <div class="top1">
          <img src="../assets/images/r2.png" alt="" />
          <div class="title">总流程数量</div>
          <div class="shu">
            <span class="shuzi">220</span><span class="danwei">个</span>
          </div>
        </div>
        <div class="top1" style="margin-right: 0">
          <img src="../assets/images/r3.png" alt="" />
          <div class="title">累计节约人天</div>
          <div class="shu">
            <span class="shuzi">120</span><span class="danwei">个</span>
          </div>
        </div>
      </div>
      <div class="right-center">
        <Echarts8></Echarts8>
      </div>
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
import Echarts1 from "./echarts/echarts1.vue";
import Echarts2 from "./echarts/echarts2.vue";
import Echarts3 from "./echarts/echarts3.vue";
import Echarts4 from "./echarts/echarts4.vue";
import Echarts5 from "./echarts/echarts5.vue";
import Echarts6 from "./echarts/echarts6.vue";
import Echarts7 from "./echarts/echarts7.vue";
import Echarts8 from "./echarts/
.vue";
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
onMounted(() => {});
</script>
<style lang="scss" scoped>
.main-page {
  padding: 1%;
  width: 100%;
  height: 100%;
  .leftpie {
    width: 100%;
    height: 184px;
    margin-top: 24px;
    background: url("../assets/images/piebg.png");
    background-size: 100% 100%; /* 或使用 'contain' 根据需要 */
    background-repeat: no-repeat; /* 防止图像重复 */
    overflow: hidden;
    .piel,
    .pier {
      height: 100%;
      width: 50%;
      display: inline-block;
      // background-color: red;
    }
    .piet {
      padding: 0 20%;
      text-align: center;
      background: url("../assets/images/piet.png") center;
      background-size: 65% 100%; /* 或使用 'contain' 根据需要 */
      background-repeat: no-repeat; /* 防止图像重复 */
    }
  }

  .titles {
    width: 100%;
    margin-top: 20px;
    font-family: AlibabaPuHuiTiB;
    font-size: 16px;
    color: #303133;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
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
  .titles:before {
    content: "";
    /* 使用空内容生成内容 */
    background-color: #0d9d80;
    /* 设置背景颜色为蓝色 */
    /* 圆点形状 */
    display: inline-block;
    /* 使其成为行内块元素 */
    width: 4px;
    /* 宽度 */
    height: 22px;
    /* 高度 */
    // margin-left: -1.5em;
    /* 向左移动半个列表项内边距，使得小圆点与文本对齐 */
    margin-right: 0.5em;
    /* 向右移动，为了间隔效果 */
  }
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
      height: 391px;
      padding: 24px;
      background: #fbffff;
      border-radius: 4px;
      border: 1px solid #d3feff;
    }
    .left-bottom,
    .center-bottom {
      width: 100%;
      height: 575px;
      margin-top: 12px;
      padding: 24px;
      background: #fbffff;
      border-radius: 4px;
      border: 1px solid #d3feff;
    }
    .right_top {
      height: 236px;
      margin-bottom: 12px;
      width: 100%;
      background-color: #fff;
      margin-bottom: 12px;
      padding-right: 5%;
      padding-left: 5%;
      padding-top: 24px;
      padding-bottom: 24px;
      .top1 {
        width: 30%;
        display: inline-block;
        height: 188px;
        text-align: center;
        background: url("../assets/images/card_bg.png") center;
        background-size: 100% 100%; /* 或使用 'contain' 根据需要 */
        background-repeat: no-repeat; /* 防止图像重复 */
        margin-right: 5%;
        img {
          margin-top: 30px;
          width: 60px;
          height: 60px;
        }
        .title,
        .shu {
          width: 100%;
          font-family: YouSheBiaoTiHei;
          font-size: 16px;
          color: #323233;
          line-height: 20px;
          text-align: center;
          font-style: normal;
          margin-top: 10px;
          .shuzi {
            font-family: Barlow, Barlow;
            font-weight: bold;
            font-size: 24px;
            color: #0d9d80;
            line-height: 20px;
            text-align: center;
            font-style: normal;
            margin-right: 6px;
          }
          .danwei {
            font-family: AlibabaPuHuiTiR;
            font-size: 12px;
            color: #575859;
            line-height: 20px;
            text-align: center;
            font-style: normal;
          }
        }
      }
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
  }
}
</style>
