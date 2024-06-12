import {QueryFormData, supersetTheme, TimeseriesDataRecord} from '@superset-ui/core';


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
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

interface MetricsCustomizeProps {
  headerText: string;
}

export type MetricsQueryFormData = QueryFormData &
  MetricsStylesProps &
  MetricsCustomizeProps;

export type MetricsProps = MetricsStylesProps &
  MetricsCustomizeProps & {
  data: TimeseriesDataRecord[];
  // add typing here for the props you pass in from transformProps.ts!
};
