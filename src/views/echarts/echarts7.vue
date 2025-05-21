<template>
  <div class="echarts" id="echarts7" style="width: 100%; height: 180px"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  const chartDom = document.getElementById("echarts7");
  const myChart = echarts.init(chartDom);
  const option = {
  color: ['#09BFFF', '#74F8FE '],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Line 1', 'Line 2']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: { show: false }, //不显示坐标轴
      axisTick: {
        show: false, //不显示坐标轴刻度线
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value',
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
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: false,
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(17,196,255,0.2)'
          },
          {
            offset: 1,
            color: 'rgba(64,125,252,0)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: false,
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(15,196,252,0.2)'
          },
          {
            offset: 1,
            color: 'rgba(64,125,252,0)'
          }
        ])
      },
      data: [120, 282, 111, 234, 220, 340, 310]
    },
  ]
};
  myChart.setOption(option);
});
</script> 