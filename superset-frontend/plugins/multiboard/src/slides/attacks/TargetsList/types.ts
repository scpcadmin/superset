import {
  QueryFormData,
  TimeseriesDataRecord,
} from '@superset-ui/core';

export interface TargetsListStylesProps {
  height: number;
  width: number;
}

interface TargetsListCustomizeProps {
  headerText: string;
}

export type TargetsListQueryFormData = QueryFormData &
  TargetsListStylesProps &
  TargetsListCustomizeProps;

export type TargetsListProps = TargetsListStylesProps &
  TargetsListCustomizeProps & {
  data: TimeseriesDataRecord[];
  // add typing here for the props you pass in from transformProps.ts!
};
