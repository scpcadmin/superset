import { MetricsCustomizeProps } from '../../slides/attacks/Metrics/types';

export interface BigMetricState {
  value: number | string | null;
  title?: string;
  text?: string;
  prefix?: string;
  type: 'small' | 'big';
  customizeProps: MetricsCustomizeProps;
}

export type BigMetricStylesProps = MetricsCustomizeProps;

export type BigMetricProps = BigMetricState;
