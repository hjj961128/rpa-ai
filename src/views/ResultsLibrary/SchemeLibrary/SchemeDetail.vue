<template>
  <div>
    <div class="top">
      <div class="title1">业务亮点</div>
      <el-row :gutter="20">
        <el-col :span="5" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch">
              <svg-icon name="allday"></svg-icon>
            </div>
            <div class="icontitle">全天候待命</div>
            <div class="iconTxt">
              能够7*24小时全天候执行此前人力从事的工作，节假日无休
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch">
              <svg-icon name="tu2"></svg-icon>
            </div>
            <div class="icontitle">成本降低</div>
            <div class="iconTxt">
              机器人可以完成耗时及重复的任务，释放人力去执行更有价值的任务
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch">
              <svg-icon name="tu3"></svg-icon>
            </div>
            <div class="icontitle">准确度高</div>
            <div class="iconTxt">
              提高工作质量，避免出现人为错误而导致的返工，速度和准确率接近100%
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="center">
      <div class="title1">{{ processList.name }}</div>
      <div class="centerview">
        <div class="left">
          <img src="../../../assets/images/u45.png" alt="" />
        </div>
        <div class="right">
          <div class="show">
            <div class="showTitle">简介</div>
            <div class="showDetail">
              {{ processList.process_introduction }}
            </div>
            <div class="showui">
              {{ processList.effect.split(".") }}
              <ul>
                <!-- <li v-for="(item,index) in processList.effectARR" :key="index">{{ item }}</li> -->
                <li>每日人工处理该业务需5小时，RPA执行仅需1小时</li>
                <li>提升4倍工作效率</li>
                <li>核对正确率提高至100%</li>
              </ul>
            </div>
          </div>
          <div class="show">
            <div class="showTitle">涉及业务系统</div>
            <div class="showDetail">{{processList.business_system}}</div>
            <div class="showui"></div>
          </div>
          <div class="show">
            <div class="showTitle">流程文件</div>
            <!-- <div class="showDetail">流程文件下载</div> -->
            <!-- <el-link type="primary">{{processList.file_url?processList.file_url:'https://www.baidu.com/'}}</el-link> -->
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title1">相关组件</div>
      <div class="card">
        <div class="title">生产设计工单智能RPA</div>
        <div class="detail">
          基于每月需将固有的资料库的资料，进行word拼接以及格式设置完成商务标书编制，实现通过rpa工具获取标包信息对未开标的标书项目根据配置文件自动获取公用库和专用库文件根据标书大纲进行合并完成商务标书编制。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import request from "@/utils/request";

const processList = ref([]);
const route = useRoute();
const getProcessList = () => {
  request({
    method: "GET",
    url: "/api/process",
    params: {
      id: route.query.id,
      limit: false,
    },
  })
    .then((res) => {
      processList.value = res.data.data.list[0];
      // processList.value.forEach(item=>{
      //   processList.value.effectARR = processList.effect.split(",")
      // })
      console.log(processList.value.name);
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err.response.data.detail,
        type: "error",
      });
    });
};
onMounted(() => {
  getProcessList();
  console.log("111");
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
  height: 200px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  padding-top: 20px;
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
  height: 490px;
  .left {
    width: 50%;
    float: left;
    padding: 40px;
    // height: 600px;
    img {
      width: 100%;
    }
  }
  .right {
    width: 50%;
    float: right;
    padding: 50px;
    padding-left: 100px;
  }
}
.bottom {
  .card {
    width: 80%;
    padding: 20px;
    margin-left: 10%;
    height: 200px;
    background-image: url("../../../assets/images/bbg.png"); /* 替换为你的图片路径 */
    background-size: cover; /* 背景图片覆盖整个元素 */
    background-repeat: no-repeat; /* 背景图片不重复 */
    // text-align: center;
    .title {
      width: 100%;
      height: 30px;
      font-weight: 700;
      margin-left: 20px;
    }
    .detail {
      margin-left: 20px;
      margin-top: 20px;
      width: 55%;
      height: 100px;
      color: #797979;
      line-height: 30px;
    }
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
}
.showDetail ,.showui{
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
}
</style>