<template>
    <div class="youke">
        <div class="top">
            <div class="left">

            </div>
            <div class="right">

            </div>
        </div>
        <div class="bottom">
            <div class="people">
                <div class="shang">
                    <span v-for="i in people" class="number">{{ i }}</span>
                </div>
                <div class="xia">
                    <div class="encharts" ref="echarts_" style="width: 100%; height: 100%; ">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "Youke"
}

</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const people = ref<any>('295670人')
const echarts_ = ref<any>(null)



onMounted(() => {
    var myChart = echarts.init(echarts_.value);
    var option = {
        title: {

            top: 10,
            textStyle: {
                color: '#333',
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            show: false,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#666'
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                type: 'liquidFill',
                data: [0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05],
                radius: '75%',
                outline: {
                    show: false
                },
                label: {
                    show: true,
                    formatter: '{c}%',
                    textStyle: {
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                backgroundStyle: {
                    color: 'rgba(0, 128, 255, 0.1)'
                },
                color: [
                    {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(0, 128, 255, 0.8)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(0, 128, 255, 0.2)'
                            }
                        ]
                    }
                ]
            }
        ],
        grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '20%',
            containLabel: false
        }
    }
    myChart.setOption(option)
})
</script>
<style lang="scss" scoped>
.youke {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;


    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 10%;
        line-height: 40px;



        .left {
            flex: 1;
            height: 100%;
            //文本缩进2个字符
            text-indent: 1.5em;





        }

        .right {
            flex: 1;
            height: 100%;


        }
    }

    .bottom {
        flex: 1;

        display: flex;
        //从上到下排列
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .people {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            width: 100%;

            .shang {
                flex: 1;
                width: 100%;
                display: flex;


                .number {
                    flex: 1;
                    text-align: center;
                    font-size: 24px;
                    line-height: 50px;
                    font-family: 'Arial', sans-serif;
                    /* 可以使用你喜欢的字体 */
                    color: #4A90E2;
                    /* 调整颜色，可以选择渐变色 */
                    font-weight: bold;
                    /* 加粗字体 */
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
                    /* 添加阴影效果 */
                    background-color: #f7f7f7;
                    /* 添加背景色 */
                    border-radius: 5px;
                    /* 添加圆角 */
                    // padding: 10px;
                    /* 添加内边距 */
                    transition: transform 0.2s;
                    /* 添加过渡效果 */
                    margin: 10px;
                    // box-sizing: border-box;

                    .number:hover {
                        transform: scale(1.05);
                        /* 鼠标悬停时稍微放大 */
                    }

                }


            }

            .xia {
                flex: 6;
                width: 100%;

            }

        }

    }
}
</style>