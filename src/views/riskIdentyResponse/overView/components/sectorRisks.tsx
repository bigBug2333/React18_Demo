/*
** 右上柱状图-板块风险整体情况
*/

// BarChart.tsx
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface DataItem {
    category: string;
    value: number;
}

interface Props {
    barChartOption: any;
}

const BarChart: React.FC<Props> = ({ barChartOption }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    console.log(barChartOption)
    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);
            const options = {
                title: {
                    show: false,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                color: ['#3bdaff', '#1884ef'],
                grid: {
                    bottom: '50',
                    left: '5%',
                    right: '6%',
                    top: 70,
                },
                legend: {
                    top: '25',
                    itemWidth: 10,
                    itemHeight: 10,
                    icon: 'rect',
                    data: ['税局推送', '系统识别'],
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLabel: {
                            margin: 15,
                            textStyle: {
                                color: '#000',
                                fontSize: 10,
                            },
                            formatter: function (params: any) {
                                var newParamsName = "";
                                var paramsNameNumber = params.length;
                                var provideNumber = 4;  //一行显示几个字
                                // var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                if (paramsNameNumber > provideNumber) {
                                    newParamsName = params.substring(0, provideNumber) + '...'
                                } else {
                                    newParamsName = params
                                }
                                return newParamsName
                            },
                        },
                        data: barChartOption.xAxis,
                    },
                ],
                yAxis: [
                    {
                        // type: 'value',
                        // name: "风险数量",
                        nameGap: 35,
                        // splitNumber: 6,
                        // interval: 1,
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                            },
                        },
                    },
                    {
                        // name: "整改率",
                        // type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                            },
                            show: false
                        },
                        splitNumber: 8,
                        min: 0,
                        max: 100,
                        axisLabel: {
                            formatter: function (val: any) {
                                return val + '%'
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '税局推送',
                        type: 'bar',
                        barMaxWidth: 20,
                        stack: 'total',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 1, color: 'rgba(24,133,239,0.5)' },
                                { offset: 0, color: 'rgba(24,133,239,1)' },
                            ]),
                        },
                        label: {
                            show: true,
                            position: 'insideTop',
                            color: '#fff',
                        },
                        data: barChartOption.seriesData.sjts,
                        // data: data.seriesData.sjts,
                    },
                    {
                        name: '系统识别',
                        type: 'bar',
                        stack: 'total',
                        barMaxWidth: 20,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 1, color: 'rgba(58,218,255,0.5)' },
                                { offset: 0, color: 'rgba(58,218,255,1)' },
                            ]),
                        },
                        label: {
                            show: true,
                            position: 'insideBottom',
                            color: '#fff',
                        },
                        data: barChartOption.seriesData.xtsb,
                    },
                    {
                        name: '整改率',
                        type: 'line',
                        color: '#21c8ff',
                        label: {
                            show: true,
                            position: 'top',
                            color: '#000',
                            formatter: function (data: any) {
                                return Number(data.value).toFixed(2) + '%'
                            },
                            fontWeight: 'bold',
                        },
                        tooltip: {
                            valueFormatter: (value: any) => value + '%',
                        },
                        yAxisIndex: 1,
                        data: barChartOption.seriesData.bkfxzb,
                    },
                    // {
                    //   name: '合计',
                    //   type: 'line',
                    //   color: '#21c8ff',
                    //   label: {
                    //     show: true,
                    //     position: 'top',
                    //     color: '#000',
                    //     formatter: function (data) {
                    //       return Number(data.value).toFixed(2) + '%'
                    //     },
                    //     fontWeight: 'bold',
                    //   },
                    //   tooltip: {
                    //     valueFormatter: (value) => value + '%',
                    //   },
                    //   yAxisIndex: 1,
                    //   data: data.seriesData.riskSum,
                    // },
                ],
            }

            chartInstance.setOption(options);

            return () => {
                chartInstance.dispose();
            };
        }
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;
