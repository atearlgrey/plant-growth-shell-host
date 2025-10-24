import { Injectable } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import keycloak from './keycloak.config';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private refreshInterval?: any;

  async init(): Promise<boolean> {
    try {
      const authenticated = await keycloak.init({
        onLoad: 'login-required', // Tự động login nếu chưa
        pkceMethod: 'S256', // Dùng PKCE
        checkLoginIframe: false, // tránh lỗi refresh iframe
      });

      if (authenticated) {
        this.setupTokenRefresh();
      }

      return authenticated;
    } catch (error) {
      console.error('Keycloak init failed', error);
      return false;
    }
  }

  getToken(): string | undefined {
    return keycloak.token;
  }

  getProfile(): Promise<KeycloakProfile> {
    return keycloak.loadUserProfile();
  }

  logout(): void {
    keycloak.logout({ redirectUri: window.location.origin });
  }

  private setupTokenRefresh(): void {
    this.refreshInterval = setInterval(() => {
      keycloak
        .updateToken(60)
        .then((refreshed) => {
          if (refreshed) console.log('Token refreshed');
        })
        .catch(() => {
          console.error('Token refresh failed, logging out');
          this.logout();
        });
    }, 30000);
  }
}
