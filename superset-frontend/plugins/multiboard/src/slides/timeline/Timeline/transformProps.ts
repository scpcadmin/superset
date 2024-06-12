import { ChartProps } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { TimelineState } from './types';

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці від 0 до 11
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

function isFirstOfMonth(index: number, dateString: string) {
  return new Date(dateString).getDate() === 1;
}

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const { boldText, headerFontSize, headerText } = formData;

  const data = queriesData[0].data as TimelineState[];

  const dateAdded: string[] = [];
  const criticalLevelAttacks: number[] = [];
  const highLevelAttacks: number[] = [];

  data.forEach(item => {
    dateAdded.push(formatDate(item.dateAdded));
    criticalLevelAttacks.push(item.criticalLevelAttacks);
    highLevelAttacks.push(item.highLevelAttacks);
  });

  const chartOptions: EChartsCoreOption = {
    grid: {
      left: '15px',
      right: '5px',
      bottom: '5%',
      top: '90px',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      top: 0,
      right: 0,
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
            backgroundColor: (params) => {
              return params;
            },
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
    xAxis: {
      type: 'category',
      data: dateAdded,
      boundaryGap: false,
      splitLine: {
        show: true,
        interval(index, value) {
          if (index === 0 || index === dateAdded.length - 1) {
            return true;
          }
          return isFirstOfMonth(index, value);
        },
      },
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        formatter(value, index) {
          const date = new Date(value);
          const day = date.getDate();
          const monthNames = [
            'Січень',
            'Лютий',
            'Березень',
            'Квітень',
            'Травень',
            'Червень',
            'Липень',
            'Серпень',
            'Вересень',
            'Жовтень',
            'Листопад',
            'Грудень',
          ];
          const month = monthNames[date.getMonth()];
          const val = chartOptions.series[0].data[index];
          const prev = chartOptions.series[0].data[index - 1];
          const next = chartOptions.series[0].data[index + 1];
          let str = '';
          if (
            val === 0 &&
            (prev === undefined || prev === 0) &&
            (next === undefined || next === 0)
          ) {
            str += `{a|${day}}`;
          } else {
            str += `{b|${day}}`;
          }
          if (prev === undefined) {
            str += `\n` + `{c|${month}}`;
          } else if (day === 1) {
            str += `\n` + `{d|${month}}`;
          }
          return str;
        },
        rich: {
          a: {
            color: '#000000',
            padding: [15, 0, 0, 0],
            fontSize: 10,
            opacity: 0.5,
          },
          b: {
            color: '#FF0000',
            padding: [15, 0, 0, 0],
            fontSize: 10,
          },
          c: {
            color: '#000000',
            padding: [8, 0, 0, 70],
            fontSize: 16,
            fontFamily: 'eUkraine-Medium',
          },
          d: {
            color: '#000000',
            fontSize: 16,
            fontFamily: 'eUkraine-Medium',
            padding: [8, 60, 0, 0],
          },
        },
      },
    },
    yAxis: {
      axisLabel: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
        padding: [0, 15, 0, 0],
      },
    },
    series: [
      {
        name: 'Критичний рівень',
        type: 'line',
        data: criticalLevelAttacks,
        itemStyle: {
          color: '#FF0000', // колір точок
        },
        symbol(value, params) {
          return value !== 0 ? 'circle' : 'none';
        },
      },
      {
        name: 'Високий рівень',
        type: 'line',
        data: highLevelAttacks,
        itemStyle: {
          color: '#FF7A00', // колір точок
        },
        symbol(value, params) {
          return value !== 0 ? 'circle' : 'none';
        },
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
  };
}
