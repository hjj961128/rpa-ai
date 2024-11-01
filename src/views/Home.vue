<template>
  <div class="main-page">
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
      <div class="bottom-div">
        <div class="bottom-title">
          <span class="bottom-title-txt"> RPA与传统人工运行次数对比</span>
        </div>
        <div
          id="myEcharts1"
          :style="{ width: '100%', height: '350px', background: '#fff' }"
        ></div>
      </div>
      <div class="bottom-div">
        <div class="bottom-title">
          <span class="bottom-title-txt"> 各业务域RPA机器人数</span>
        </div>
        <div
          id="myEcharts2"
          :style="{ width: '100%', height: '350px', background: '#fff' }"
        ></div>
      </div>
      <div class="bottom-div" style="max-width: 350px">
        <div class="bottom-title">
          <span class="bottom-title-txt">热门流程</span>
        </div>
        <div class="bottombox">
          <div class="process" v-for="(item, index) in tableData" :key="index">
            <el-button
              key="primary"
              type="primary"
              size="large"
              link
              @click="goDetail(item)"
            >
              <div>
                <span class="xuhao">{{ index + 1 }}</span>
                <span class="zi"> {{ item.name }}</span>
              </div>
            </el-button>
          </div>
          <!-- <ul v-for="(item, index) in tableData" :key="index">
            <li>
              <el-button
                key="primary"
                type="primary"
                size="large"
                link
                @click="goDetail(item)"
              >
                <span> {{ item.name }}</span>
              </el-button>
            </li>
          </ul> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { ElMessage, ElMessageBox } from "element-plus";
import request from "@/utils/request";
import { useRouter } from "vue-router";

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
  getProcessList();
  const chartDom = document.getElementById("myEcharts1");
  // 删除_echarts_instance_属性
  chartDom.removeAttribute("_echarts_instance_");
  const chartDom2 = document.getElementById("myEcharts2");
  chartDom2.removeAttribute("_echarts_instance_");

  const myChart = echarts.init(chartDom);
  const myChart2 = echarts.init(chartDom2);
  const option = {
    // title: {
    //   text: 'World Population'
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    xAxis: {
      type: "category",
      data: ["第一季度", "第二季度", "第三季度", "第四季度"],
    },
    series: [
      {
        name: "传统人工",
        type: "bar",
        data: [351, 414, 367, 256],
        itemStyle: {
          normal: {
            barBorderRadius: [20, 20, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: "#3977E6" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
      },
      {
        name: "RPA智能机器人",
        type: "bar",
        data: [1150, 1400, 1021, 1255],
        itemStyle: {
          normal: {
            barBorderRadius: [20, 20, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: "#147C72" },
              { offset: 1, color: "#B4F0E8" },
            ]),
          },
        },
      },
    ],
  };
  const option2 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    yAxis: {
      data: ["调度自动化", "运维部", "财资部", "党建部", "人资部", "营销部"],
      type: "category",
    },
    xAxis: {
      boundaryGap: [0, 0.01],
      type: "value",
    },
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          barBorderRadius: [0, 20, 20, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: [8, 1, 4, 3, 4, 13],
      },
    ],
  };
  option && myChart.setOption(option);
  option2 && myChart2.setOption(option2);

  const resizeChart = () => {
    if (myChart) {
      myChart.resize();
    }
    if (myChart2) {
      myChart2.resize();
    }
  };

  window.addEventListener("resize", resizeChart);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeChart);
    // chartInstance.dispose();
  });
});
</script>
<style lang="scss" scoped>
.main-page {
  height: 95vh;
  width: 100%;
  background-color: #eef5fd;
}
.top-title {
  width: 100%;
  height: 180px;
  background-image: url("../assets/images/home-bg.jpg");
  /* 替换为你的图片路径 */
  background-size: cover;
  /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat;
  /* 背景图片不重复 */
  background-color: rgba(255, 255, 255, 0.7);

  p {
    padding: 25px;
    width: 60%;
    font-weight: 800;
    line-height: 36px;
    text-indent: 2ch;
    color: #333;
  }
}

.top-div {
  margin-top: 20px;
  height: 200px;
  border-radius: 6px;
  background: url("../assets/images/cardbg.png") no-repeat center/cover;
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
.bottom {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.bottom-div {
  margin-top: 30px;
  width: 30%;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
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
.bottombox {
  padding: 20px;
  .process {
    height: 40px;
  }
  .xuhao {
    margin-right: 10px;
    color: #9195a3;
  }
  .zi {
    color: #2440b3;
  }
}
</style>
