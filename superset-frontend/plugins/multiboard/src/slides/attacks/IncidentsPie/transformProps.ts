import {CategoricalColorNamespace, ChartProps, getTimeFormatter, getValueFormatter} from '@superset-ui/core';
import {EChartsCoreOption} from 'echarts';
import {formatPieLabel, getChartPadding,} from '@superset-ui/plugin-chart-echarts';
import {CallbackDataParams} from 'echarts/types/src/util/types';
import {AttackState, PieDataItem} from './types';
import {getLegendProps} from '../../../utils/series';

const convertData = (
  data: AttackState[],
  colorFn: (category: string) => string,
): PieDataItem[][] => {
  const categories = [
    {name: 'Критичний рівень', key: 'critical'},
    {name: 'Високий рівень', key: 'high'},
    {name: 'Середній рівень', key: 'medium'},
    {name: 'Низький рівень', key: 'low'},
  ];

  return data.map(item =>
    categories.map(category => ({
      value: item[category.key],
      name: category.name,
      itemStyle: {color: colorFn(category.name)},
    })),
  );
};

export default function transformProps(chartProps: ChartProps) {
  const {width, height, formData, queriesData} = chartProps;
  const {
    headerText,
    colorScheme,
    showLegend,
    legendMargin,
    legendOrientation,
    legendType,
    labelType,
    dateLabelFormat,
    showLabels,
    labelLine,
    showTotal,
    showDate,
    innerRadius,
    donut,
    outerRadius,
  } = formData;

  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);

  const thisYear = new Date(queriesData[0].to_dttm).getFullYear();

  const data = queriesData[0].data as AttackState[];
  const incidentData = convertData(data, colorFn);
  // @ts-ignore
  const numberFormatter = getValueFormatter();
  const timeFormatter = getTimeFormatter(dateLabelFormat);
  const radius = [`${donut ? innerRadius : 0}%`, `${outerRadius}%`];

  const chartPadding = getChartPadding(
    showLegend,
    legendOrientation,
    legendMargin,
  );

  const labelFormatter = (params: CallbackDataParams) =>
    formatPieLabel({
      params,
      numberFormatter,
      labelType,
    });

  function getPieChartSeries(
    timestamp: number,
    data: any,
    radius: any,
    center: any,
  ) {
    const date = timeFormatter(timestamp);
    const total = data.reduce(
      (acc: any, curr: { value: any }) => acc + curr.value,
      0,
    );

    return [
      {
        name: `Інциденти за ${date}`,
        type: 'pie',
        ...chartPadding,
        radius,
        center,
        avoidLabelOverlap: true,
        label: {
          show: showLabels,
          position: 'outside',
          formatter(params: any) {
            return `{${params.dataIndex}|${labelFormatter(params)}}`;
          },
          rich: {
            0: {
              fontSize: 12,
              lineHeight: 15,
              color: data[0].itemStyle.color,
              fontWeight: 700,
            },
            1: {
              fontSize: 12,
              lineHeight: 15,
              color: data[1].itemStyle.color,
              fontWeight: 700,
            },
            2: {
              fontSize: 12,
              lineHeight: 15,
              color: data[2].itemStyle.color,
              fontWeight: 700,
            },
            3: {
              fontSize: 12,
              lineHeight: 15,
              color: data[3].itemStyle.color,
              fontWeight: 700,
            },
          },
        },
        labelLine: labelLine ? {show: true} : {show: false},
        data,
      },
      showTotal && {
        type: 'pie',
        ...chartPadding,
        radius,
        center,
        emphasis: {
          disabled: true,
        },
        label: {
          show: true,
          position: 'center',
          formatter() {
            return `{total|всього}\n{value|${total}}`;
          },
          rich: {
            total: {
              fontSize: 12,
              fontWeight: 400,
              opacity: 0.7,
            },
            value: {
              fontSize: 28,
              fontWeight: 700,
            },
          },
        },
        data,
      },
      showDate && {
        type: 'pie',
        ...chartPadding,
        radius,
        center,
        emphasis: {
          disabled: true,
        },
        label: {
          show: true,
          position: 'center',
          formatter() {
            return `{value|${date}}`;
          },
          rich: {
            value: {
              fontSize: 24,
              fontWeight: 700,
              padding: [height - 80, 0, 0, 0],
            },
          },
        },
        data,
      },
    ];
  }

  const chartOptions: EChartsCoreOption = {
    grid: {
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      ...getLegendProps(showLegend, legendType, legendOrientation),
    },
    series: [
      ...getPieChartSeries(data[0].date_added, incidentData[0], radius, [
        '25%',
        '35%',
      ]),
      ...getPieChartSeries(data[1].date_added, incidentData[1], radius, [
        '75%',
        '35%',
      ]),
    ],
  };

  return {
    headerText,
    width,
    height,
    data,
    chartOptions,
    thisYear,
  };
}
