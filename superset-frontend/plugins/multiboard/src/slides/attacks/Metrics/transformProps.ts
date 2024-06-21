import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';
import { MetricsCustomizeProps } from './types';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const data = queriesData[0].data as TimeseriesDataRecord[];
  const customizeProps = formData as MetricsCustomizeProps;

  return {
    width,
    height,
    data,
    customizeProps,
  };
}
