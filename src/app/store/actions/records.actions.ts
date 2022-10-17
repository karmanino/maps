import { createAction, props } from '@ngrx/store';
import { Record } from '@interfaces/records.interface';
import { Filters } from '@interfaces/filters.interface';

export const loadRecords = createAction('[Records] Load Records');
export const loadRecordsSuccess = createAction(
  '[Records] Load Records Success',
  props<{ records: Record[] }>()
);
export const loadRecordsError = createAction(
  '[Records] Load Records Error',
  props<{ payload: any }>()
);
export const toggleFavorite = createAction(
  '[Records] Toggle favorite status on selected property',
  props<{ propId: number; favorite: boolean }>()
);
export const toggleFavoriteSuccess = createAction(
  '[Records] Toggle favorite status on selected property Success',
  props<{ propId: number }>()
);
export const toggleFavoriteFailure = createAction(
  '[Records] Toggle favorite status on selected property Error',
  props<{ payload: any }>()
);
export const applyFilter = createAction(
  '[Records] Filter modified',
  props<{ filters: Filters }>()
);
