import { CategoricalColorNamespace, ChartProps } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import {
  TotalIncidentsBarCustomizeProps,
  TotalIncidentsBarState,
} from './types';
import {convertInteger} from '../../../utils/convertInteger';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const {
    colorScheme,
    xLabelFontSize,
    xLabelMargin,
    xLabelColor,
    yLabelFontSize,
    yLabelMargin,
    yLabelColor,
  } = formData;
  const customizeProps = formData as TotalIncidentsBarCustomizeProps;

  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);

  const data = queriesData[0].data['0'] as TotalIncidentsBarState;
  const testData = {
    ...data,
    year: new Date(data.dateAdded),
  };

  const date = new Date(testData.dateAdded);
  const yearThis = date.getUTCFullYear();
  const yearPrev = yearThis - 1;

  const barData = [
    {
      value: testData.totalCriticalPrevYear,
      name: yearPrev.toString(),
      itemStyle: { color: colorFn(yearPrev.toString()) },
    },
    {
      value: testData.totalCriticalThisYear,
      name: yearThis.toString(),
      itemStyle: { color: colorFn(yearThis.toString()) },
    },
  ];

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
        color: `rgba(${xLabelColor.r}, ${xLabelColor.g}, ${xLabelColor.b}, ${xLabelColor.a})`,
        fontWeight: 'bold',
        fontSize: xLabelFontSize,
        padding: [convertInteger(xLabelMargin), 0, 0, 0],
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: `rgba(${yLabelColor.r}, ${yLabelColor.g}, ${yLabelColor.b}, ${yLabelColor.a})`,
        fontWeight: 'bold',
        fontSize: yLabelFontSize,
        padding: [0, convertInteger(yLabelMargin), 0, 0],
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
    customizeProps,
    chartOptions,
  };
}
