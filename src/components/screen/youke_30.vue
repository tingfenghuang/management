<template>
  <div ref="chartContainer" style="width: 100%; height: 100%;"></div>
</template>

<script lang="ts">
export default {
  name: "Youke_30"
}
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const myChart = echarts.init(chartContainer.value!);

  // 生成未来三十天的日期
  const data = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    data.push({
      date: date.toLocaleDateString(),
      value: Math.floor(Math.random() * 100) // 随机生成每一天的值
    });
  }

  const option = {
    title: {
      text: '未来三十天折线图'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '数值',
      type: 'line',
      data: data.map(item => item.value),
      smooth: true
    }]
  };

  myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
/* 这里可以添加样式 */
</style>