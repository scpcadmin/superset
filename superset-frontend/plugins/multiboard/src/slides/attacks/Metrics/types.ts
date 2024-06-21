import {QueryFormData, TimeseriesDataRecord,} from '@superset-ui/core';

export type MetricsState = {
  dateAdded: number;
  objectsAmount: number;
  totalPrevDay: number;
  criticalPrevDay: number;
  totalCurYear: number;
};

export interface MetricsStylesProps {
  height: number;
  width: number;
}

export interface MetricsCustomizeProps {
  titleFontSize: number;
  bigValueFontSize: number;
  smallValueFontSize: number;
  textFontSize: number;
}

export type MetricsQueryFormData = QueryFormData &
  MetricsStylesProps &
  MetricsCustomizeProps;

export type MetricsProps = MetricsStylesProps &
  MetricsCustomizeProps & {
  data: TimeseriesDataRecord[];
  customizeProps: MetricsCustomizeProps;
  // add typing here for the props you pass in from transformProps.ts!
};
