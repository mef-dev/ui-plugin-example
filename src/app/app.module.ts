import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      // The platform serves the plugin under a namespace-based path;
      // the base href is resolved at runtime by the connector.
      provide: APP_BASE_HREF,
      useFactory: PlatformHelper.getAppBasePath,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
