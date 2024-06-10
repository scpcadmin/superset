import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { BigMetricProps, BigMetricStylesProps } from './types';

const Styles = styled.div<BigMetricStylesProps>`
  .metric-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .value {
    font-family: eUkraine-Medium, serif;
  }

  .big .value {
    font-size: 56px;
  }

  .small .value {
    font-size: 36px;
  }

  .title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    text-align: start;
  }

  .text {
    font-family: eUkraine-Regular, serif;
    font-size: 16px;
    line-height: 24px;
    opacity: 0.7;
    text-align: start;
  }
`;

export default function BigMetric(props: BigMetricProps) {
  const { title, text, value, prefix, type = 'small' } = props;

  return (
    <Styles>
      <div className={`metric-container ${type}`}>
        <div className="header">
          <span className="value">
            <small className="text">{prefix}</small>
            {value}
          </span>
          {title && <span className="title">{title}</span>}
        </div>
        {text && <span className="text">{text}</span>}
      </div>
    </Styles>
  );
}
