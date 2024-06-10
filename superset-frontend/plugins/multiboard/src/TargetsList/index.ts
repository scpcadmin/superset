import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/thumbnail.png';

export default class TargetsListPlugin extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'Targets list',
      name: t('Targets list'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./TargetsList'),
      metadata,
      transformProps,
    });
  }
}
