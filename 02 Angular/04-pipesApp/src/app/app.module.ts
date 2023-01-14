import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';
import { VentasModule } from './ventas/ventas.module';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';

// Cambiar el locale de la app
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es-MX";
import localeFr from "@angular/common/locales/fr";
registerLocaleData(localeEs);
registerLocaleData(localeFr);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    SharedModule,
    VentasModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-MX" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
