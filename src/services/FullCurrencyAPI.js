const FULL_CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getFullCurrencyApi = async () => {
  const response = await fetch(FULL_CURRENCY_BASE_API);
  const json = await response.json();
  return json;
};

export default getFullCurrencyApi;
