<template>
  <div>
    <div class="top-title">
      <p>
        以机器人流程自动化（RPA）技术为底座，在传统RPA组件的基础上设计具体场景定制化流程，结合成熟AI组件，打造从创建，流程编排，发布到调优的RPA+AI一体化工具箱，实现UI元素选择器功能，组件库组合处理功能，运行结果回传功能，基于已沉淀的业务场景开发解决方案模块和工具箱模块，可根据电力领域业务场景提供专业RPA解决方案，提供开箱即用的通用工具以及流程在线浏览和试用服务.
      </p>
    </div>
    <div class="top">
      <div class="flex-container">
        <div class="top-div">
          <div class="iconImg el-icon-Watch">
            <svg-icon name="allday"></svg-icon>
          </div>
          <div class="icontitle">全天候待命</div>
          <div class="iconTxt">
            能够7*24小时全天候执行此前人力从事的工作，节假日无休
          </div>
        </div>
        <div class="top-div">
          <div class="iconImg el-icon-Watch">
            <svg-icon name="tu2"></svg-icon>
          </div>
          <div class="icontitle">成本降低</div>
          <div class="iconTxt">
            机器人可以完成耗时及重复的任务，释放人力去执行更有价值的任务
          </div>
        </div>
        <div class="top-div">
          <div class="iconImg el-icon-Watch">
            <svg-icon name="tu3"></svg-icon>
          </div>
          <div class="icontitle">准确度高</div>
          <div class="iconTxt">
            提高工作质量，避免出现人为错误而导致的返工，速度和准确率接近100%
          </div>
        </div>
        <div class="top-div">
          <div class="iconImg el-icon-Watch">
            <svg-icon name="tu4"></svg-icon>
          </div>
          <div class="icontitle">出错率低</div>
          <div class="iconTxt">
            长时间操作系统，容易出现疲劳，从而导致出错。使用RPA，可以有效降低出错率
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <el-row :gutter="20">
        <el-col :span="6" :offset="1">
          <div class="bottom-div">
            <div class="bottom-title">
              <span class="bottom-title-txt"> RPA与传统人工成本对比</span>
            </div>
            <div
              id="myEcharts1"
              :style="{ width: '370px', height: '350px', background: '#fff' }"
            ></div>
          </div>
        </el-col>
        <el-col :span="6" :offset="2">
          <div class="bottom-div">sas</div>
        </el-col>
        <el-col :span="6" :offset="2">
          <div class="bottom-div">sas</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";



onMounted(() => {
  const chartDom = document.getElementById('myEcharts1');
const myChart = echarts.init(chartDom);
  const option = {
  title: {
    text: 'World Population'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  xAxis: {
    type: 'category',
    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
  },
  series: [
    {
      name: '2011',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '2012',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
};
  option && myChart.setOption(option);
});
</script>
<style lang="scss" scoped>
.top-title {
  width: 100%;
  height: 180px;
  background-image: url("../assets/images/home-bg.jpg"); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 背景图片不重复 */
  p {
    padding: 25px;
    width: 60%;
    font-weight: 800;
    font-weight: 28px;
    line-height: 36px;
    text-indent: 2ch;
    color: #333;
  }
}
.top-div {
  margin-top: 20px;
  height: 200px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  padding-top: 20px;
  width: 20%;
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
.bottom-div {
  margin-top: 30px;
  height: 500px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  .bottom-title {
    width: 100%;
    background-color: #fff;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eaeaea;
    .bottom-title-txt {
      display: inline-block;
      margin-left: 20px;
    }
  }
}
svg {
  width: 48px;
  height: 48px;
  color: rgb(81, 81, 81);
}
.flex-container {
  display: flex;
  justify-content: space-around;
}
</style>