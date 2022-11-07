const urlsCountries = {
  countryByName: "/api/v1/countrybyname",
  countriesbynames: "/api/v1/countriesbynames"
};

const apiUBaseUrlCountries = "https://restcountries.com/v3.1"
const apiUrlsCountries = {
  countryByName: `${apiUBaseUrlCountries}/name/`,
  allCountries: `${apiUBaseUrlCountries}/all/`,
};


module.exports = {
  urlsCountries,
  apiUrlsCountries
};