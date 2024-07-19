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

  const dates: string[] = [];
  const criticals: number[] = [];
  const hights: number[] = [];
  let attacksAmount = 0;

  const data: TimelineState[] = queriesData[0].data.map(
    (item, index, array) => {
      const { criticalLevelAttacks, highLevelAttacks, dateAdded } = item;

      dates.push(formatDate(dateAdded));
      criticals.push(criticalLevelAttacks);
      hights.push(highLevelAttacks);
      attacksAmount += criticalLevelAttacks + highLevelAttacks;

      const currentHasAttacks =
        criticalLevelAttacks > 0 || highLevelAttacks > 0;

      const previousHasAttacks =
        index > 0 &&
        (array[index - 1].criticalLevelAttacks > 0 ||
          array[index - 1].highLevelAttacks > 0);

      const nextHasAttacks =
        index < array.length - 1 &&
        (array[index + 1].criticalLevelAttacks > 0 ||
          array[index + 1].highLevelAttacks > 0);

      const isFilled =
        currentHasAttacks || previousHasAttacks || nextHasAttacks;

      return {
        dateAdded,
        criticalLevelAttacks,
        highLevelAttacks,
        isFilled,
      };
    },
  );

  const chartPadding = getChartPadding(
    showLegend,
    legendOrientation,
    legendMargin,
    {top: 90, bottom: 20, left: 20, right: 7}
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
      data: dates,
      boundaryGap: false,
      splitLine: {
        show: true,
        interval(index, value) {
          if (index === 0 || index === dates.length - 1) {
            return true;
          }
          return isFirstOfMonth(index, value);
        },
      },
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        formatter(value, index) {
          const [y, m, day] = value.split('.').map(Number);
          const date = new Date(y, m - 1, day);
          const month = MONTH_NAMES[date.getMonth()];

          const val = data[index];
          let str = '';
          if (!val.isFilled) {
            str += `{emptyDay|${day}}`;
          } else {
            str += `{filledDay|${day}}`;
          }
          if (index === 0) {
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
            padding: [convertInteger(xLabelMargin) - 7, 70, 0, 0],
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
      ...getTimelineChartSeries('Критичний рівень', criticals, colorFn),
      ...getTimelineChartSeries('Високий рівень', hights, colorFn),
    ],
  };

  return {
    width,
    height,
    chartOptions,
    metricsCustomizeProps,
    attacksAmount,
  };
}
