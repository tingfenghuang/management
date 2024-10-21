<template>
    <div class="sex">
        <div class="title">
            male and fmale rate
        </div>
        <div class="picture">
            <div class="male">
                <img src="https://haowallpaper.com/link/common/file/previewFileImg/15102743251750208" alt=""
                    style="width: 100%;">
            </div>
            <div class="fmale">
                <img src="https://haowallpaper.com/link/common/file/previewFileImg/15613733095182656"
                    style="width: 100%;">
            </div>

        </div>
        <div class="rate">
            <p>male 45%</p>
            <p>fmale 55%</p>
        </div>
        <div class="echarts" ref="echarts_">

        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Sex'
}
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'


const echarts_ = ref<any>(null)

onMounted(() => {
    const myChart = echarts.init(echarts_.value);
    myChart.setOption({
        title: {
            text: 'Male and Female Rate', // 修正标题文本
            textStyle: {
                color: 'skyblue',
            },
            left: '30%',
        },
        xAxis: {
            type: 'value', // 设置 x 轴类型
            min: 0, // x 轴最小值
            max: 100, // x 轴最大值
            axisLabel: {
                color: 'skyblue', // x 轴标签颜色
            },
            show: false
        },
        yAxis: {
            type: 'category', // 设置 y 轴类型
            axisLabel: {
                color: 'skyblue', // y 轴标签颜色
            },
            show: false
        },
        series: [{
            type: 'bar',
            data: [58], // 数据
            itemStyle: {
                color: 'skyblue', // 条形颜色
                borderRadius:200,
               
            },
             z:100,
             
        },
        {
            type: 'bar',
            data: [100], // 数据
            itemStyle: {
                color: 'pink', // 条形颜色
                borderRadius:200,
            },
            barGap:'-100%'
        }],

        tooltip: {
            trigger: 'axis', // 鼠标悬浮时触发类型
            axisPointer: {
                type: 'shadow', // 轴指示器类型
            },
        },
        grid: {
            left: '3%', // 网格左边距
            right: '4%', // 网格右边距
            bottom: '3%', // 网格底边距
            containLabel: true, // 包含标签
        },
    });
})
</script>
<style lang="scss" scoped>
.sex {
    width: 100%;
    height: 100%;
   

    .title {
        width: 100%;
        height: 10%;
        line-height: 30px;
        text-indent: 2em;
    }

    .picture {
        width: 100%;
        height: 50%;
        display: flex;
        //侧轴对齐方式
        align-items: center;

        .male {
            flex: 1;
            margin: 10px;
        }

        .fmale {
            flex: 1;
            margin: 10px;
        }
    }

    .rate {
        width: 100%;
        display: flex;
        justify-content: space-around;

    }

    .echarts {
        width: 100%;
        height: 40%;
    }
}
</style>