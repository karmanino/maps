import { createReducer, on } from '@ngrx/store';
import { Record } from '@interfaces/records.interface';
import * as actions from '../actions';
import { Filters } from '@interfaces/filters.interface';
import { filter } from 'rxjs';

export interface RecordsState {
  fullList: Record[];
  records: Record[];
  filters: Filters;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const recordsInitialState: RecordsState = {
  fullList: [],
  records: [],
  filters: {},
  loaded: false,
  loading: false,
  error: null,
};

const _recordsReducer = createReducer(
  recordsInitialState,

  on(actions.loadRecords, (state) => ({ ...state, loading: true })),

  on(actions.loadRecordsSuccess, (state, { records }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      records: [...records],
      fullList: [...records],
    };
  }),

  on(actions.loadRecordsError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload?.url,
      message: payload?.message,
      name: payload?.name,
    },
  })),

  on(actions.toggleFavorite, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(actions.toggleFavoriteSuccess, (state, { propId }) => {
    let newLists: Record[][] = [];
    newLists[0] = JSON.parse(JSON.stringify(state.fullList));
    const index = newLists[0].findIndex((record) => record.propertyID === propId);
    newLists[0][index].favorite = !newLists[0][index].favorite;
    const filteredItemIndex = state.records.findIndex((record) => record.propertyID === propId);

    if (filteredItemIndex >= 0) {
      newLists[1] = JSON.parse(JSON.stringify(state.records));
      newLists[1][filteredItemIndex].favorite = !newLists[1][filteredItemIndex].favorite;
      if (!newLists[1][filteredItemIndex].favorite && state.filters.onlyFavorites)
        newLists[1].splice(filteredItemIndex, 1);
    } else {
      newLists[1] = state.records;
    }

    return {
      ...state,
      fullList: [...newLists[0]],
      records: [...newLists[1]],
      loading: false,
      loaded: true,
    };
  }),

  on(actions.loadRecordsError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload?.url,
      message: payload?.message,
      name: payload?.name,
    },
  })),

  on(actions.applyFilter, (state, { filters }) => {
    let newList: Record[] = [...state.fullList];
    if (filters.maxPrice || state.filters.maxPrice) {
      let criteria = filters.maxPrice || state.filters.maxPrice;
      newList = newList.filter((record) => {
        let floorplansPrices: number[] = [];
        record.floorplans?.forEach((floorplan) => floorplansPrices.push(floorplan.price!));
        return criteria! >= Math.min(...floorplansPrices);
      });
    }

    if (filters.bedrooms || state.filters.bedrooms) {
      let criteria = filters.bedrooms || state.filters.bedrooms || [];
      newList = newList.filter((record) => {
        let floorplansBeds: number[] = [];
        let meetsCriteria = false;
        record.floorplans?.forEach((floorplan) => floorplansBeds.push(floorplan.bedrooms!));
        criteria.forEach((bedrooms) => {
          if (floorplansBeds.includes(bedrooms)) meetsCriteria = true;
        });
        return meetsCriteria;
      });
    }

    if (
      filters.onlyFavorites ||
      (filters.onlyFavorites === undefined && state.filters.onlyFavorites)
    ) {
      newList = newList.filter((record) => record.favorite);
    }

    return {
      ...state,
      filters: { ...state.filters, ...filters },
      records: [...newList],
    };
  })
);

export function recordsReducer(state: any, action: any) {
  return _recordsReducer(state, action);
}
