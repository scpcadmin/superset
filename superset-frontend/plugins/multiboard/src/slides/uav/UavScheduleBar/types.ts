import { QueryFormData, supersetTheme } from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { MetricsCustomizeProps } from '../../attacks/Metrics/types';

export type UavScheduleBarState = {
  dateAdded: number;
  amount: number;
  totalCriticalPrevYear: number;
  month: number;
};

export interface UavScheduleBarStylesProps {
  height: number;
  width: number;
}

interface UavScheduleBarCustomizeProps {
  headerText: string;
  headerFontSize: number;
  chartOptions: EChartsCoreOption;
};

export type UavScheduleBarQueryFormData = QueryFormData &
  UavScheduleBarStylesProps &
  UavScheduleBarCustomizeProps;

export type UavScheduleBarProps = UavScheduleBarStylesProps &
  UavScheduleBarCustomizeProps & {
    data: any;
    thisYear: number;
    // add typing here for the props you pass in from transformProps.ts!
  };
