import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import { MetricsProps, MetricsState, MetricsStylesProps } from './types';
import BigMetric from '../../../components/BigMetric/BigMetric';

const Styles = styled.div<MetricsStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  display: flex;
  flex-direction: column;
  gap: 29px;
  justify-content: space-between;

  .metrics-list {
    display: flex;
    justify-content: space-between;
    gap: 24px;
  }
`;

export default function Metrics(props: MetricsProps) {
  const { data, height, width, customizeProps } = props;

  const rootElem = createRef<HTMLDivElement>();

  const {
    dateAdded,
    criticalPrevDay,
    totalPrevDay,
    totalCurYear,
    objectsAmount,
  } = data[0] as unknown as MetricsState;

  const year = new Date(dateAdded).getFullYear();

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <BigMetric
        value={objectsAmount}
        title="Об`єктів кіберзахисту"
        type="big"
        customizeProps={customizeProps}
      />
      <div className="metrics-list">
        <BigMetric
          value={totalCurYear}
          text={`Інцидентів з початку ${year} року`}
          type="small"
          customizeProps={customizeProps}
        />
        <BigMetric
          value={totalPrevDay}
          text="Інцидентів за минулу добу"
          type="small"
          customizeProps={customizeProps}
        />
        <BigMetric
          value={criticalPrevDay}
          text="З них критичних"
          type="small"
          customizeProps={customizeProps}
        />
      </div>
    </Styles>
  );
}
