import { Component, OnInit } from '@angular/core';
import { Record } from '@interfaces/records.interface';
import { select, Store } from '@ngrx/store';
import { applyFilter } from '@store/actions';
import { AppState } from '@store/app.reducer';
import { selectFavoritesFilter } from '@store/selectors/records.selectors';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss'],
})
export class FavButtonComponent {
  active = false;

  allRecords: Record[] = [];

  constructor(private store: Store<AppState>) {
    this.store
      .pipe(select(selectFavoritesFilter))
      .subscribe((value) => this.active = !!value);
  }

  toggle() {
    this.active = !this.active;
    this.store.dispatch(
      applyFilter({ filters: { onlyFavorites: this.active } })
    );
  }
}
