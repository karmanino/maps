import { createReducer, on } from '@ngrx/store';
import { Record } from '@interfaces/records.interface';
import * as actions from '../actions';
import { PropertyInfo } from '@interfaces/property-info.interface';

export interface UIState {
  selected: Record | null;
  fullDetail: PropertyInfo | undefined;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const uiInitialState: UIState = {
  selected: null,
  fullDetail: undefined,
  loaded: false,
  loading: true,
  error: null,
};

const _uiReducer = createReducer(
  uiInitialState,
  on(actions.propertySelected, (state, { record, fullDetail }) => ({
    ...state,
    selected: record,
    fullDetail: fullDetail,
    loaded: true,
    loading: false
  })),

  on(actions.propertyUnselected, (state) => ({
    ...state,
    selected: null,
    fullDetail: undefined
  }))
);

export function uiReducer(state: any, action: any) {
  return _uiReducer(state, action);
}
