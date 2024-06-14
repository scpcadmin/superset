import React, {createRef} from 'react';
import {styled} from '@superset-ui/core';
import {UavSupplyBarProps, UavSupplyBarStylesProps,} from './types';
import BigMetric from '../../../components/BigMetric/BigMetric';
import Echart from '../../../components/Echart';

const Styles = styled.div<UavSupplyBarStylesProps>`
  height: ${({height}) => height}px;
  width: ${({width}) => width}px;
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
  const {data, height, width, chartOptions} = props;
  const rootElem = createRef<HTMLDivElement>();


  return (
    <Styles ref={rootElem} height={height} width={width}>
      <div className="metrics">
        <BigMetric
          value={60000}
          text={`Всього передано`}
          type="small"
        />
        <BigMetric
          value={60000}
          text={`Всього законтрактовано`}
          type="small"
        />
      </div>
      <Echart
        height={height - 62}
        width={width}
        echartOptions={chartOptions}
      />
    </Styles>
  );
}
