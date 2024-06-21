import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  sharedControls,
} from '@superset-ui/chart-controls';
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
              default: 'Цілі',
              renderTrigger: true,
              label: t('Header Text'),
              description: t(
                'The text you want to see in the header.',
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
              description: t(
                'The header text font size.',
              ),
            },
          },
        ],
        [
          {
            name: 'subheader_text',
            config: {
              type: 'TextControl',
              default: 'Опис події',
              renderTrigger: true,
              label: t('Header Text'),
              description: t(
                'The text you want to see in the subheader.',
              ),
            },
          },
        ],
        [
          {
            name: 'subheader_font_size',
            config: {
              type: 'SelectControl',
              freeForm: true,
              clearable: true,
              label: t('Subheader Font Size'),
              renderTrigger: true,
              choices: FONT_SIZE_OPTIONS,
              default: 20,
              description: t(
                'The subheader text font size.',
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
