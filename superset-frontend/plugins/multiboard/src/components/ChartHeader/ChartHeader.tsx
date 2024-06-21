import React from 'react';
import { styled } from '@superset-ui/core';
import { ChartHeaderProps, ChartHeaderStylesProps } from './types';

const Styles = styled.div<ChartHeaderStylesProps>`
  .header {
    font-size: ${({ headerFontSize }) => headerFontSize}px;
    line-height: 32px;
    text-align: start;
    height: 62px;
    margin: 0;
  }
`;

export default function ChartHeader(props: ChartHeaderProps) {
  const { title, fontSize } = props;

  return (
    <Styles headerFontSize={fontSize}>
      <h1 className="header">{title}</h1>
    </Styles>
  );
}
