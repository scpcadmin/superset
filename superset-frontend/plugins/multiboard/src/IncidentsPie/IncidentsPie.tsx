import React, {createRef} from 'react';
import {styled} from '@superset-ui/core';
import {IncidentsPieProps, IncidentsPieStylesProps} from './types';
import Echart from '../components/Echart';

const Styles = styled.div<IncidentsPieStylesProps>``;

export default function IncidentsPie(props: IncidentsPieProps) {
  const {data, height, width, chartOptions} = props;

  const rootElem = createRef<HTMLDivElement>();

  return (
    <Echart
      height={height}
      width={width}
      echartOptions={chartOptions}
    />
  );
}
