
var countriesData = require('country-list');

const formattedCountries = countriesData.getData().map((country: any) => ({
  value: country.name,
  label: country.name, // You can use the same value for label or customize it as needed.
}));
  
  const useCountries = () => {
    const getAll = () => formattedCountries;
  
    const getByValue = (value: string) => {
      return formattedCountries.find((item: any) => item.value === value);
    };
  
    return {
      getAll,
      getByValue,
    };
  };
  
  export default useCountries;
