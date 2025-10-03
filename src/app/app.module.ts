import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TRANSLATE_HTTP_LOADER_CONFIG, TranslateHttpLoader } from '@ngx-translate/http-loader';

import Aura from '@primeng/themes/aura';

import { ButtonModule } from 'primeng/button';
import { providePrimeNG } from 'primeng/config';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { RemoteConfigService } from '../services/remote-config.service';
import { DummyHostModule } from './dummy-host/dummy-host.module';

export function initRemoteConfig(remoteCfg: RemoteConfigService) {
  return () => remoteCfg.load(); // chạy load manifest.json trước khi app start
}

export function HttpLoaderFactory(): TranslateHttpLoader {
  return new TranslateHttpLoader();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    DummyHostModule,
    ButtonModule,
    PanelMenuModule,
  ],
  providers: [
    RemoteConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initRemoteConfig,
      deps: [RemoteConfigService],
      multi: true,
    },
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: './assets/i18n/',
        suffix: '.json',
      },
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
