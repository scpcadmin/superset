import { ChartProps } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { UavScheduleBarState } from './types';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const { boldText, headerFontSize, headerText } = formData;

  const data = queriesData[0].data as UavScheduleBarState[];
  const year = new Date(queriesData[0].to_dttm).getFullYear();

  console.log('formData via UavScheduleBarState.ts', data);

  const chartOptions: EChartsCoreOption = {
    grid: {
      containLabel: true,
      bottom: 90,
      left: 20,
      right: 0,
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      bottom: 0,
      left: -30,
      itemGap: 16,
      icon: 'none',
      formatter(name) {
        return `{symbol|}\n{name|${name}}`;
      },
      textStyle: {
        rich: {
          symbol: {
            align: 'left',
            verticalAlign: 'top',
            width: 15,
            height: 15,
            borderRadius: 50,
            backgroundColor: params => params,
          },
          name: {
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 24,
            opacity: 0.5,
            align: 'left',
            verticalAlign: 'bottom',
            padding: [4, 0, 0, 0],
          },
        },
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.month),
      axisLabel: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 10,
        padding: [16, 0, 0, 0],
        interval: 0,
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
        padding: [0, 16, 0, 0],
      },
    },
    series: [
      {
        name: 'Загальна кількість',
        data: data.map(item => item.amount),
        type: 'bar',
        barWidth: '6px',
        itemStyle: {
          color: '#EFCF41',
        }
      },
    ],
  };

  return {
    width,
    height,
    boldText,
    headerFontSize,
    headerText,
    chartOptions,
    year
  };
}
