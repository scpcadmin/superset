import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import { MultiboardMetricsProps, MultiboardMetricsStylesProps } from './types';

const Styles = styled.div<MultiboardMetricsStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  .metrics {
    background-color: #12122f;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 16px;
  }
  .metric-card {
    display: flex;
    align-items: flex-start;
    height: fit-content;
    gap: 16px;
  }
  .metric-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    font-family: eUkraineHead;
    text-align: start;
    gap: 8px;
  }
  .metric-content .value {
    font-size: 32px;
    line-height: 1;
  }
  .metric-content p {
    font-size: 14px;
  }
  .metric-content .prefix {
    display: inline-block;
  }
  .status-line {
    width: 2px;
    height: 60px;
    background-color: white;
    position: relative;
  }
  .status-line.arrow::after {
    content: '';
    position: absolute;
    left: -4px;
    transition: border-color 0.3s ease;
  }
  .status-line.arrow-down {
    background-color: #92d050;
  }
  .status-line.arrow-down::after {
    top: calc(100%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid #000;
    border-top-color: #92d050;
  }
  .status-line.arrow-up {
    background-color: #fe0204;
  }
  .status-line.arrow-up::after {
    bottom: calc(100%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #000;
    border-bottom-color: #fe0204;
  }
  .status-line.arrow-up::after {
    border-top-color: #fe0204;
  }
`;

interface MetricCardProps {
  value: number | string | null;
  text: string;
  showArrow?: boolean;
  direction?: 'up' | 'down' | 'equal' | undefined;
  prefix?: string;
}

interface MetricsProps {
  totalincidentsforpreviousday: number | null;
  criticalincidentspreviousday: number | null;
  totalincidentscurrentyear: number | null;
  totalhighandcriticalincidentsfrombegginingoftheyear: number | null;
  totalhighandcriticalincidentsforsameperiodpreviousyear: number | null;
  amountofcyberdefenceobjects: number | null;
  date_added: number;
}

function MetricCard({ value, text, direction, prefix }: MetricCardProps) {
  return (
    <div className="metric-card">
      {direction && (
        <div
          className={`status-line ${
            direction === 'up'
              ? 'arrow arrow-up'
              : direction === 'down'
                ? 'arrow arrow-down'
                : ''
          }`}
        />
      )}
      {!direction && <div className="status-line" />}
      <div className="metric-content">
        {value ? (
          <span className="value">
            <p className="prefix">{prefix}</p>
            {value}
          </span>
        ) : direction === 'equal' ? (
          ''
        ) : (
          <span className="value">Дані відсутні</span>
        )}
        <p>{text}</p>
      </div>
    </div>
  );
}

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
  date_added: number,
): string {
  const currentYear = new Date(date_added).getFullYear();
  if (direction === 'equal') {
    return `кількість атак критичного і високого рівня аналогічна ${
      currentYear - 1
    } року`;
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
    ? `${directionText} атак критичного і високого рівня, ніж у ${
        currentYear - 1
      }`
    : `відношення кількості атак критичного і високого рівня ${currentYear} та ${
        currentYear - 1
      } року`;
}

export default function MultiboardMetrics(props: MultiboardMetricsProps) {
  const { data, height, width } = props;
  const rootElem = createRef<HTMLDivElement>();

  const metrix = data[0] as unknown as MetricsProps;
  const direction = calculateDirection(
    metrix.totalhighandcriticalincidentsfrombegginingoftheyear,
    metrix.totalhighandcriticalincidentsforsameperiodpreviousyear,
  );

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <div className="metrics">
        <MetricCard
          value={metrix.totalincidentsforpreviousday}
          text="кіберінцидентів за добу"
        />
        <MetricCard
          value={metrix.criticalincidentspreviousday}
          text="з них критичних"
        />
        <MetricCard
          value={metrix.totalincidentscurrentyear}
          text={`інцидентів у ${new Date(metrix.date_added).getFullYear()}`}
        />
        <MetricCard
          value={
            metrix.totalhighandcriticalincidentsfrombegginingoftheyear &&
            metrix.totalhighandcriticalincidentsforsameperiodpreviousyear &&
            (direction === 'up' || direction === 'down')
              ? `${Math.abs(
                  ((metrix.totalhighandcriticalincidentsfrombegginingoftheyear -
                    metrix.totalhighandcriticalincidentsforsameperiodpreviousyear) /
                    metrix.totalhighandcriticalincidentsforsameperiodpreviousyear) *
                    100,
                ).toFixed(0)}%`
              : null
          }
          text={generateText(direction, metrix.date_added)}
          direction={direction}
          prefix="на&nbsp;"
        />
        <MetricCard
          value={metrix.amountofcyberdefenceobjects}
          text="об’єктів кіберзахисту"
        />
      </div>
    </Styles>
  );
}
