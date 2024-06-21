import {ControlSetRow} from '@superset-ui/plugin-chart-echarts';
import {ControlSetItem} from '@superset-ui/chart-controls';
import {t} from '@superset-ui/core';
import {FONT_SIZE_OPTIONS} from '../constants';

const titleFontSizeControl: ControlSetItem = {
  name: 'title_font_size',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('Title Font Size'),
    renderTrigger: true,
    choices: FONT_SIZE_OPTIONS,
    default: 16,
    description: t('The title text font size.'),
  },
};

const bigValueFontSizeControl: ControlSetItem = {
  name: 'big_value_font_size',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('Big Value Font Size'),
    renderTrigger: true,
    choices: FONT_SIZE_OPTIONS,
    default: 56,
    description: t('The big value text font size.'),
  },
};

const smallValueFontSizeControl: ControlSetItem = {
  name: 'small_value_font_size',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('Small Value Font Size'),
    renderTrigger: true,
    choices: FONT_SIZE_OPTIONS,
    default: 36,
    description: t('The small value text font size.'),
  },
};

const textFontSizeControl: ControlSetItem = {
  name: 'text_font_size',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('Text Font Size'),
    renderTrigger: true,
    choices: FONT_SIZE_OPTIONS,
    default: 16,
    description: t('Text font size.'),
  },
};

export const metricsSection: ControlSetRow[] = [
  [titleFontSizeControl],
  [bigValueFontSizeControl],
  [smallValueFontSizeControl],
  [textFontSizeControl],
];
