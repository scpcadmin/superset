import { QueryFormData, supersetTheme } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { MetricsCustomizeProps } from '../../attacks/Metrics/types';

export type UavSupplyBarState = {
  name: string;
  totalContracted: number;
  totalGaveAway: number;
  latestGaveAway: number;
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
    totalRecord: UavSupplyBarState;
    metricsCustomizeProps: MetricsCustomizeProps;
    // add typing here for the props you pass in from transformProps.ts!
  };
