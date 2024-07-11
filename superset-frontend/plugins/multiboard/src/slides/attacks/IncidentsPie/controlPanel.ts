import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  ControlPanelsContainerProps,
  D3_FORMAT_DOCS,
  D3_FORMAT_OPTIONS,
  D3_NUMBER_FORMAT_DESCRIPTION_VALUES_TEXT,
  D3_TIME_FORMAT_OPTIONS,
  sharedControls,
} from '@superset-ui/chart-controls';
import {
  DEFAULT_FORM_DATA,
  legendSection,
} from '@superset-ui/plugin-chart-echarts';
import {headerSection} from '../../../controls/headerSection';
import {FONT_SIZE_OPTIONS} from '../../../constants';

const { labelType, labelLine, showLabels, outerRadius, donut, innerRadius } =
  DEFAULT_FORM_DATA;

const config: ControlPanelConfig = {
  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'cols',
            config: {
              ...sharedControls.groupby,
              label: t('Columns'),
              description: t('Columns to group by'),
            },
          },
        ],
        [
          {
            name: 'metrics',
            config: {
              ...sharedControls.metrics,
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              validators: [validateNonEmpty],
            },
          },
        ],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: sharedControls.row_limit,
          },
        ],
      ],
    },
    {
      label: t('Header Options'),
      expanded: true,
      controlSetRows: [...headerSection],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [['color_scheme'], ...legendSection],
    },
    {
      label: t('Labels'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'label_type',
            config: {
              type: 'SelectControl',
              label: t('Label Type'),
              default: labelType,
              renderTrigger: true,
              choices: [
                ['key', t('Category Name')],
                ['value', t('Value')],
                ['percent', t('Percentage')],
                ['key_value', t('Category and Value')],
                ['key_percent', t('Category and Percentage')],
                ['key_value_percent', t('Category, Value and Percentage')],
                ['value_percent', t('Value and Percentage')],
                ['percent_value', t('Percentage and Value')],
              ],
              description: t('What should be shown on the label?'),
            },
          },
        ],
        [
          {
            name: 'show_labels',
            config: {
              type: 'CheckboxControl',
              label: t('Show Labels'),
              renderTrigger: true,
              default: showLabels,
              description: t('Whether to display the labels.'),
            },
          },
        ],
        [
          {
            name: 'label_line',
            config: {
              type: 'CheckboxControl',
              label: t('Label Line'),
              default: labelLine,
              renderTrigger: true,
              description: t(
                'Draw line from Pie to label when labels outside?',
              ),
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.show_labels?.value),
            },
          },
        ],
        [
          {
            name: 'show_total',
            config: {
              type: 'CheckboxControl',
              label: t('Show Total'),
              default: false,
              renderTrigger: true,
              description: t('Whether to display the aggregate count'),
            },
          },
        ],
        [
          {
            name: 'total_font_size',
            config: {
              type: 'SelectControl',
              freeForm: true,
              clearable: true,
              label: t('Total Font Size'),
              renderTrigger: true,
              choices: FONT_SIZE_OPTIONS,
              default: 28,
              description: t('The size of total value'),
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.show_total?.value),
            },
          },
        ],
        [
          {
            name: 'show_date',
            config: {
              type: 'CheckboxControl',
              label: t('Show Date'),
              default: false,
              renderTrigger: true,
              description: t('Whether to display the chart date'),
            },
          },
        ],
        [
          {
            name: 'date_label_format',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Date label format'),
              renderTrigger: true,
              choices: D3_TIME_FORMAT_OPTIONS,
              default: D3_TIME_FORMAT_OPTIONS[2][0],
              description: D3_FORMAT_DOCS,
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.show_date?.value),
            },
          },
        ],
      ],
    },
    {
      label: t('Pie Shape'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'outerRadius',
            config: {
              type: 'SliderControl',
              label: t('Outer Radius'),
              renderTrigger: true,
              min: 10,
              max: 100,
              step: 1,
              default: outerRadius,
              description: t('Outer edge of Pie chart'),
            },
          },
        ],
        [
          {
            name: 'donut',
            config: {
              type: 'CheckboxControl',
              label: t('Donut'),
              default: donut,
              renderTrigger: true,
              description: t('Do you want a donut or a pie?'),
            },
          },
        ],
        [
          {
            name: 'innerRadius',
            config: {
              type: 'SliderControl',
              label: t('Inner Radius'),
              renderTrigger: true,
              min: 0,
              max: 100,
              step: 1,
              default: innerRadius,
              description: t('Inner radius of donut hole'),
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.donut?.value),
            },
          },
        ],
      ],
    },
  ],
};

export default config;
