(function (window) {
  window['env'] = window['env'] || {};

  // Environment variables
  window['env']['production'] = '${PRODUCTION}';
  window['env']['environment'] = '${ENVIRONMENT}';
  window['env']['plantGrowthUrl'] = '${PLANT_GROWTH_URL}';
})(this);