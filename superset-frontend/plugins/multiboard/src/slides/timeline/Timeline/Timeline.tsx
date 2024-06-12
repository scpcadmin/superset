import React, {createRef} from 'react';
import {styled} from '@superset-ui/core';
import {TimelineProps, TimelineStylesProps} from './types';
import Echart from '../../../components/Echart';
import BigMetric from '../../../components/BigMetric/BigMetric';

const Styles = styled.div<TimelineStylesProps>`
  position: relative;

  .absolute-metric {
    position: absolute;
    inset: 0;
  }
`;

export default function Timeline(props: TimelineProps) {
  const {data, height, width, chartOptions} = props;

  const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <div className="absolute-metric">
        <BigMetric value={52} text="Інциденти" type="small"/>
      </div>
      <Echart height={height} width={width} echartOptions={chartOptions}/>
    </Styles>
  );
}
