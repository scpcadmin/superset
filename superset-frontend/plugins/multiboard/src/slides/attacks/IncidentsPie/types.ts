import {
  QueryFormData,
  supersetTheme,
  TimeseriesDataRecord,
} from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';

export interface IncidentsPieStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

export interface AttackState {
  critical: number;
  high: number;
  medium: number;
  low: number;
  year: number;
  date_added: number;
}

export type PieDataItem = {
  value: number;
  name: string;
  itemStyle: {
    color: string;
  };
};

interface IncidentsPieCustomizeProps {
  headerText: string;
  chartOptions: EChartsCoreOption;
}

export type IncidentsPieQueryFormData = QueryFormData &
  IncidentsPieStylesProps &
  IncidentsPieCustomizeProps;

export type IncidentsPieProps = IncidentsPieStylesProps &
  IncidentsPieCustomizeProps & {
    data: TimeseriesDataRecord[];
    thisYear: number;
    diff: number;
    // add typing here for the props you pass in from transformProps.ts!
  };
