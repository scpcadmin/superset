import {ChartProps} from '@superset-ui/core';
import {FilterDateState} from './types';
import {formatDate} from '../../utils/formatters';

export default function transformProps(chartProps: ChartProps) {
  const {width, height, formData, queriesData} = chartProps;
  const data = queriesData[0].data[0] as FilterDateState;

  const dateFrom = formatDate(queriesData[0].from_dttm);
  const dateTo = formatDate(queriesData[0].to_dttm);

  return {
    width,
    height,
    data,
    formData,
    dateFrom,
    dateTo,
  };
}
