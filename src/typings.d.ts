declare global {
  interface Window {
    env: {
      production?: trring;
      environment?: string;
      plantGrowthUrl?: string;
      authorityUrl?: string;
      authorityRealm?: string;
      authorityClientId?: string;
    };
  }
}

export {};
