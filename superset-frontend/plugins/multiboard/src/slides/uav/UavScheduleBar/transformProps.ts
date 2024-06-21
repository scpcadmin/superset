import { ChartProps, CategoricalColorNamespace } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { UavScheduleBarState } from './types';
import {getLegendProps} from '../../../utils/series';
import {getChartPadding} from '@superset-ui/plugin-chart-echarts';
import {convertInteger} from '../../../utils/convertInteger';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const {
    colorScheme,
    headerText,
    headerFontSize,
    showLegend,
    legendMargin,
    legendOrientation,
    legendType,
    xLabelFontSize,
    xLabelMargin,
    xLabelColor,
    yLabelFontSize,
    yLabelMargin,
    yLabelColor,
  } = formData;

  const data = queriesData[0].data as UavScheduleBarState[];
  const thisYear = new Date(queriesData[0].to_dttm).getFullYear();
  const prevYear = thisYear - 1;
  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);

  const chartPadding = getChartPadding(
    showLegend,
    legendOrientation,
    legendMargin,
  );

  const chartOptions: EChartsCoreOption = {
    grid: {
      containLabel: true,
      bottom: 90,
      left: 20,
      right: 0,
    },
    legend: {
      ...getLegendProps(showLegend, legendType, legendOrientation),
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
        color: `rgba(${xLabelColor.r}, ${xLabelColor.g}, ${xLabelColor.b}, ${xLabelColor.a})`,
        fontWeight: 'bold',
        fontSize: xLabelFontSize,
        padding: [convertInteger(xLabelMargin), 0, 0, 0],
        interval: 0,
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
        name: 'Загальна кількість',
        data: data.map(item => item.amount),
        type: 'bar',
        barWidth: '6px',
        itemStyle: {
          color: colorFn('Загальна кількість'),
        }
      },
    ],
  };

  return {
    width,
    height,
    headerFontSize,
    headerText,
    chartOptions,
    thisYear,
    prevYear,
  };
}
