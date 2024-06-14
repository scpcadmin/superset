import { ChartProps } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { UavSupplyBarState } from './types';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const { boldText, headerFontSize, headerText } = formData;

  const data = queriesData[0].data['0'] as UavSupplyBarState;

  let categories = [
    'Квадрокоптер розвідувальний',
    'Квадрокоптер ударний',
    'Загалом FPV',
    'Літак розвідувальний',
    'Літак ударний',
    'ЗАГАЛОМ'
  ];
  categories = categories.map((category) => category.split(' ').join('\n'));

  const dataZa103 = [10000, 0, 0, 30000, 0, 20000];
  const dataPeredano = [5000, 69000, 65000, 0, 47060, 0];
  const dataZakontaktovano = [100000, 100000, 100000, 100000, 100000, 100000];

  const dataMain = dataZakontaktovano.map(function(value, index) {
    return value - (dataZa103[index] + dataPeredano[index]);
  });

  console.log('formData via UavSupplyBarState.ts', data);

  const chartOptions: EChartsCoreOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        const total = dataZakontaktovano[params[0].dataIndex];
        let tooltipText = params[0].axisValue + '<br/>';
        params.forEach(function (item, index) {
          if (item.value !== 0) {
            const value = index === params.length - 1 ? total : item.value;
            tooltipText += item.marker + item.seriesName + ': ' + value + '<br/>';
          }
        });
        return tooltipText;
      }
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
            backgroundColor: (params) => {
              return params;
            }
          },
          name: {
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 24,
            opacity: 0.5,
            align: 'left',
            verticalAlign: 'bottom',
            padding: [4, 0, 0, 0]
          }
        }
      }
    },
    grid: {
      containLabel: true,
      bottom: 90,
      left: 20,
      right: 0
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 10,
        padding: [16, 0, 0, 0],
        interval: 0
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 10,
        padding: [0, 16, 0, 0]
      }
    },
    series: [
      {
        name: 'Передано',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'insideTop',
          formatter: function (params) {
            return params.value !== 0 ? params.value : '';
          },
          color: '#000',
          fontWeight: 'bold',
          fontSize: 10,
        },
        data: dataPeredano,
        itemStyle: {
          color: '#b0c965'
        }
      },
      {
        name: 'за 1.03',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'insideTop',
          formatter: function (params) {
            return params.value !== 0 ? params.value : '';
          },
          color: '#000',
          fontWeight: 'bold',
          fontSize: 10,
        },
        data: dataZa103,
        itemStyle: {
          color: '#23a29a'
        }
      },
      {
        name: 'Законтрактовано',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'insideTop',
          formatter: function (params) {
            return dataZakontaktovano[params.dataIndex];
          },
          color: '#000',
          fontWeight: 'bold',
          fontSize: 10,
        },
        data: dataMain,
        itemStyle: {
          color: '#f3d17f'
        }
      }
    ]
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
