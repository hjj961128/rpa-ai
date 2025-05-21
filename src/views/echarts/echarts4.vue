<template>
  <div class="echarts" id="echarts4" style="width: 100%; height: 220px"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  const chartDom = document.getElementById("echarts4");
  const myChart = echarts.init(chartDom);
  const option = {
    grid: {
      top: "10%",
      left: "10%", // grid布局设置适当调整避免X轴文字只能部分显示
      right: "10%", // grid布局设置适当调整避免X轴文字只能部分显示
      bottom: "10%",
    },
    tooltip: {},
    xAxis: {
      axisLine: { show: false }, //不显示坐标轴
      axisTick: {
        show: false, //不显示坐标轴刻度线
      },
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {
      axisLabel: {
        show: true,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#DCDEE0", // 线条颜色
          width: 1, // 线条宽度
          type: "dashed", // 线条类型，如'solid'、'dotted'等
        },
      },
    },
    series: [
      {
        name: "销量",
        type: "bar",
        barWidth: 16,
        showBackground: true,
        backgroundStyle: {
          color: "#CDFDEF",
          opacity: 0.2,
        },
        itemStyle: {
          barBorderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              //只要修改前四个参数就ok
              offset: 0,
              color: "#AAE4FE",
            }, //柱图渐变色
            {
              offset: 1,
              color: "#4CABFC",
            },
          ]),
        },
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  myChart.setOption(option);
});
</script> 