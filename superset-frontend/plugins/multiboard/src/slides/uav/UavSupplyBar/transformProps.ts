import {CategoricalColorNamespace, ChartProps} from '@superset-ui/core';
import {EChartsCoreOption} from 'echarts';
import {getChartPadding} from '@superset-ui/plugin-chart-echarts';
import {UavSupplyBarState} from './types';
import {getLegendProps} from '../../../utils/series';
import {convertInteger} from '../../../utils/convertInteger';
import { formatDateShort, getPrevDayDate } from '../../../utils/formatters';

const TOTAL_RECORD_NAME = 'ЗАГАЛОМ';

export default function transformProps(chartProps: ChartProps) {
  const {width, height, formData, queriesData} = chartProps;
  const {
    colorScheme,
    showValue,
    valueFontSize,
    valueMargin,
    valueColor,
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

  const metricsCustomizeProps = formData as UavSupplyBarCustomizeProps;
  const latestDate = formatDateShort(getPrevDayDate(queriesData[0].to_dttm));
  const data = queriesData[0].data as UavSupplyBarState[];

  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);

  const categories: string[] = [];
  const totalContracted: number[] = [];
  const totalGaveAway: number[] = [];
  const latestGaveAway: number[] = [];
  let totalRecord: UavSupplyBarState | null = null;
  let isLatestVisible = false;

  data.map(item => {

    // not include total record in chart
    if(item.name === TOTAL_RECORD_NAME) {
      totalRecord = item;
      return;
    };

    totalContracted.push(item.totalContracted);
    totalGaveAway.push(item.totalGaveAway);
    latestGaveAway.push(item.latestGaveAway);
    if(item.latestGaveAway !== 0) isLatestVisible = true;

    categories.push(item.name.split(' ').join('\n'));
  });

  function getUavSupplyChartSeries(
    name: string,
    data: any,
    colorFn: (category: string) => string,
    showValue: boolean,
    zIndex: number = 1,
    isStacked: boolean,
  ) {
    return {
      name,
      type: 'bar',
      stack: isStacked,
      label: {
        show: showValue,
        position: 'insideTop',
        formatter(params) {
          return params.value !== 0 ? params.value : '';
        },
        color: `rgba(${valueColor.r}, ${valueColor.g}, ${valueColor.b}, ${valueColor.a})`,
        fontWeight: 'bold',
        fontSize: valueFontSize,
        padding: [convertInteger(valueMargin), 0, 0, 0],
      },
      data,
      itemStyle: {
        color: colorFn(name),
      },
      z: zIndex,
      barGap: '-100%'
    };
  }

  const chartPadding = getChartPadding(
    showLegend,
    legendOrientation,
    legendMargin,
    {top: 64, bottom: 90, left: 20, right: 0}
  );

  const chartOptions: EChartsCoreOption = {
    grid: {
      containLabel: true,
      ...chartPadding,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      ...getLegendProps(showLegend, legendType, legendOrientation),
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
    series: [
      getUavSupplyChartSeries('Законтрактовано', totalContracted, colorFn, showValue, 1, false),
      getUavSupplyChartSeries('Передано', totalGaveAway, colorFn, showValue, 2, false),
      isLatestVisible ? getUavSupplyChartSeries(`за ${latestDate}`, latestGaveAway, colorFn, showValue, 3, false) : null,
    ],
  };

  return {
    width,
    height,
    chartOptions,
    metricsCustomizeProps,
    totalRecord,
  };
}
