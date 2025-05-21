<template>
  <div class="echarts" id="echarts1" style="width: 100%; height: 270px"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  const chartDom = document.getElementById("echarts1");
  const myChart = echarts.init(chartDom);
  const option = {
    grid: {
      top: "2%",
      left: "10%", // grid布局设置适当调整避免X轴文字只能部分显示
      right: "10%", // grid布局设置适当调整避免X轴文字只能部分显示
      bottom: "1%",
    },
    tooltip: {},
    yAxis: {
      axisLine: { show: false }, //不显示坐标轴
      axisTick: {
        show: false, //不显示坐标轴刻度线
      },
      type: "category",
      data: ["营销部", "人资部", "党建部", "财资部", "运维部", "调度自动化处"],
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#333", // 线条颜色
          width: 0, // 线条宽度
          type: "solid", // 线条类型，如'solid'、'dotted'等
        },
      },
    },
    series: [
      {
        name: "销量",
        type: "bar",
        barWidth: 12,
        showBackground: true,
        backgroundStyle: {
          color: "#CDFDEF",
          opacity: 0.2,
        },
        itemStyle: {
          borderWidth: 3,
          // borderColor: '#4CD7AD',
          color: "#E0FFF9",
          // 设置内阴影的颜色
          shadowColor: "#4CD7AD",
          // 设置内阴影的模糊大小
          shadowBlur: 3,
          // 设置内阴影相对于柱子的偏移
          shadowOffset: -3,
        },
        data: [5, 20, 36, 10, 10, 20],
      },
      {
        z: 3,
        name: "数据",
        type: "pictorialBar",
        symbolPosition: "end",
        data: [5, 20, 36, 10, 10, 20],
        symbol: "rect",
        symbolOffset: ["50%", "0%"],
        symbolSize: 12,
        color: "#47D5AC",
      },
    ],
  };
  myChart.setOption(option);
});
</script> 