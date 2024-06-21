import {
  QueryFormData,
  supersetTheme,
  TimeseriesDataRecord,
} from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import {MetricsCustomizeProps} from '../../attacks/Metrics/types';

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

export type TimelineCustomizeProps = MetricsCustomizeProps & {
  chartOptions: EChartsCoreOption;
};

export type TimelineQueryFormData = QueryFormData &
  TimelineStylesProps &
  TimelineCustomizeProps;

export type TimelineProps = TimelineStylesProps &
  TimelineCustomizeProps & {
    data: TimeseriesDataRecord[];
    metricsCustomizeProps: MetricsCustomizeProps;
    // add typing here for the props you pass in from transformProps.ts!
  };
