import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';

export default class UavScheduleBarPlugin extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'Uav Schedule Bar',
      name: t('Uav Schedule Bar'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./UavScheduleBar'),
      metadata,
      transformProps,
    });
  }
}
