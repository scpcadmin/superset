import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import { UavScheduleBarProps, UavScheduleBarStylesProps } from './types';
import Echart from '../../../components/Echart';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';

const Styles = styled.div<UavScheduleBarStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  display: flex;
  flex-direction: column;
`;

export default function UavScheduleBar(props: UavScheduleBarProps) {
  const { data, height, width, chartOptions, year } = props;
  const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <ChartHeader title={`Графік видачі законтрактованх БпЛА ${year && `на ${year}`}`} />
      <Echart height={height - 62} width={width} echartOptions={chartOptions} />
    </Styles>
  );
}
