import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';

export default class UavSupplyBarPlugin extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'Uav Supply Bar',
      name: t('Uav Supply Bar'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./UavSupplyBar'),
      metadata,
      transformProps,
    });
  }
}
