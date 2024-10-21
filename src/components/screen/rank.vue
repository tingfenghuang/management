<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
export default {
  name: 'Rank_',
}
</script>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 热门景区数据
const chartData = [
  { name: '景区A', value: 1200 },
  { name: '景区B', value: 900 },
  { name: '景区C', value: 850 },
  { name: '景区D', value: 700 },
  { name: '景区E', value: 600 }
]

const chart = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (chart.value) {
    const myChart = echarts.init(chart.value)

    const option = {
      title: {
        text: 'Popular Attractions Ranking',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.name),
        axisLabel: {
          interval: 0,
          rotate: 30 // 旋转标签以适应长名称
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '景区热度',
          type: 'bar',
          data: chartData.map(item => item.value),
          itemStyle: {
            color: '#5470C6'
          }
        }
      ]
    }

    myChart.setOption(option)
  }
})
</script>

<style lang="scss" scoped>
// 你可以在这里添加一些样式来美化图表容器
</style>