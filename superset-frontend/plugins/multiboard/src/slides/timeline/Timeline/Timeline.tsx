import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import { Echart } from '@superset-ui/plugin-chart-echarts';
import { TimelineProps, TimelineStylesProps } from './types';
import BigMetric from '../../../components/BigMetric/BigMetric';

const Styles = styled.div<TimelineStylesProps>`
  position: relative;

  .absolute-metric {
    position: absolute;
    inset: 0;
  }
`;

export default function Timeline(props: TimelineProps) {
  const { data, height, width, chartOptions, metricsCustomizeProps, attacksAmount } = props;

  const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <div className="absolute-metric">
        <BigMetric
          value={attacksAmount}
          text="Інциденти"
          type="small"
          customizeProps={metricsCustomizeProps}
        />
      </div>
      <Echart height={height} width={width} echartOptions={chartOptions} />
    </Styles>
  );
}
