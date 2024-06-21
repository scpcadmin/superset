import {t, validateNonEmpty} from '@superset-ui/core';
import {ControlPanelConfig, sharedControls,} from '@superset-ui/chart-controls';
import {legendSection} from '@superset-ui/plugin-chart-echarts';
import {labelsSection} from '../../../controls/labelsSection';
import {FONT_SIZE_OPTIONS} from '../../../constants';

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
      controlSetRows: [
        [
          {
            name: 'header_text',
            config: {
              type: 'TextControl',
              default: 'Графік видачі законтрактованх БпЛА',
              renderTrigger: true,
              label: t('Header Text'),
              description: t(
                'The text you want to see in the header. Use {thisYear} and {prevYear} to insert the year value.',
              ),
            },
          },
        ],
        [
          {
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
          },
        ],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [['color_scheme'], ...legendSection, ...labelsSection],
    },
  ],
};

export default config;
