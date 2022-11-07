const CountriesController = require('../controllers/countries.js');
const { urlsCountries } = require('../utils/urls.js');

module.exports = (app) => {

    app.get(urlsCountries.countryByName, CountriesController.countryByName);
    
    app.post(urlsCountries.countriesbynames, CountriesController.countriesByNames);
    
}
  