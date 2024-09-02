import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  sharedControls,
} from '@superset-ui/chart-controls';
import {FONT_SIZE_OPTIONS} from '../../constants';

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
      label: t('Filter Date Options'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'date_text',
            config: {
              type: 'TextControl',
              default: 'Станом на {dateTo}',
              renderTrigger: true,
              label: t('Filter Date Text'),
              description: t(
                'The text you want to see in the filter date. Use {dateFrom} and {dateTo} to insert the filter date values.',
              ),
            },
          },
        ],
        [
          {
            name: 'date_font_size',
            config: {
              type: 'SelectControl',
              freeForm: true,
              clearable: true,
              label: t('Filter Date Font Size'),
              renderTrigger: true,
              choices: FONT_SIZE_OPTIONS,
              default: 16,
              description: t(
                'The filter date text font size.',
              ),
            },
          },
        ],
      ],
    },
    {
      label: t('Targets List Controls'),
      expanded: true,
      controlSetRows: [],
    },
  ],
};

export default config;
