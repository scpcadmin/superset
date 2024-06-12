import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';

export default class IncidentsPiePlugin extends ChartPlugin {

  constructor() {
    const metadata = new ChartMetadata({
      description: 'Multiboard incident pie chart',
      name: t('Incidents Pie'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./IncidentsPie'),
      metadata,
      transformProps,
    });
  }
}
