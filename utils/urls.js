const urlsCountries = {
  countryByName: "/api/v1/countrybyname",
  countriesbynames: "/api/v1/countriesbynames",
  allCountries: "/api/v1/allCountries"
};

const urlsUsers = {
  user_register: "/api/v1/user/register",
  user_authenticate: "/api/v1/user/authenticate",
  user_verifyToken: "/api/v1/user/verifyToken",
  user_getUserByToken: "/api/v1/user/getUserByToken",
}

const urlsSlotMachine = {
  getCoins: "/api/v1/getCoins",
  setCoins: "/api/v1/setCoins",
  sortMachine: "/api/v1/sortMachine",
};

const apiUBaseUrlCountries = "https://restcountries.com/v3.1"
const apiUrlsCountries = {
  countryByName: `${apiUBaseUrlCountries}/name/`,
  allCountries: `${apiUBaseUrlCountries}/all/`,
};


module.exports = {
  urlsCountries,
  urlsUsers,
  urlsSlotMachine,
  apiUrlsCountries
};
