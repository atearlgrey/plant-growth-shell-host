import Keycloak from 'keycloak-js';
import { environment } from '../environments/environment';

export default new Keycloak({
  url: environment.authorityUrl, // URL Keycloak server
  realm: environment.authorityRealm, // Tên realm
  clientId: environment.authorityClientId, // Client ID bạn đã tạo
});
