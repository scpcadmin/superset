import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import {
  TotalIncidentsBarProps,
  TotalIncidentsBarState,
  TotalIncidentsBarStylesProps,
} from './types';
import BigMetric from '../../../components/BigMetric/BigMetric';
import Echart from '../../../components/Echart';

function calculateDirection(
  currentYear: number | null,
  previousYear: number | null,
): 'up' | 'down' | 'equal' | undefined {
  if (!currentYear || !previousYear) {
    return undefined;
  }

  if (currentYear === previousYear) {
    return 'equal';
  }

  return previousYear < currentYear ? 'up' : 'down';
}

function generateText(
  direction: 'up' | 'down' | 'equal' | undefined,
  thisYear: number,
  prevYear: number,
): string {
  if (direction === 'equal') {
    return `кількість інцидентів критичного і високого рівня аналогічна ${prevYear} року`;
  }

  let directionText = '';
  switch (direction) {
    case 'up':
      directionText = 'більше';
      break;
    case 'down':
      directionText = 'менше';
      break;
    default:
      directionText = '';
  }

  return direction !== undefined
    ? `${directionText} інцидентів критичного і високого рівня, порівняно з ${prevYear}`
    : `відношення кількості інцидентів критичного і високого рівня ${thisYear} та ${prevYear} року`;
}

const Styles = styled.div<TotalIncidentsBarStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  display: flex;

  .metrics {
    display: flex;
    flex-direction: column;
    gap: 35px;
  }
`;

export default function TotalIncidentsBar(props: TotalIncidentsBarProps) {
  const { data, yearThis, yearPrev, height, width, chartOptions } = props;
  const rootElem = createRef<HTMLDivElement>();

  const {
    dateAdded,
    totalPrevYear,
    totalCriticalPrevYear,
    totalCriticalThisYear,
  } = data as unknown as TotalIncidentsBarState;

  const direction = calculateDirection(
    totalCriticalThisYear,
    totalCriticalPrevYear,
  );

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <Echart
        height={height}
        width={width - width / 2}
        echartOptions={chartOptions}
      />
      <div className="metrics">
        <BigMetric
          value={totalPrevYear}
          text={`Інцидентів у ${yearPrev}`}
          type="small"
        />
        <BigMetric
          value={
            totalCriticalThisYear &&
            totalCriticalPrevYear &&
            (direction === 'up' || direction === 'down')
              ? `${Math.abs(
                  ((totalCriticalThisYear - totalCriticalPrevYear) /
                    totalCriticalPrevYear) *
                    100,
                ).toFixed(0)}%`
              : null
          }
          text={generateText(direction, yearThis, yearPrev)}
          prefix="на&nbsp;"
          type="small"
        />
      </div>
    </Styles>
  );
}
