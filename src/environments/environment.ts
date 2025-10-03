export const environment = {
  production: window?.env?.production === 'true' ? true : false,
  environment: window?.env?.environment ?? 'development',
  plantGrowthUrl: window?.env?.plantGrowthUrl ?? 'http://localhost:4301',
};
