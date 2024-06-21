import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';

export default class TimelinePlugin extends ChartPlugin {

  constructor() {
    const metadata = new ChartMetadata({
      description: 'Timeline of incidents',
      name: t('Timeline'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./Timeline'),
      metadata,
      transformProps,
    });
  }
}
