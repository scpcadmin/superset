import {QueryFormData, supersetTheme,} from '@superset-ui/core';
import {EChartsCoreOption} from 'echarts';

export type TotalIncidentsBarState = {
  dateAdded: number;
  totalPrevYear: number;
  totalCriticalPrevYear: number;
  totalCriticalThisYear: number;
};

export interface TotalIncidentsBarStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

interface TotalIncidentsBarCustomizeProps {
  headerText: string;
  chartOptions: EChartsCoreOption;
}

export type TotalIncidentsBarQueryFormData = QueryFormData &
  TotalIncidentsBarStylesProps &
  TotalIncidentsBarCustomizeProps;

export type TotalIncidentsBarProps = TotalIncidentsBarStylesProps &
  TotalIncidentsBarCustomizeProps & {
  data: any;
  yearThis: number;
  yearPrev: number;
  // add typing here for the props you pass in from transformProps.ts!
};
