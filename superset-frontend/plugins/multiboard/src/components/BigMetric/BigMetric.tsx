import React from 'react';
import {styled} from '@superset-ui/core';
import {BigMetricProps, BigMetricStylesProps} from './types';

interface StylesProps {
  customizeProps?:
}

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
    ${({bigValueFontSize}) => `
      font-size: ${bigValueFontSize}px;
      line-height: ${bigValueFontSize}px;
    `}
  }

  .small .value {
    ${({smallValueFontSize}) => `
      font-size: ${smallValueFontSize}px;
      line-height: ${smallValueFontSize}px;
    `}
  }

  .title {
    ${({titleFontSize}) => `
      font-size: ${titleFontSize}px;
      line-height: ${titleFontSize * 1.5}px;
    `}
    font-weight: 700;
    text-align: start;
  }

  .text {
    font-family: eUkraine-Regular, serif;
    ${({textFontSize}) => `
      font-size: ${textFontSize}px;
      line-height: ${textFontSize * 1.5}px;
    `}
    opacity: 0.7;
    text-align: start;
  }
`;

export default function BigMetric(props: BigMetricProps) {
  const {title, text, value, prefix, type = 'small', customizeProps} = props;
  return (
    <Styles {...customizeProps}>
      <div className={`metric-container ${type}`}>
        <div className="header">
          <span className="value">
            <small className="text">{prefix}</small>
            {value || 'Немає даних'}
          </span>
          {value && <span className="title">{title}</span>}
        </div>
        {text && <span className="text">{text}</span>}
      </div>
    </Styles>
  );
}
