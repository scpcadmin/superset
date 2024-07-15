import React, {createRef} from 'react';
import {styled} from '@superset-ui/core';
import {FilterDateProps, FilterDateStylesProps,} from './types';

const Styles = styled.div<FilterDateStylesProps>`
  height: ${({height}) => height}px;
  width: ${({width}) => width}px;

  .date-container {
    text-align: start;
  }

  .date-container span {
    font-size: ${({dateFontSize}) => dateFontSize}px;
    font-family: eUkraine-Medium, serif;
    line-height: ${({dateFontSize}) => dateFontSize * 1.5}px;
    opacity: 0.5;
  }
`;

export default function FilterDate(props: FilterDateProps) {
  const {
    data,
    height,
    width,
    formData,
    dateFrom,
    dateTo
  } = props;

  const rootElem = createRef<HTMLDivElement>();

  const dateTextFormatted = formData.dateText
    .replace('{dateFrom}', dateFrom)
    .replace('{dateTo}', dateTo);

  return (
    <Styles ref={rootElem} height={height} width={width} dateFontSize={formData.dateFontSize}>
      <div className="date-container">
        <span>{dateTextFormatted}</span>
      </div>
    </Styles>
  );
}
