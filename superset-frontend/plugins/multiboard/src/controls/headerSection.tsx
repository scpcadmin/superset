import {ControlSetRow} from '@superset-ui/plugin-chart-echarts';
import {ControlSetItem} from '@superset-ui/chart-controls';
import {t} from '@superset-ui/core';
import {FONT_SIZE_OPTIONS} from '../constants';

const headerTextControl: ControlSetItem = {
  name: 'header_text',
  config: {
    type: 'TextControl',
    default: 'Header Text',
    renderTrigger: true,
    label: t('Header Text'),
    description: t(
      'The text you want to see in the header. Use {thisYear} and {prevYear} to insert the year value.',
    ),
  },
};

const headerFontSizeControl: ControlSetItem = {
  name: 'header_font_size',
  config: {
    type: 'SelectControl',
    freeForm: true,
    clearable: true,
    label: t('Header Font Size'),
    renderTrigger: true,
    choices: FONT_SIZE_OPTIONS,
    default: 28,
    description: t('The size of your header font'),
  },
};

export const headerSection: ControlSetRow[] = [
  [headerTextControl],
  [headerFontSizeControl],
];
