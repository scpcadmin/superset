import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';

export default class TotalIncidentsBarPlugin extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'Total Incidents Bar',
      name: t('Total Incidents Bar'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./TotalIncidentsBar'),
      metadata,
      transformProps,
    });
  }
}
