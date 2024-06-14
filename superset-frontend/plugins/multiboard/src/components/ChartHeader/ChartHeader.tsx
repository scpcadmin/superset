import React from 'react';
import {styled} from '@superset-ui/core';
import {ChartHeaderProps, ChartHeaderStylesProps} from './types';

const Styles = styled.div<ChartHeaderStylesProps>`
  .header {
    font-size: 28px;
    line-height: 32px;
    text-align: start;
    height: 62px;
    margin: 0;
  }
`;

export default function ChartHeader(props: ChartHeaderProps) {
  const {title} = props;

  return (
    <Styles>
      <h1 className="header">{title}</h1>
    </Styles>
  );
}
