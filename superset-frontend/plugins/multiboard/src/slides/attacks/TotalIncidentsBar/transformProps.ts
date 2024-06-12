import { ChartProps } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { TotalIncidentsBarState } from './types';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const { boldText, headerFontSize, headerText } = formData;

  const data = queriesData[0].data['0'] as TotalIncidentsBarState;
  const testData = {
    ...data,
    year: new Date(data.dateAdded),
    totalPrevYear: 2543,
  };

  const date = new Date(testData.dateAdded);
  const yearThis = date.getUTCFullYear();
  const yearPrev = yearThis - 1;

  const barData = [
    {
      value: testData.totalCriticalPrevYear,
      name: yearPrev.toString(),
      itemStyle: { color: '#EFCF41' },
    },
    {
      value: testData.totalCriticalThisYear,
      name: yearThis.toString(),
      itemStyle: { color: '#A0BE5A' },
    },
  ];

  console.log('formData via TotalIncidentsBarState.ts', barData);

  const chartOptions: EChartsCoreOption = {
    grid: {
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: barData.map(item => item.name),
      axisLabel: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 10,
        padding: [33, 0, 0, 0],
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 10,
        padding: [0, 30, 0, 0],
      },
    },
    series: [
      {
        data: barData,
        type: 'bar',
      },
    ],
  };

  return {
    width,
    height,
    data: testData,
    yearThis,
    yearPrev,
    // and now your control data, manipulated as needed, and passed through as props!
    boldText,
    headerFontSize,
    headerText,
    chartOptions,
  };
}
