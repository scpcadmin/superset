import {CategoricalColorNamespace, ChartProps} from '@superset-ui/core';
import {EChartsCoreOption} from 'echarts';
import {getChartPadding} from '@superset-ui/plugin-chart-echarts';
import {UavSupplyBarState} from './types';
import {TimelineCustomizeProps} from '../../timeline/Timeline/types';
import {getLegendProps} from '../../../utils/series';
import {convertInteger} from '../../../utils/convertInteger';

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

  const metricsCustomizeProps = formData as TimelineCustomizeProps;
  const data = queriesData[0].data['0'] as UavSupplyBarState;
  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);

  let categories = [
    'Квадрокоптер розвідувальний',
    'Квадрокоптер ударний',
    'Загалом FPV',
    'Літак розвідувальний',
    'Літак ударний',
    'ЗАГАЛОМ',
  ];
  categories = categories.map(category => category.split(' ').join('\n'));

  const dataZa103 = [10000, 0, 0, 30000, 0, 20000];
  const dataPeredano = [5000, 69000, 65000, 0, 47060, 0];
  const dataZakontaktovano = [100000, 100000, 100000, 100000, 100000, 100000];

  const dataMain = dataZakontaktovano.map(function (value, index) {
    return value - (dataZa103[index] + dataPeredano[index]);
  });

  const chartPadding = getChartPadding(
    showLegend,
    legendOrientation,
    legendMargin,
    showValue
  );

  function getUavSupplyChartSeries(
    name: string,
    data: any,
    labelData: any,
    colorFn: (category: string) => string,
  ) {
    return {
      name,
      type: 'bar',
      stack: 'total',
      label: {
        show: showValue,
        position: 'insideTop',
        formatter(params) {
          if (labelData) {
            return labelData[params.dataIndex];
          }
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
    };
  }

  const chartOptions: EChartsCoreOption = {
    grid: {
      containLabel: true,
      bottom: 90,
      left: 20,
      right: 0,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter(params) {
        const total = dataZakontaktovano[params[0].dataIndex];
        let tooltipText = `${params[0].axisValue}<br/>`;

        params.forEach(function (item, index) {
          if (item.value !== 0) {
            const value = index === params.length - 1 ? total : item.value;
            tooltipText += `${item.marker + item.seriesName}: ${value}<br/>`;
          }
        });

        return tooltipText;
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
      getUavSupplyChartSeries('Передано', dataPeredano, null, colorFn, showValue),
      getUavSupplyChartSeries('за 1.03', dataZa103, null, colorFn, showValue),
      getUavSupplyChartSeries('Законтрактовано', dataMain, dataZakontaktovano, colorFn, showValue),
    ],
  };

  return {
    width,
    height,
    chartOptions,
    metricsCustomizeProps,
  };
}
