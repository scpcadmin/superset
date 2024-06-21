import {QueryFormData} from '@superset-ui/core';
import {MetricsCustomizeProps} from '../Metrics/types';

export type TotalIncidentsBarState = {
  dateAdded: number;
  totalPrevYear: number;
  totalCriticalPrevYear: number;
  totalCriticalThisYear: number;
};

export interface TotalIncidentsBarStylesProps {
  height: number;
  width: number;
}

export type TotalIncidentsBarCustomizeProps = MetricsCustomizeProps & {};

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
