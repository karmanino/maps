import { Component, Input, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';

import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import * as actions from '@store/actions';
import * as selectors from '@store/selectors';

import { PropertyInfo } from '@interfaces/property-info.interface';

@Component({
  selector: 'app-property-favorite-button',
  templateUrl: './property-favorite-button.component.html',
  styleUrls: ['./property-favorite-button.component.scss'],
})
export class PropertyFavoriteButtonComponent implements OnInit {
  
  propertyInfo!: PropertyInfo;

  constructor(private store: Store<AppState>, private actions$: Actions) {}

  ngOnInit(): void {

    this.store.select(selectors.selectPropertyFullDetail)
    .pipe(take(1))
    .subscribe(propertyInfo => this.propertyInfo = {...propertyInfo!})

    this.actions$
      .pipe(
        ofType(actions.toggleFavoriteSuccess),
        tap((_) => (this.propertyInfo.favorite = !this.propertyInfo.favorite))
      )
      .subscribe();
  }

  toggleFavorite() {
    this.store.dispatch(
      actions.toggleFavorite({
        propId: this.propertyInfo.propertyID,
        favorite: !this.propertyInfo.favorite,
      })
    );
  }
}
