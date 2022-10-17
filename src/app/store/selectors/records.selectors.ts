import { createSelector } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import { RecordsState } from '@store/reducers';

export const selectRecords = (state: AppState) => state.records;

export const selectFullListRecords = createSelector(
  selectRecords,
  (state: RecordsState) => state.fullList
);

export const selectActiveRecords = createSelector(
  selectRecords,
  (state: RecordsState) => state.records
);

export const selectFilters = createSelector(selectRecords, (state: RecordsState) => state.filters);

export const selectBedroomsFilter = createSelector(
  selectRecords,
  (state: RecordsState) => state.filters.bedrooms
);

export const selectPriceRangeFilter = createSelector(
  selectRecords,
  (state: RecordsState) => state.filters.maxPrice
);

export const selectFavoritesFilter = createSelector(
  selectRecords,
  (state: RecordsState) => state.filters.onlyFavorites
);

export const selectListLoaded = createSelector(
  selectRecords,
  (state: RecordsState) => state.loading
);
