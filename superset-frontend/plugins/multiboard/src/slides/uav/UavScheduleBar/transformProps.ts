import { ChartProps, CategoricalColorNamespace } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { UavScheduleBarState } from './types';
import {getLegendProps} from '../../../utils/series';
import {getChartPadding} from '@superset-ui/plugin-chart-echarts';
import {convertInteger} from '../../../utils/convertInteger';
import {MONTH_NAMES, MONTH_NAMES_SHORT} from '../../../constants';

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
    {top: 64, bottom: 90, left: 20, right: 0}
  );

  function getUavScheduleChartSeries(
    name: string,
    data: number[],
    colorFn: (category: string) => string,
  ) {
    return {
      name,
      data,
      type: 'bar',
      barWidth: '6px',
      itemStyle: {
        color: colorFn(name),
      }
    };
  }

  const series: any[] = [];
  const months = [...MONTH_NAMES, 'Всього'];
  const categories = [...MONTH_NAMES_SHORT, 'Всього'];

  const uavs = data.reduce((acc: any[], { name, amount, month }) => {
    const item = acc.find(i => i.name === name);
    if (item) {
      item.amount[months.indexOf(String(month))] = amount;
    } else {
      const amountsArray = new Array(13).fill(0);
      amountsArray[months.indexOf(String(month))] = amount;
      acc.push({ name, amount: amountsArray });
    }
    return acc;
  }, []);

  /*const total = {
    name: "Загальна кількість",
    amount: new Array(13).fill(0)
  };

  uavs.forEach(uav => {
    uav.amount.forEach((amount, index) => {
      total.amount[index] += amount;
    });
  });

  uavs.unshift(total);*/

  uavs.forEach(uav => {
    series.push(getUavScheduleChartSeries(uav.name, uav.amount, colorFn));
  });

  const chartOptions: EChartsCoreOption = {
    grid: {
      containLabel: true,
      ...chartPadding
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
      data: categories,
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
    series: series,
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
