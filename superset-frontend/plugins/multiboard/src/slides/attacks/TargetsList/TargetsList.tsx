import React, {createRef, useState} from 'react';
import {styled} from '@superset-ui/core';
import {
  TargetsListProps,
  TargetsListStylesProps,
} from './types';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';

const Styles = styled.div<TargetsListStylesProps>`
  height: ${({height}) => height}px;
  width: ${({width}) => width}px;

  .targets {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
  }

  .target-list-container {
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
  }

  .target-list {
    list-style-type: none;
    padding: 0;
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
    margin: 0;
  }

  .target-list li {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    counter-increment: list;
  }

  .target-list li::before {
    content: counter(list) '.'; /* Display the counter value followed by a dot */
    margin-right: 5px; /* Add some space between the counter and the content */
    font-weight: bold; /* Optionally make the counter bold */
  }

  .target-list button {
    background: none;
    border: none;
    text-align: start;
  }

  .target-list li button:hover span,
  .target-list li button.selected span {
    text-decoration: underline;
  }

  .target-list li span,
  .target-list li::before {
    margin-right: 8px;
    font-size: 20px;
    font-weight: 700;
  }

  .description {
    text-align: start;
  }

  h1,
  .description h3 {
    margin: 0;
    padding-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    flex-grow: 1;
    font-family: eUkraineHead;
    font-size: 20px;
    font-weight: 700;
  }

  .description p {
    font-size: 16px;
    font-weight: 400;
    text-align: justify;
    opacity: 0.7;
  }

  /* total width */

  .scrollbar::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  /* background of the scrollbar except button or resizer */

  .scrollbar::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 16px;
  }

  .scrollbar::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }

  /* scrollbar itself */

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid #fff;
  }

  .scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }

  /* set button(top and bottom of the scrollbar) */

  .scrollbar::-webkit-scrollbar-button {
    display: none;
  }
`;

export default function TargetsList(props: TargetsListProps) {
  const {
    data,
    headerText,
    headerFontSize,
    subheaderText,
    subheaderFontSize,
    height,
    width,
  } = props;
  const defaultIndex = data.findIndex(item => item.should_display_as_default);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    defaultIndex
  );

  const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <div className="targets">
        <ChartHeader title={headerText} fontSize={headerFontSize}/>
        <div className="target-list-container scrollbar">
          <ol className="target-list">
            {data.map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  className={index === selectedItemIndex ? 'selected' : ''}
                  onClick={() => setSelectedItemIndex(index)}
                >
                  <span>{item.organisation_name}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {selectedItemIndex && selectedItemIndex !== -1 ? (
          <div className="description">
            <ChartHeader title={subheaderText} fontSize={subheaderFontSize}/>
            <p>
              {data[selectedItemIndex].organisation_name} - <br/>
              {data[selectedItemIndex].description}
            </p>
          </div>
        ) : null}

      </div>
    </Styles>
  );
}
