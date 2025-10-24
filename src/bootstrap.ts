import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { KeycloakService } from './keycloak/keycloak.service';

if (environment.production) {
  enableProdMode();
}

const keycloakService = new KeycloakService();
keycloakService.init().then((authenticated) => {
  if (authenticated) {
    platformBrowserDynamic().bootstrapModule(AppModule);
  } else {
    console.error('User not authenticated');
  }
});
