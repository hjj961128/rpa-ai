<template>
  <div>
    <div class="top">
      <div class="title1">功能介绍</div>
      <div class="top-div">
        <el-card class="bxcard" v-for="(item,index) in toolList.features" :key="index">
          <div class="iconImg el-icon-Watch">
            <svg-icon name="fetures"></svg-icon>
          </div>
          <div class="icontitle">{{ item.name }}</div>
          <div class="iconTxt">
            {{ item.description }}
          </div>
        </el-card>
      </div>
    </div>
    <div class="center">
      <div class="title1">{{ toolList.title }}</div>
      <div class="centerview">
        <div class="left">
          <img src="../../../assets/images/u45.png" alt="" />
        </div>
        <div class="right">
          <div class="show">
            <div class="showTitle">简介</div>
            <div class="showDetail">{{ toolList.description }}</div>
            <div class="showui">
              <ul>
                <li>每日人工处理该业务需5小时，RPA执行仅需1小时</li>
                <li>提升4倍工作效率</li>
                <li>核对正确率提高至100%</li>
              </ul>
            </div>
          </div>
          <div class="show" v-if="toolList.doc">
            <div class="showTitle">接口文档</div>
            <!-- <el-link type="primary">{{toolList.doc }}</el-link> -->
            <a :href="toolList.doc">下载接口文档</a>
          </div>
          <div class="show">
            <div class="showTitle">已有案例</div>
            <el-link type="primary">{{ toolList.case }}</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import request from "@/utils/request";

const route = useRoute();
const toolList = ref([]);
const gettoolList = () => {
  request({
    method: "GET",
    url: "/api/tool",
    params: {
      id: route.query.id,
      limit: false,
    },
  })
    .then((res) => {
      toolList.value = res.data.data.list[0];
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
  gettoolList();
});
</script>
<style lang="scss" scoped>
.top-title {
  width: 100%;
  height: 180px;
  background-image: url("../assets/images/home-bg.jpg"); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 背景图片不重复 */
}
.top-div {
  margin-top: 20px;
  background-color: #fff;
  display: flex;
  // flex-flow: column;
  justify-content: space-around;
  width: 100%;
  .bxcard {
    width: 40%;
  }
  .iconImg {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .icontitle {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    color: #333;
  }
  .iconTxt {
    width: 80%;
    margin: 10px auto;
    font-size: 14px;
    color: #333;
  }
}
svg {
  width: 48px;
  height: 48px;
  color: rgb(81, 81, 81);
}
.title1 {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  font-weight: 900;
  font-size: 28px;
  line-height: 50px;
}
.centerview {
  display: flex;
  .left {
    width: 50%;
    padding: 40px;
    // height: 600px;
    img {
      width: 100%;
    }
  }
  .right {
    width: 50%;
    padding: 50px;
    padding-left: 100px;
    // display: inline-block;
  }
}
.showTitle:before {
  content: ""; /* 使用空内容生成内容 */
  background-color: #2468f2; /* 设置背景颜色为蓝色 */
  border-radius: 3px; /* 圆点形状 */
  display: inline-block; /* 使其成为行内块元素 */
  width: 6px; /* 宽度 */
  height: 16px; /* 高度 */
  margin-left: -1.5em; /* 向左移动半个列表项内边距，使得小圆点与文本对齐 */
  margin-right: 0.5em; /* 向右移动，为了间隔效果 */
}
.showTitle {
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 15px;
}
.showDetail,
.showui {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
}
.show {
  margin-top: 10px;
}
.cardTitle:before {
  content: ""; /* 使用空内容生成内容 */
  background-color: #2468f2; /* 设置背景颜色为蓝色 */
  border-radius: 3px; /* 圆点形状 */
  display: inline-block; /* 使其成为行内块元素 */
  width: 6px; /* 宽度 */
  height: 16px; /* 高度 */
  margin-left: -1.5em; /* 向左移动半个列表项内边距，使得小圆点与文本对齐 */
  margin-right: 0.5em; /* 向右移动，为了间隔效果 */
}
</style>