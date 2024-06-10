export interface BigMetricStylesProps {
}

export interface BigMetricProps {
  value: number | string | null;
  title?: string;
  text?: string;
  prefix?: string;
  type: 'small' | 'big';
}
