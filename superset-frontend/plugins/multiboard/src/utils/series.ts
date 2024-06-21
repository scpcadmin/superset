import {LegendOrientation, LegendType, TIMESERIES_CONSTANTS} from '@superset-ui/plugin-chart-echarts';
import {LegendComponentOption} from 'echarts';

export function getLegendProps(
  show: boolean,
  type: LegendType,
  orientation: LegendOrientation,
  zoomable = false,
) {
  const legend: LegendComponentOption | LegendComponentOption[] = {
    show,
    type,
    orient: [LegendOrientation.Top, LegendOrientation.Bottom].includes(
      orientation,
    )
      ? 'horizontal'
      : 'vertical',
    itemGap: 16,
    icon: 'none',
    formatter(name: string) {
      return `{symbol|}\n{name|${name}}`;
    },
    textStyle: {
      rich: {
        symbol: {
          align: 'left',
          verticalAlign: 'top',
          width: 20,
          height: 20,
          borderRadius: 50,
          backgroundColor: (params: any) => params,
        },
        name: {
          fontSize: 16,
          fontWeight: 600,
          lineHeight: 24,
          opacity: 0.5,
          align: 'left',
          verticalAlign: 'bottom',
          padding: [4, 0, 0, 0],
        },
      },
    },
  };

  switch (orientation) {
    case LegendOrientation.Left:
      legend.left = 0;
      break;
    case LegendOrientation.Right:
      legend.right = 0;
      legend.top = zoomable ? TIMESERIES_CONSTANTS.legendRightTopOffset : 0;
      break;
    case LegendOrientation.Bottom:
      legend.bottom = 0;
      legend.left = -30;
      break;
    case LegendOrientation.Top:
    default:
      legend.top = 0;
      legend.right = zoomable ? TIMESERIES_CONSTANTS.legendTopRightOffset : 0;
      break;
  }

  return legend;
}
