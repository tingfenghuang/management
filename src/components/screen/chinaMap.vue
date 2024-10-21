<template>
  <div class="chianMap">
    <div class="map" ref="mapRef"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ChinaMap'
}

</script>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chianJson from "./china.json"

// 创建一个 ref 来引用地图容器
const mapRef = ref<HTMLDivElement | null>(null)
//register map
echarts.registerMap('china', chianJson as any)

onMounted(() => {
  const myChart = echarts.init(mapRef.value as HTMLDivElement)
  myChart.setOption({
    geo: {
      map: 'china',
      roam: true,
      label: {
        show: true,
        fontSize: 14,
        color: '#111',
        fontFamily: 'Arial'
      },
      itemStyle: {
        areaColor: '#fff0f0',
        borderColor: '#666',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowBlur: 15
      },
      emphasis: {
        itemStyle: {
          areaColor: 'lightgrey'
        }
      }
    },
    series: [{
      type: 'lines',
      coordinateSystem: 'geo',
      data: [
        {
          coords: [
            [112.982279, 28.19409],
            [87.617733, 43.792818]
          ],
          lineStyle: {
            color: '#333',
            width: 3,
            curveness: 0.2
          }
        },
        {
          coords: [
            [121.473701, 31.230416],
            [104.061572, 30.656946]
          ],
          lineStyle: {
            color: '#666',
            width: 3,
            curveness: 0.2
          }
        },
        {
          coords: [
            [113.264385, 23.12911],
            [108.948847, 34.265472]
          ],
          lineStyle: {
            color: '#999',
            width: 3,
            curveness: 0.2
          }
        }
        // 可以继续添加更多航线...
      ],
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: '#333',
        symbolSize: 12,
        symbol: 'arrow'
      }
    }]
  })
})
</script>

<style scoped lang="scss">
.chianMap {
  width: 100%;
  height: 100%;

  .map {
    width: 100%;
    height: 100%;
  }
}
</style>