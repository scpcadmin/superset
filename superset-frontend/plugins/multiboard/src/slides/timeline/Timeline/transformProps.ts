import { ChartProps, CategoricalColorNamespace } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { getChartPadding } from '@superset-ui/plugin-chart-echarts';
import { TimelineCustomizeProps, TimelineState } from './types';
import { LABEL_COLOR, MONTH_NAMES } from '../../../constants';
import { formatDate } from '../../../utils/formatters';
import { getLegendProps } from '../../../utils/series';
import { convertInteger } from '../../../utils/convertInteger';

function isFirstOfMonth(index: number, dateString: string) {
  return new Date(dateString).getDate() === 1;
}

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const {
    colorScheme,
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
  const metricsCustomizeProps = formData as TimelineCustomizeProps;

  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);

  const data = queriesData[0].data as TimelineState[];

  const dateAdded: string[] = [];
  const criticalLevelAttacks: number[] = [];
  const highLevelAttacks: number[] = [];

  data.forEach(item => {
    dateAdded.push(formatDate(item.dateAdded));
    criticalLevelAttacks.push(item.criticalLevelAttacks);
    highLevelAttacks.push(item.highLevelAttacks);
  });

  const chartPadding = getChartPadding(
    showLegend,
    legendOrientation,
    legendMargin,
  );

  function getTimelineChartSeries(
    name: string,
    data: any,
    colorFn: (category: string) => string,
  ) {
    return [
      {
        name,
        type: 'line',
        data,
        itemStyle: {
          color: colorFn(name),
        },
        symbol(value, params) {
          return value !== 0 ? 'circle' : 'none';
        },
      },
    ];
  }

  const chartOptions: EChartsCoreOption = {
    grid: {
      ...chartPadding,
      left: '15px',
      right: '5px',
      bottom: '5%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      ...getLegendProps(showLegend, legendType, legendOrientation),
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
          const month = MONTH_NAMES[date.getMonth()];

          const data = chartOptions.series[0].data;
          const val = data[index];
          const prev = data[index - 1];
          const next = data[index + 1];
          let str = '';
          if (
            val === 0 &&
            (prev === undefined || prev === 0) &&
            (next === undefined || next === 0)
          ) {
            str += `{emptyDay|${day}}`;
          } else {
            str += `{filledDay|${day}}`;
          }
          if (prev === undefined) {
            str += `\n{monthRight|${month}}`;
          } else if (day === 1) {
            str += `\n{monthLeft|${month}}`;
          }
          return str;
        },
        rich: {
          emptyDay: {
            color: LABEL_COLOR,
            padding: [convertInteger(xLabelMargin), 0, 0, 0],
            fontSize: xLabelFontSize,
            opacity: 0.5,
          },
          filledDay: {
            color: `rgba(${xLabelColor.r}, ${xLabelColor.g}, ${xLabelColor.b}, ${xLabelColor.a})`,
            padding: [convertInteger(xLabelMargin), 0, 0, 0],
            fontSize: xLabelFontSize,
          },
          monthRight: {
            color: LABEL_COLOR,
            padding: [convertInteger(xLabelMargin) - 7, 0, 0, 70],
            fontSize: xLabelFontSize * 1.6,
            fontFamily: 'eUkraine-Medium',
          },
          monthLeft: {
            color: LABEL_COLOR,
            fontSize: xLabelFontSize * 1.6,
            fontFamily: 'eUkraine-Medium',
            padding: [convertInteger(xLabelMargin) - 7, 60, 0, 0],
          },
        },
      },
    },
    yAxis: {
      axisLabel: {
        color: `rgba(${yLabelColor.r}, ${yLabelColor.g}, ${yLabelColor.b}, ${yLabelColor.a})`,
        fontWeight: 'bold',
        fontSize: yLabelFontSize,
        padding: [0, convertInteger(yLabelMargin), 0, 0],
      },
    },
    series: [
      ...getTimelineChartSeries(
        'Критичний рівень',
        criticalLevelAttacks,
        colorFn,
      ),
      ...getTimelineChartSeries('Високий рівень', highLevelAttacks, colorFn),
    ],
  };

  return {
    width,
    height,
    chartOptions,
    metricsCustomizeProps,
  };
}
