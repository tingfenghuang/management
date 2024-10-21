<template>
  <div ref="chartRef" style="width: 100%; height: 100%;"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 引入类型定义
const chartRef = ref<HTMLDivElement | null>(null)

const initChart = () => {
  if (chartRef.value) {
    const chartInstance = echarts.init(chartRef.value)

    // 示例数据
    const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
    const visitorCountsA = [150, 200, 250, 300, 220, 400, 450, 500]  // 第一组游客量
    const visitorCountsB = [180, 230, 270, 350, 270, 380, 420, 480]  // 第二组游客量
    const visitorCountsC = [160, 210, 220, 290, 200, 390, 460, 510]  // 第三组游客量
    const visitorCountsD = [170, 240, 260, 310, 290, 410, 440, 530]  // 第四组游客量

    const option = {
      title: {
        text: ' Visitor Volume Comparison',
        left: 'center',
        top: '20px',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line', // 可选类型：line | shadow
        },
      },
      legend: {
        data: ['游客量A', '游客量B', '游客量C', '游客量D'],
        top: '60px',
        textStyle: {
          fontSize: 14,
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: years,
        axisLine: {
          lineStyle: {
            color: '#999',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: '游客量',
        axisLine: {
          lineStyle: {
            color: '#999',
          },
        },
        splitLine: {
          show: false, // 移除参考线
        },
      },
      series: [
        {
          name: '游客量A',
          type: 'line',
          data: visitorCountsA,
          smooth: true,
          itemStyle: {
            color: '#FF5733',
            borderColor: '#FF5733',
            borderWidth: 2,
          },
          lineStyle: {
            width: 4,
          },
        },
        {
          name: '游客量B',
          type: 'line',
          data: visitorCountsB,
          smooth: true,
          itemStyle: {
            color: '#33B5FF',
            borderColor: '#33B5FF',
            borderWidth: 2,
          },
          lineStyle: {
            width: 4,
          },
        },
        {
          name: '游客量C',
          type: 'line',
          data: visitorCountsC,
          smooth: true,
          itemStyle: {
            color: '#28A745',
            borderColor: '#28A745',
            borderWidth: 2,
          },
          lineStyle: {
            width: 4,
          },
        },
        {
          name: '游客量D',
          type: 'line',
          data: visitorCountsD,
          smooth: true,
          itemStyle: {
            color: '#FFC107',
            borderColor: '#FFC107',
            borderWidth: 2,
          },
          lineStyle: {
            width: 4,
          },
        },
      ],
    }

    chartInstance.setOption(option)

    // 清理图表实例
    window.addEventListener('resize', () => chartInstance.resize())
  }
}

onMounted(() => {
  initChart()
})
</script>

<style lang="scss" scoped>
/* 可根据需要添加样式 */
</style>