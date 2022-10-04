/**
 *
 * Returns the unit of a volume. It has just this responsibility
 *
 * @return {*}
 */
function getVolumeUnit() {
  return window.APP.util.getSettings("ticker_vol_unit").toUpperCase();
}


/**
 * Initialise default currency list. 
 *
 * @return {Array} []
 */

function initialializeCurrencyList() {
  return window.APP.util.initCurrenciesList();
}


/**
 * Given a volumeUnit, it returns the corresponding element.
 * 
 * With a limited number of volumeUnit, I feel it's okay to make it 
 * an array and do a lookup from there, makes the function a bit faster.
 *
 * @param {string} element
 * @return {string} 
 */
function getElement(element) {
  const volumeUnits = [
    { volumeUnit: "FIRSTCCY", ticker: "#tickervolccy_0" },
    { volumeUnit: "USD", ticker: "tickervolccy_USD" },
    { volumeUnit: "BTC", ticker: "tickervolccy_BTC" },
    { volumeUnit: "ETH", ticker: "tickervolccy_ETH" },
  ];
  const resultElement = volumeUnits.find(
    ({ volumeUnit }) => volumeUnit === element
  );
  if (!resultElement) {
    return null;
  }
  return resultElement.ticker;
}


/**
 * Sets the prop property of element to true
 *
 * @param {*} element
 */
function setElementProp(element) {
  if (element) {
    element.prop("checked", true);
  }
}


/**
 * The initial function was doing too many things by itself.
 * It was refactored, with each function tasked with a single 
 * responsibility.
 * 
 * Now the function is shorter, easy to read and cleaner.
 * 
 * Also, var @result was changed to @initialCurrencyList because it's a bit more
 * intuitive and easy to understand what it stores and stands for.
 * 
 * Also, all variables declared with @var were changed to @const to avoid
 * reassignment which will overwrite a variable value.
 * @return {*}
 *
 *
 */
function volumeSetup() {
  const volumeUnit = getVolumeUnit();
  const element = getElement(volumeUnit);
  setElementProp(element);

  // override currencies list
  const initialCurrencyList = initialializeCurrencyList();
  return initialCurrencyList;
}

