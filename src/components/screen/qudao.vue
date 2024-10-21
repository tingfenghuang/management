<template>
  <div ref="chartContainer" style="width: 100%; height: 400px;"></div>
</template>

<script lang="ts">
export default {
  name: 'Qudao',
}
</script>

<script lang="ts" setup>
import { onMounted, ref ,  onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (chartContainer.value) {
    // Initialize the chart
    const myChart = echarts.init(chartContainer.value)

    // Define the data
    const data = [
      { value: 335, name: 'Appointment A' },
      { value: 310, name: 'Appointment B' },
      { value: 234, name: 'Appointment C' },
      { value: 135, name: 'Appointment D' },
      { value: 1548, name: 'Appointment E' },
    ]

    // Specify the chart options
    const options = {
      title: {
        text: 'Appointment Channel Statistics', // 图表标题
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Channel',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }

    // Use the defined options in the chart
    myChart.setOption(options)

    // Optional: Add resize handler
    window.addEventListener('resize', () => {
      myChart.resize()
    })

    // Cleanup on component unmount
    onBeforeUnmount(() => {
      window.removeEventListener('resize', () => {
        myChart.resize()
      })
      myChart.dispose()
    })
  }
})
</script>

<style lang="scss" scoped>
/* 可以在这里添加样式 */
</style>