(function (window) {
  window['env'] = window['env'] || {};

  // Environment variables
  window['env']['production'] = '${PRODUCTION}';
  window['env']['environment'] = '${ENVIRONMENT}';
  window['env']['plantGrowthUrl'] = '${PLANT_GROWTH_URL}';
  window['env']['authorityUrl'] = '${AUTHORITY_URL}';
  window['env']['authorityRealm'] = '${AUTHORITY_REALM}';
  window['env']['authorityClientId'] = '${AUTHORITY_CLIENT_ID}';
})(this);