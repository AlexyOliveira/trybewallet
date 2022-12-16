const CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencyApi = async () => {
  const response = await fetch(CURRENCY_BASE_API);
  const json = await response.json();
  const currenciesKeys = Object.keys(json).filter(
    (currency) => currency !== 'USDT',
  );
  return currenciesKeys;
};

export default getCurrencyApi;
