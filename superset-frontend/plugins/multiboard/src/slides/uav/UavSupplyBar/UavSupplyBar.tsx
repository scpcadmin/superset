import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import { Echart } from '@superset-ui/plugin-chart-echarts';
import { UavSupplyBarProps, UavSupplyBarStylesProps } from './types';
import BigMetric from '../../../components/BigMetric/BigMetric';

const Styles = styled.div<UavSupplyBarStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  display: flex;
  flex-direction: column;

  .metrics {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 24px;
  }
`;

export default function UavSupplyBar(props: UavSupplyBarProps) {
  const { data, height, width, chartOptions, metricsCustomizeProps, totalRecord } = props;
  const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <div className="metrics">
        <BigMetric
          value={totalRecord.totalGaveAway}
          text="Всього передано"
          type="small"
          customizeProps={metricsCustomizeProps}
        />
        <BigMetric
          value={totalRecord.totalContracted}
          text="Всього законтрактовано"
          type="small"
          customizeProps={metricsCustomizeProps}
        />
      </div>
      <Echart height={height - 62} width={width} echartOptions={chartOptions} />
    </Styles>
  );
}
