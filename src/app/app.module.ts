
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TRANSLATE_HTTP_LOADER_CONFIG, TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app.routing";
import { DummyHostModule } from "./dummy-host/dummy-host.module";

import { RemoteConfigService } from "../services/remote-config.service";

import { AppComponent } from "./app.component";

export function initRemoteConfig(remoteCfg: RemoteConfigService) {
  return () => remoteCfg.load(); // chạy load manifest.json trước khi app start
}


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
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
        deps: [HttpClient]
      }
    }),
    DummyHostModule,
  ],
  providers: [
    RemoteConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initRemoteConfig,
      deps: [RemoteConfigService],
      multi: true
    },
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: './assets/i18n/',
        suffix: '.json'
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
