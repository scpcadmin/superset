import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import { Echart } from '@superset-ui/plugin-chart-echarts';
import { UavScheduleBarProps, UavScheduleBarStylesProps } from './types';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';

const Styles = styled.div<UavScheduleBarStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  display: flex;
  flex-direction: column;
`;

export default function UavScheduleBar(props: UavScheduleBarProps) {
  const {
    headerText,
    headerFontSize,
    data,
    height,
    width,
    chartOptions,
    thisYear,
  } = props;
  const rootElem = createRef<HTMLDivElement>();

  const headerTextFormatted = headerText
    .replace('{thisYear}', String(thisYear))
    .replace('{prevYear}', String(thisYear - 1));

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <ChartHeader title={headerTextFormatted} fontSize={headerFontSize} />
      <Echart height={height - 62} width={width} echartOptions={chartOptions} />
    </Styles>
  );
}
