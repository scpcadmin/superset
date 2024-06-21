import { QueryFormData, supersetTheme } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { MetricsCustomizeProps } from '../../attacks/Metrics/types';

export type UavSupplyBarState = {
  dateAdded: number;
  totalPrevYear: number;
  totalCriticalPrevYear: number;
  totalCriticalThisYear: number;
};

export interface UavSupplyBarStylesProps {
  height: number;
  width: number;
}

export type UavSupplyBarCustomizeProps = MetricsCustomizeProps & {
  chartOptions: EChartsCoreOption;
};

export type UavSupplyBarQueryFormData = QueryFormData &
  UavSupplyBarStylesProps &
  UavSupplyBarCustomizeProps;

export type UavSupplyBarProps = UavSupplyBarStylesProps &
  UavSupplyBarCustomizeProps & {
    data: any;
    yearThis: number;
    yearPrev: number;
    metricsCustomizeProps: MetricsCustomizeProps;
    // add typing here for the props you pass in from transformProps.ts!
  };
