import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const { headerText, headerFontSize, subheaderText, subheaderFontSize } = formData;
  const data = queriesData[0].data as TimeseriesDataRecord[];

  return {
    width,
    height,
    data,
    headerText,
    headerFontSize,
    subheaderText,
    subheaderFontSize,
  };
}
