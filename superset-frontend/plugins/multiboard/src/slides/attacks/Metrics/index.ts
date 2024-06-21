import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';

export default class AttackStatsPlugin extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'Metrics',
      name: t('Metrics'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./Metrics'),
      metadata,
      transformProps,
    });
  }
}
