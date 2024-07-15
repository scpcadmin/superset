import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';

export default class FilterDatePlugin extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'Filter date',
      name: t('Filter date'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./FilterDate'),
      metadata,
      transformProps,
    });
  }
}
