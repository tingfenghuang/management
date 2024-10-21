<template>
  <div class="age">
    <div class="title">年龄分布饼图</div>
    <div class="echarts" ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Age'
}

</script>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const chartRef = ref<HTMLDivElement | null>(null)

const renderChart = () => {
  if (!chartRef.value) return
  
  const chartInstance = echarts.init(chartRef.value)
  
  const options = {
    // title: {
    //   text: '年龄分布',
    //   subtext: '根据调查数据',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '年龄',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 335, name: '18-24岁' },
          { value: 310, name: '25-34岁' },
          { value: 234, name: '35-44岁' },
          { value: 135, name: '45-54岁' },
          { value: 154, name: '55岁以上' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    color: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0']
  }

  chartInstance.setOption(options)

  // 为了适应窗口变化，监听窗口 resize
  window.addEventListener('resize', () => {
    chartInstance.resize()
  })
}

onMounted(() => {
  renderChart()
})
</script>

<style lang="scss" scoped>
.age {
    width: 100%;
    height: 100%;
  .title {
    font-size: 18px;
    font-weight: bold;
    // margin-bottom: 20px;
    text-align: center;
  }

  .echarts {
    /* 可以在这里添加更多样式来调整图表的外观 */
    // border: 1px solid #ccc;
    border-radius: 8px;
  }
}
</style>