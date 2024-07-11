/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t } from '@superset-ui/core';
import {
  ControlPanelConfig,
  ControlPanelsContainerProps,
  ControlSubSectionHeader,
  D3_TIME_FORMAT_DOCS, formatSelectOptions,
  getStandardizedControls,
  sections,
  sharedControls,
} from '@superset-ui/chart-controls';

import { EchartsTimeseriesSeriesType } from '../../types';
import {
  DEFAULT_FORM_DATA,
  TIME_SERIES_DESCRIPTION_TEXT,
} from '../../constants';
import {
  legendSection,
  minorTicks,
  richTooltipSection,
  seriesOrderSection,
  showValueSection,
  truncateXAxis,
  xAxisBounds,
  xAxisLabelRotation,
} from '../../../controls';
import { LABEL_FONT_SIZE_OPTIONS } from 'packages/superset-ui-chart-controls/src/sections/chartTitle';

const {
  area,
  logAxis,
  markerEnabled,
  markerSize,
  minorSplitLine,
  opacity,
  rowLimit,
  seriesType,
  truncateYAxis,
  yAxisBounds,
  zoomable,
  yAxisShow,
  yAxisSplitLineShow,
  xAxisShow,
  xAxisLabelsShow,
  xAxisLabelFontSize,
  xAxisTicksShow,
  legendLabelColor,
} = DEFAULT_FORM_DATA;
const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.echartsTimeSeriesQueryWithXAxisSort,
    sections.advancedAnalyticsControls,
    sections.annotationsAndLayersControls,
    sections.forecastIntervalControls,
    sections.titleControls,
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ...seriesOrderSection,
        ['color_scheme'],
        [
          {
            name: 'seriesType',
            config: {
              type: 'SelectControl',
              label: t('Series Style'),
              renderTrigger: true,
              default: seriesType,
              choices: [
                [EchartsTimeseriesSeriesType.Line, t('Line')],
                [EchartsTimeseriesSeriesType.Scatter, t('Scatter')],
                [EchartsTimeseriesSeriesType.Smooth, t('Smooth Line')],
                [EchartsTimeseriesSeriesType.Bar, t('Bar')],
                [EchartsTimeseriesSeriesType.Start, t('Step - start')],
                [EchartsTimeseriesSeriesType.Middle, t('Step - middle')],
                [EchartsTimeseriesSeriesType.End, t('Step - end')],
              ],
              description: t('Series chart type (line, bar etc)'),
            },
          },
        ],
        ...showValueSection,
        [
          {
            name: 'area',
            config: {
              type: 'CheckboxControl',
              label: t('Area Chart'),
              renderTrigger: true,
              default: area,
              description: t(
                'Draw area under curves. Only applicable for line types.',
              ),
            },
          },
        ],
        [
          {
            name: 'opacity',
            config: {
              type: 'SliderControl',
              label: t('Area chart opacity'),
              renderTrigger: true,
              min: 0,
              max: 1,
              step: 0.1,
              default: opacity,
              description: t(
                'Opacity of Area Chart. Also applies to confidence band.',
              ),
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.area?.value),
            },
          },
        ],
        [
          {
            name: 'markerEnabled',
            config: {
              type: 'CheckboxControl',
              label: t('Marker'),
              renderTrigger: true,
              default: markerEnabled,
              description: t(
                'Draw a marker on data points. Only applicable for line types.',
              ),
            },
          },
        ],
        [
          {
            name: 'markerSize',
            config: {
              type: 'SliderControl',
              label: t('Marker Size'),
              renderTrigger: true,
              min: 0,
              max: 20,
              default: markerSize,
              description: t(
                'Size of marker. Also applies to forecast observations.',
              ),
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.markerEnabled?.value),
            },
          },
        ],
        [
          {
            name: 'zoomable',
            config: {
              type: 'CheckboxControl',
              label: t('Data Zoom'),
              default: zoomable,
              renderTrigger: true,
              description: t('Enable data zooming controls'),
            },
          },
        ],
        [minorTicks],
        ...legendSection,
        [<ControlSubSectionHeader>{t('X Axis')}</ControlSubSectionHeader>],
        [
          {
            name: 'x_axis_time_format',
            config: {
              ...sharedControls.x_axis_time_format,
              default: 'smart_date',
              description: `${D3_TIME_FORMAT_DOCS}. ${TIME_SERIES_DESCRIPTION_TEXT}`,
            },
          },
        ],
        [xAxisLabelRotation],
        [
          {
            name: 'xAxisLabelFontSize',
            config: {
              type: 'SelectControl',
              freeForm: true,
              clearable: true,
              label: t('X AXIS LABEL FONT SIZE'),
              renderTrigger: true,
              default: LABEL_FONT_SIZE_OPTIONS[0],
              description: t('Changing this control takes effect instantly'),
            },
          },
        ],
        ...richTooltipSection,
        // eslint-disable-next-line react/jsx-key
        [<ControlSubSectionHeader>{t('Y Axis')}</ControlSubSectionHeader>],
        ['y_axis_format'],
        ['currency_format'],
        [
          {
            name: 'logAxis',
            config: {
              type: 'CheckboxControl',
              label: t('Logarithmic y-axis'),
              renderTrigger: true,
              default: logAxis,
              description: t('Logarithmic y-axis'),
            },
          },
        ],
        [
          {
            name: 'minorSplitLine',
            config: {
              type: 'CheckboxControl',
              label: t('Minor Split Line'),
              renderTrigger: true,
              default: minorSplitLine,
              description: t('Draw split lines for minor y-axis ticks'),
            },
          },
        ],
        [truncateXAxis],
        [xAxisBounds],
        [
          {
            name: 'truncateYAxis',
            config: {
              type: 'CheckboxControl',
              label: t('Truncate Y Axis'),
              default: truncateYAxis,
              renderTrigger: true,
              description: t(
                'Truncate Y Axis. Can be overridden by specifying a min or max bound.',
              ),
            },
          },
        ],
        [
          {
            name: 'y_axis_bounds',
            config: {
              type: 'BoundsControl',
              label: t('Y Axis Bounds'),
              renderTrigger: true,
              default: yAxisBounds,
              description: t(
                'Bounds for the Y-axis. When left empty, the bounds are ' +
                  'dynamically defined based on the min/max of the data. Note that ' +
                  "this feature will only expand the axis range. It won't " +
                  "narrow the data's extent.",
              ),
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.truncateYAxis?.value),
            },
          },
        ],
        [
          {
            name: 'yAxisShow',
            config: {
              type: 'CheckboxControl',
              label: t('Y AXIS SHOW'),
              renderTrigger: true,
              default: yAxisShow,
              description: t('Show y axis'),
            },
          },
        ],
        [
          {
            name: 'yAxisSplitLineShow',
            config: {
              type: 'CheckboxControl',
              label: t('Y AXIS SPLIT LINE SHOW'),
              renderTrigger: true,
              default: yAxisSplitLineShow,
              description: t('Show y axis split line'),
            },
          },
        ],
        [
          {
            name: 'xAxisShow',
            config: {
              type: 'CheckboxControl',
              label: t('X AXIS SHOW'),
              renderTrigger: true,
              default: xAxisShow,
              description: t('Show x axis'),
            },
          },
        ],
        [
          {
            name: 'xAxisLabelsShow',
            config: {
              type: 'CheckboxControl',
              label: t('X AXIS LABELS SHOW'),
              renderTrigger: true,
              default: xAxisLabelsShow,
              description: t('Show x axis labels'),
            },
          },
        ],
        [
          {
            name: 'xAxisTicksShow',
            config: {
              type: 'CheckboxControl',
              label: t('X AXIS TICKS SHOW'),
              renderTrigger: true,
              default: xAxisTicksShow,
              description: t('Show x axis ticks'),
            },
          },
        ],
        [
          {
            name: 'legendLabelColor',
            config: {
              type: 'ColorPickerControl',
              label: t('Legend Label Color'),
              default: legendLabelColor,
              renderTrigger: true,
              description: t('Color of the legend label'),
            },
          },
        ],
      ],
    },
  ],
  controlOverrides: {
    row_limit: {
      default: rowLimit,
    },
  },
  formDataOverrides: formData => ({
    ...formData,
    metrics: getStandardizedControls().popAllMetrics(),
    groupby: getStandardizedControls().popAllColumns(),
  }),
};

export default config;
