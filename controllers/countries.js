const UserModel = require('../models/user');
const axios = require('axios');
const { returnSuccess } = require('../utils/httpUtil');
const { apiUrlsCountries } = require('../utils/urls');

exports.getAllCountries = function(req, res) {
  console.log('getAllCountries');
  axios.get(apiUrlsCountries.allCountries)
  .then(response => {
    const countryData = response.data;
    console.log(countryData);
    returnSuccess(res, { countries: getCountriesData(countryData) })
  })
  .catch(error => {
    console.log(error.code);
  });
};

exports.countryByName = function(req, res) {
  console.log('countryByName', req.query.countryName);
  axios.get(apiUrlsCountries.countryByName + req.query.countryName)
  .then(response => {
    const countryData = response.data;
    console.log(countryData);
    returnSuccess(res, { country: getCountriesData(countryData) })
  })
  .catch(error => {
    console.log(error.code);
  });
};

exports.countriesByNames = function(req, res) {    
    console.log('countriesByNames', req.body);
    const countryNames = req.body.countryNames
    axios.get(apiUrlsCountries.allCountries)
    .then(response => {
      const countryData = response.data;
      const countries = getCountriesData(countryData).filter(country => countryNames.includes(country.name))
      returnSuccess(res, { countries })
    })
    .catch(error => {
      console.log(error.code);
    });
};

const getCountriesData = (data) => {
  const getData = (countryData) =>  {
    return { name: countryData.name.common, flag: countryData.flags.svg }
  }
  return data?.length > 1 ? 
          data.map(country => getData(country)).sort((a, b) => compareStrings(a, b, 'name')) :
          getData(data[0]);
}

const compareStrings = (a, b, ref) => {
  let fa = a[ref].toLowerCase(),
      fb = b[ref].toLowerCase();

  if (fa < fb) {
      return -1;
  }
  if (fa > fb) {
      return 1;
  }
  return 0;
}