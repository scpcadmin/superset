import React, { RefObject } from 'react';
import { ECharts, EChartsCoreOption } from 'echarts';

export type EchartsStylesProps = {
  height: number;
  width: number;
};

export type Refs = {
  echartRef?: React.Ref<EchartsHandler>;
  divRef?: RefObject<HTMLDivElement>;
};

export interface EchartsProps {
  height: number;
  width: number;
  echartOptions: EChartsCoreOption;
  eventHandlers?: EventHandlers;
  zrEventHandlers?: EventHandlers;
  selectedValues?: Record<number, string>;
  forceClear?: boolean;
  refs: Refs;
}

export interface EchartsHandler {
  getEchartInstance: () => ECharts | undefined;
}

export type EventHandlers = Record<string, { (props: any): void }>;
