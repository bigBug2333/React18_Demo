// LineChart.tsx
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface DataItem {
    date: string;
    value: number;
}

interface Props {
    data: DataItem[];
}

const LineChart: React.FC<Props> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);

            const options: echarts.EChartOption = {
                title: {
                    text: '折线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: data.map(item => item.date)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: data.map(item => item.value),
                    type: 'line'
                }]
            };

            chartInstance.setOption(options);

            return () => {
                chartInstance.dispose();
            };
        }
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LineChart;
