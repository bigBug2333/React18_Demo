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

const MyPieChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const options = {
            title: {
                text: 'Pie Chart'
            },
            series: [{
                type: 'pie',
                data: [
                    { name: 'A', value: 100 },
                    { name: 'B', value: 200 },
                    { name: 'C', value: 300 }
                ]
            }]
        };

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
