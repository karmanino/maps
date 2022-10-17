import { createSelector } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import { UIState } from '@store/reducers';

export const selectUI = (state: AppState) => state.ui;

export const selectPropertySelected = createSelector(selectUI, (state: UIState) => state.selected);

export const selectPropertyFullDetail = createSelector(selectUI, (state: UIState) => state.fullDetail);

export const selectPropLoaded = createSelector(selectUI, (state: UIState) => state.loading);
