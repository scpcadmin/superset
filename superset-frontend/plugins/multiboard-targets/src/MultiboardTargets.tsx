import React, { createRef, useState } from 'react';
import { styled } from '@superset-ui/core';
import { MultiboardTargetsProps, MultiboardTargetsStylesProps } from './types';

const Styles = styled.div<MultiboardTargetsStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  .targets {
    background-color: #12122f;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  .target-list {
    list-style-type: none;
    padding: 0;
  }

  .target-list li {
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 10px;
  }

  .target-list li::before {
    content: '';
    width: 10px;
    height: 10px;
    background-color: red;
    margin-right: 10px;
  }

  .target-list button {
    background: none;
    border: none;
  }

  .target-list li:hover span,
  .target-list li.selected span {
    color: white;
  }

  .target-list li span {
    margin-right: 10px;
    font-family: eUkraineHead, sans-serif;
    color: #cacacb;
  }

  .description {
    text-align: start;
    padding-left: 20px;
  }

  .description h3 {
    margin: 0;
    padding-bottom: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    flex-grow: 1;
    color: white;
    font-family: eUkraineHead;
    font-size: 18px;
    font-weight: 500;
  }

  .description p {
    color: white;
    font-family: eUkraineHead;
    font-size: 14px;
    font-weight: 400;
  }
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function MultiboardTargets(props: MultiboardTargetsProps) {
  const { data, height, width } = props;
  const defaultIndex = data.findIndex(item => item.should_display_as_default);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    defaultIndex,
  );

  const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <div className="targets">
        <ul className="target-list">
          {data.map((item, index) => (
            <li
              key={index}
              className={index === selectedItemIndex ? 'selected' : ''}
            >
              <button type="button" onClick={() => setSelectedItemIndex(index)}>
                <span>{index + 1}</span>
                <span>{item.organisation_name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="description">
          <h3>Опис події</h3>
          <p>
            {selectedItemIndex !== null ? (
              <>
                {data[selectedItemIndex].organisation_name} - <br />{' '}
                {data[selectedItemIndex].description}
              </>
            ) : (
              data.map(
                (item, index) =>
                  item.should_display_as_default && (
                    <React.Fragment key={index}>
                      {item.organisation_name} - <br /> {item.description}
                    </React.Fragment>
                  ),
              )
            )}
          </p>
        </div>
      </div>
    </Styles>
  );
}
