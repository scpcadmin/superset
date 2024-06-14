import {QueryFormData, supersetTheme,} from '@superset-ui/core';
import {EChartsCoreOption} from 'echarts';

export type UavScheduleBarState = {
  dateAdded: number;
  amount: number;
  totalCriticalPrevYear: number;
  month: number;
};

export interface UavScheduleBarStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

interface UavScheduleBarCustomizeProps {
  headerText: string;
  chartOptions: EChartsCoreOption;
}

export type UavScheduleBarQueryFormData = QueryFormData &
  UavScheduleBarStylesProps &
  UavScheduleBarCustomizeProps;

export type UavScheduleBarProps = UavScheduleBarStylesProps &
  UavScheduleBarCustomizeProps & {
  data: any;
  year: number;
  // add typing here for the props you pass in from transformProps.ts!
};
