import {
  QueryFormData,
  supersetTheme,
  TimeseriesDataRecord,
} from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';

export interface TimelineStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

export interface TimelineState {
  dateAdded: number;
  criticalLevelAttacks: number;
  highLevelAttacks: number;
}

interface TimelineCustomizeProps {
  headerText: string;
  chartOptions: EChartsCoreOption;
}

export type TimelineQueryFormData = QueryFormData &
  TimelineStylesProps &
  TimelineCustomizeProps;

export type TimelineProps = TimelineStylesProps &
  TimelineCustomizeProps & {
    data: TimeseriesDataRecord[];
    // add typing here for the props you pass in from transformProps.ts!
  };
