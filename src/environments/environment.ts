export const environment = {
  production: window?.env?.production === 'true' ? true : false,
  environment: window?.env?.environment ?? 'development',
  plantGrowthUrl: window?.env?.plantGrowthUrl ?? 'http://localhost:4301',
  authorityUrl: window?.env?.authorityUrl ?? 'http://localhost:8080',
  authorityRealm: window?.env?.authorityRealm ?? 'plant-growth',
  authorityClientId: window?.env?.authorityClientId ?? 'plant-growth-client',
};
