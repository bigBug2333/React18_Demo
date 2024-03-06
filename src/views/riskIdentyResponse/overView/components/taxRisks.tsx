/*
** 税种风险分布情况
*/

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册需要使用的组件
echarts.use([PieChart, TitleComponent, TooltipComponent, CanvasRenderer]);
interface Props {
    pieChartDate: any,
}
const MyPieChart: React.FC<Props> = ({ pieChartDate }) => {
    const chartRef = useRef(null);
    const getColor = (color: any[]) => {
        return color.map((item: any) => {
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: `rgba(${item},0.7)` },
                { offset: 1, color: `rgba(${item},1)` },
            ])
        })
    };
    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);
        const options = {
            tooltip: {
                formatter: '{b}   {c}个   {d}%  ',
            },
            legend: {
                right: '10%',
                itemWidth: 10,
                itemHeight: 10,
                icon: 'circle',
                top: '5%',
                orient: 'vertical',
            },
            color: getColor(['75,132,244', '76,178,244', '233,66,62', '254,156,39', '37,185,147', '0,188,212', '255,42,108', '205,220,57']),
            series: [
                {
                    name: '税种',
                    type: 'pie',
                    radius: ['45%', '65%'],
                    label: {
                        show: true,
                        formatter: '{b}   {c}个   {d}%  ',
                    },
                    right: '40%',
                    data: pieChartDate.data,
                },
            ],
        }

        chartInstance.setOption(options);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return (
        <div ref={chartRef} style={{ width: '100%', height: '350px' }}></div>
    );
};

export default MyPieChart;
