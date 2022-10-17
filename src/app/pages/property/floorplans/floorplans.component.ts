import { Component, Input, OnInit } from '@angular/core';
import { Floorplan, PropertyInfo } from '@interfaces/property-info.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.reducer';
import * as selectors from '@store/selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-floorplans',
  templateUrl: './floorplans.component.html',
  styleUrls: ['./floorplans.component.scss'],
})
export class FloorplansComponent implements OnInit {
  propertyInfo!: PropertyInfo;
  floorplans: Floorplan[] = [];
  layoutView = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(selectors.selectPropertyFullDetail)
      .pipe(take(1))
      .subscribe((propertyInfo) => {
        this.propertyInfo = propertyInfo!;
        this.floorplans = this.propertyInfo.floorplans;
      });
  }

  viewLayout(selected: Floorplan) {
    if (!this.layoutView) {
      this.floorplans = [selected];
      this.layoutView = true;
    } else {
      this.floorplans = this.propertyInfo.floorplans;
      this.layoutView = false;
    }
  }
}
