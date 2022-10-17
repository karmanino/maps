import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const modules = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatSliderModule,
  MatCheckboxModule,
  BrowserAnimationsModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: [CommonModule],
  exports: [...modules],
})
export class MaterialUiModule {}
