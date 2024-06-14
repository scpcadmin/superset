import {QueryFormData, supersetTheme,} from '@superset-ui/core';
import {EChartsCoreOption} from 'echarts';

export type UavSupplyBarState = {
  dateAdded: number;
  totalPrevYear: number;
  totalCriticalPrevYear: number;
  totalCriticalThisYear: number;
};

export interface UavSupplyBarStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

interface UavSupplyBarCustomizeProps {
  headerText: string;
  chartOptions: EChartsCoreOption;
}

export type UavSupplyBarQueryFormData = QueryFormData &
  UavSupplyBarStylesProps &
  UavSupplyBarCustomizeProps;

export type UavSupplyBarProps = UavSupplyBarStylesProps &
  UavSupplyBarCustomizeProps & {
  data: any;
  yearThis: number;
  yearPrev: number;
  // add typing here for the props you pass in from transformProps.ts!
};
