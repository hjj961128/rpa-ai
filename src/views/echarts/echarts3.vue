<template>
  <div class="echarts" id="echarts3" style="width:100%; height: 150px"></div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  const chartDom = document.getElementById("echarts3");
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: "88%",
      textStyle: {
        color: "#0D9D80",
        fontSize: 22,
      },
      itemGap: 20,
      left: "center",
      top: "40%",
    },
    angleAxis: {
      max: 100,
      clockwise: false, // 逆时针
      // 隐藏刻度线
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    polar: [
      {
        center: ["50%", "50%"],
        radius: "100%",
      },
    ],
    series: [
      {
        type: "bar",
        data: [60],
        showBackground: true,
        polarIndex: 0,
        coordinateSystem: "polar",
        roundCap: true,
        barWidth: 10,
        itemStyle: {
          normal: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#86E6F7",
              },
              {
                offset: 1,
                color: "#52CAFC",
              },
            ]),
          },
        },
      },
    ],
  };
  myChart.setOption(option);
});
</script>