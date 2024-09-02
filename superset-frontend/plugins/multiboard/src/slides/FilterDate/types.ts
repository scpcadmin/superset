import { QueryFormData } from '@superset-ui/core';

export interface FilterDateStylesProps {
  height: number;
  width: number;
  dateFontSize: number;
}

export interface FilterDateState {
  dateAdded: number;
}

interface FilterDateCustomizeProps {
  dateText: string;
  dateFontSize: number;
}

export type FilterDateQueryFormData = QueryFormData &
  FilterDateStylesProps &
  FilterDateCustomizeProps;

export type FilterDateProps = FilterDateStylesProps &
  FilterDateCustomizeProps & {
    data: FilterDateState;
    formData: FilterDateCustomizeProps;
    dateFrom: string;
    dateTo: string;
    // add typing here for the props you pass in from transformProps.ts!
  };
