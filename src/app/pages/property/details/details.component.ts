import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { PropertyInfo } from '@interfaces/property-info.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import * as selectors from '@store/selectors';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class OverviewComponent implements OnInit {
  propertyInfo!: Partial<PropertyInfo>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectors.selectPropertyFullDetail)
      .pipe(take(1))
      .subscribe((propertyInfo) => {
        let trimmedPropInfo = { ...propertyInfo };
        delete trimmedPropInfo.floorplans;
        delete trimmedPropInfo.photos;
        delete trimmedPropInfo.thumbnails;
        this.propertyInfo = trimmedPropInfo;
      });
  }
}
