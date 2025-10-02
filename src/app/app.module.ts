
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { RemoteConfigService } from "../services/RemoteConfigService";
import { DummyHostComponent } from "./dummy-host/dummy-host.component";
import { DummyHostModule } from "./dummy-host/dummy-host.module";

export function initRemoteConfig(remoteCfg: RemoteConfigService) {
  return () => remoteCfg.load(); // chạy load manifest.json trước khi app start
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    DummyHostModule
  ],
  declarations: [AppComponent],
  providers: [
    RemoteConfigService,
    { 
      provide: APP_INITIALIZER, 
      useFactory: initRemoteConfig, 
      deps: [RemoteConfigService], 
      multi: true 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
