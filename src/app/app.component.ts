import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import * as selectors from '@store/selectors';
import { filter, take } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = true;

  constructor(private store: Store<AppState>) {
    this.store
      .select(selectors.selectFullListRecords)
      .pipe(
        filter((list) => list.length > 0),
        take(1)
      )
      .subscribe((_) => {
        this.loading = false;
      });
  }
}
