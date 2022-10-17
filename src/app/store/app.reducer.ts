import { ActionReducerMap } from '@ngrx/store';
import {
  recordsReducer,
  RecordsState,
  uiReducer,
  UIState,
} from '@store/reducers';

export interface AppState {
  records: RecordsState;
  ui: UIState;
}

export const appReducers: ActionReducerMap<AppState> = {
  records: recordsReducer,
  ui: uiReducer,
};
