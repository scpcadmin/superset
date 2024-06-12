import {ChartProps} from '@superset-ui/core';
import {EChartsCoreOption} from 'echarts';
import {AttackState, PieDataItem} from './types';

const convertData = (data: AttackState[]): PieDataItem[][] =>
  data.map(item => [
    {
      value: item.critical,
      name: 'Критичний рівень',
      itemStyle: {color: '#F20000'},
    },
    {
      value: item.high,
      name: 'Високий рівень',
      itemStyle: {color: '#FF7A00'},
    },
    {
      value: item.medium,
      name: 'Середній рівень',
      itemStyle: {color: '#5A9679'},
    },
    {
      value: item.low,
      name: 'Низький рівень',
      itemStyle: {color: '#A0BE5A'},
    },
  ]);

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці від 0 до 11
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}.${month}.${year}`;
};

const getColorByName = (data: PieDataItem[], name: string) => {
  // Use the find method to get the object with the matching name
  const item = data.find(item => item.name === name);
  // Return the color if found, otherwise return a default color
  return item ? item.itemStyle.color : '#000000';
};

export default function transformProps(chartProps: ChartProps) {
  const {width, height, formData, queriesData} = chartProps;
  const {boldText, headerFontSize, headerText} = formData;

  const data = queriesData[0].data as AttackState[];
  const date1 = formatDate(data[0].date_added);
  const date2 = formatDate(data[1].date_added);

  const incidentData = convertData(data);

  const total1 = incidentData[0].reduce((acc, curr) => acc + curr.value, 0);
  const total2 = incidentData[1].reduce((acc, curr) => acc + curr.value, 0);

  const chartOptions: EChartsCoreOption = {
    grid: {
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      bottom: 0,
      left: 'center',
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
            backgroundColor(params) {
              return getColorByName(incidentData[0], params.name);
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
    series: [
      {
        name: `Інциденти за ${date1}`,
        type: 'pie',
        radius: ['35%', '46%'],
        center: ['25%', '35%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter(params: any) {
            return `{${params.dataIndex}|${params.percent}% (${params.value})}`;
          },
          rich: {
            0: {
              fontSize: 12,
              lineHeight: 15,
              color: incidentData[0][0].itemStyle.color,
              fontWeight: 700,
            },
            1: {
              fontSize: 12,
              lineHeight: 15,
              color: incidentData[0][1].itemStyle.color,
              fontWeight: 700,
            },
            2: {
              fontSize: 12,
              lineHeight: 15,
              color: incidentData[0][2].itemStyle.color,
              fontWeight: 700,
            },
            3: {
              fontSize: 12,
              lineHeight: 15,
              color: incidentData[0][3].itemStyle.color,
              fontWeight: 700,
            },
          },
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 0,
        },
        data: incidentData[0],
      },
      {
        type: 'pie',
        radius: ['35%', '46%'],
        center: ['25%', '35%'],
        emphasis: {
          disabled: true,
        },
        label: {
          show: true,
          position: 'center',
          formatter(params: any) {
            const totalText = `{total|всього}\n{value|${total1}}`;
            return totalText;
          },
          rich: {
            total: {
              fontSize: 12,
              fontWeight: 400,
              color: '#000',
              opacity: 0.7,
            },
            value: {
              fontSize: 28,
              fontWeight: 700,
              color: '#000',
            },
          },
        },
        data: incidentData[0],
      },
      {
        type: 'pie',
        radius: ['35%', '46%'],
        center: ['25%', '35%'],
        emphasis: {
          disabled: true
        },
        label: {
          show: true,
          position: 'center',
          formatter: function (params) {
            return '{value|' + date1 + '}';
          },
          rich: {
            value: {
              fontSize: 24,
              fontWeight: 700,
              padding: [350, 0, 0, 0]
            }
          }
        },
        data: incidentData[0]
      },
      {
        name: `Інциденти за ${date2}`,
        type: 'pie',
        radius: ['35%', '46%'],
        center: ['75%', '35%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter(params: any) {
            return `{${params.dataIndex}|${params.percent}% (${params.value})}`;
          },
          rich: {
            0: {
              fontSize: 12,
              lineHeight: 15,
              color: incidentData[1][0].itemStyle.color,
              fontWeight: 700,
            },
            1: {
              fontSize: 12,
              lineHeight: 15,
              color: incidentData[1][1].itemStyle.color,
              fontWeight: 700,
            },
            2: {
              fontSize: 12,
              lineHeight: 15,
              color: incidentData[1][2].itemStyle.color,
              fontWeight: 700,
            },
            3: {
              fontSize: 12,
              lineHeight: 15,
              color: incidentData[1][3].itemStyle.color,
              fontWeight: 700,
            },
          },
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 0,
        },
        data: incidentData[1],
      },
      {
        type: 'pie',
        radius: ['35%', '46%'],
        center: ['75%', '35%'],
        emphasis: {
          disabled: true
        },
        label: {
          show: true,
          position: 'center',
          formatter(params: any) {
            const totalText = `{total|всього}\n{value|${total2}}`;
            return totalText;
          },
          rich: {
            total: {
              fontSize: 12,
              fontWeight: 400,
              color: '#000',
              opacity: 0.7,
            },
            value: {
              fontSize: 28,
              fontWeight: 700,
              color: '#000',
            },
          },
        },
        data: incidentData[1],
      },
      {
        type: 'pie',
        radius: ['35%', '46%'],
        center: ['75%', '35%'],
        emphasis: {
          disabled: true
        },
        label: {
          show: true,
          position: 'center',
          formatter: function (params) {
            return '{value|' + date2 + '}';
          },
          rich: {
            value: {
              fontSize: 24,
              fontWeight: 700,
              padding: [350, 0, 0, 0]
            }
          }
        },
        data: incidentData[1]
      },
    ],
  };

  return {
    width,
    height,
    data,
    boldText,
    headerFontSize,
    headerText,
    chartOptions,
  };
}
