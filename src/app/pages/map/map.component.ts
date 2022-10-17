import { Component, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import { Actions, ofType } from '@ngrx/effects';
import * as actions from '@store/actions';
import * as selectors from '@store/selectors';

import { environment } from '@env/environment';
import { MaptilerWrapper } from 'maptiler-lib';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  pinClickSubscription: Subscription = new Subscription();

  @ViewChild('map', { read: ViewContainerRef })
  private mapContainer!: ViewContainerRef;

  map!: MaptilerWrapper;

  constructor(private store: Store<AppState>, private router: Router, private actions$: Actions) {}

  ngAfterViewInit() {
    this.map = new MaptilerWrapper(
      this.mapContainer,
      environment.mapStyle,
      environment.maptilerKey,
      environment.mapboxToken,
      environment.imgBaseUrl
    );

    this.store.select(selectors.selectActiveRecords).subscribe((records) => {
      this.store
        .select(selectors.selectPropertySelected)
        .pipe(take(1))
        .subscribe((isSelected) => {
          this.map.setMarkers(records, !!isSelected);
          this.pinClickSubscription.unsubscribe();
          this.pinClickSubscription = this.map.pinClicked$.subscribe(
            ({ propertyID, geocode, favorite }) => {
              this.router.navigate(['/', propertyID]);
              this.store.dispatch(
                actions.propertySelected({
                  record: {
                    propertyID,
                    geocode,
                    favorite,
                  },
                })
              );
            }
          );
        });
    });

    this.store.select(selectors.selectPropertySelected).subscribe((property) => {
      property ? this.map.goToMarker(property) : this.map.showAllMarkers();
    });

    this.actions$
      .pipe(
        ofType(actions.toggleFavoriteSuccess),
        tap(() => this.map.toggleFavoriteMarker())
      )
      .subscribe();
  }
}
