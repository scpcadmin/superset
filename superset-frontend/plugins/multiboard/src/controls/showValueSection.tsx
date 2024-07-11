import {DEFAULT_COLOR_PICKER, FONT_SIZE_OPTIONS, LABEL_MARGIN_OPTIONS} from '../constants';
import {ControlSetRow} from '@superset-ui/plugin-chart-echarts';
import {ControlPanelsContainerProps, ControlSetItem, ControlSubSectionHeader} from '@superset-ui/chart-controls';
import {t} from '@superset-ui/core';
import React from 'react';

export const showValueControl: ControlSetItem = {
  name: 'show_value',
  config: {
    type: 'CheckboxControl',
    label: t('Show Value'),
    default: false,
    renderTrigger: true,
    description: t('Show series values on the chart'),
  },
};

const valueFontSizeControl: ControlSetItem = {
  name: 'value_font_size',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('Value Label Font Size'),
    renderTrigger: true,
    choices: FONT_SIZE_OPTIONS,
    default: 10,
    description: t('Value Label font size.'),
    visibility: ({controls}: ControlPanelsContainerProps) =>
      Boolean(controls?.show_value?.value),
  },
};

const valueMarginControl: ControlSetItem = {
  name: 'value_margin',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('Value Label Margin'),
    renderTrigger: true,
    choices: LABEL_MARGIN_OPTIONS,
    default: 30,
    description: t('Value Label Margin.'),
    visibility: ({controls}: ControlPanelsContainerProps) =>
      Boolean(controls?.show_value?.value),
  },
};

const valueColorControl: ControlSetItem = {
  name: 'value_color',
  config: {
    type: 'ColorPickerControl',
    label: t('Value Color'),
    default: DEFAULT_COLOR_PICKER,
    renderTrigger: true,
    description: t('Color of the Value label'),
    visibility: ({controls}: ControlPanelsContainerProps) =>
      Boolean(controls?.show_value?.value),
  },
};

export const showValueSection: ControlSetRow[] = [
  [
    <ControlSubSectionHeader>
      {t('Value Label Options')}
    </ControlSubSectionHeader>,
  ],
  [showValueControl],
  [valueFontSizeControl],
  [valueMarginControl],
  [valueColorControl],
];
