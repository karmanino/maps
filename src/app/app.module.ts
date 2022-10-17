import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from '@store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from '@store/effects';

import { environment } from '@env/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from '@pages/pages.module';
import { MaterialUiModule } from '@shared/material-ui.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PagesModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(EffectsArray),
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MaterialUiModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
