import {ControlSetRow} from '@superset-ui/plugin-chart-echarts';
import {ControlSetItem, ControlSubSectionHeader,} from '@superset-ui/chart-controls';
import {t} from '@superset-ui/core';
import React from 'react';
import {DEFAULT_COLOR_PICKER, FONT_SIZE_OPTIONS, LABEL_MARGIN_OPTIONS,} from '../constants';

const xLabelFontSizeControl: ControlSetItem = {
  name: 'x_label_font_size',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('X Axis Label Font Size'),
    renderTrigger: true,
    choices: FONT_SIZE_OPTIONS,
    default: 10,
    description: t('X Axis Label font size.'),
  },
};

const xLabelMarginControl: ControlSetItem = {
  name: 'x_label_margin',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('X Axis Label Margin'),
    renderTrigger: true,
    choices: LABEL_MARGIN_OPTIONS,
    default: 33,
    description: t('X Axis Label Margin.'),
  },
};

const xLabelColorControl: ControlSetItem = {
  name: 'x_label_color',
  config: {
    type: 'ColorPickerControl',
    label: t('X Label Color'),
    default: DEFAULT_COLOR_PICKER,
    renderTrigger: true,
    description: t('Color of the x label'),
  },
};

const yLabelFontSizeControl: ControlSetItem = {
  name: 'y_label_font_size',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('Y Axis Label Font Size'),
    renderTrigger: true,
    choices: FONT_SIZE_OPTIONS,
    default: 10,
    description: t('Y Axis Label font size.'),
  },
};

const yLabelMarginControl: ControlSetItem = {
  name: 'y_label_margin',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('Y Axis Label Margin'),
    renderTrigger: true,
    choices: LABEL_MARGIN_OPTIONS,
    default: 30,
    description: t('Y Axis Label Margin.'),
  },
};

const yLabelColorControl: ControlSetItem = {
  name: 'y_label_color',
  config: {
    type: 'ColorPickerControl',
    label: t('Y Label Color'),
    default: DEFAULT_COLOR_PICKER,
    renderTrigger: true,
    description: t('Color of the y label'),
  },
};

export const labelsSection: ControlSetRow[] = [
  [
    <ControlSubSectionHeader>
      {t('Axis Labels Options')}
    </ControlSubSectionHeader>,
  ],
  [xLabelFontSizeControl],
  [xLabelMarginControl],
  [xLabelColorControl],
  [yLabelFontSizeControl],
  [yLabelMarginControl],
  [yLabelColorControl],
];
