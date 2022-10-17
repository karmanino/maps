import { Injectable } from '@angular/core';
import { ToggleFavoriteRequest } from '@interfaces/records.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import { PropertiesService } from '@services/properties.service';
import { catchError, map, mergeMap, tap, of, throwError, withLatestFrom } from 'rxjs';
import * as actions from '../actions';
import {
  loadRecordsError,
  loadRecordsSuccess,
  toggleFavoriteFailure,
  toggleFavoriteSuccess,
} from '../actions';

@Injectable()
export class RecordsEffects {
  constructor(
    private actions$: Actions,
    private propertiesSvc: PropertiesService,
    private store: Store<AppState>
  ) {}

  loadRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadRecords),
      mergeMap(() =>
        this.propertiesSvc.getAllProperties().pipe(
          map((records) => loadRecordsSuccess({ records })),
          catchError((err) => of(loadRecordsError({ payload: err })))
        )
      )
    )
  );

  toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.toggleFavorite),
      mergeMap(({ propId, favorite }) => {
        let payload: ToggleFavoriteRequest = {
          isFavorite: favorite,
          propertyID: propId,
          listID: '7892472',
          token: 'AD6110320424834934DE62FD2935A49264B6D947',
        };
        return this.propertiesSvc.toggleFavorite(payload).pipe(
          map(({ success }) => {
            if (!success) throwError('Failed');
            return toggleFavoriteSuccess({
              propId,
            });
          }),
          catchError((err) => {
            if (err?.status === 200) {
              return of(
                toggleFavoriteSuccess({
                  propId,
                })
              );
            } else {
              return of(toggleFavoriteFailure({ payload: err }));
            }
          })
        );
      })
    )
  );
}
