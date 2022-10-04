interface ObjectInterface {
	[key: string]: any
	  
	}

	
	/**
	 * Removes object keys with empty values
	 *
	 * @param {Ob} object
	 */

	function DeleteKeyWithEmptyValue(object: ObjectInterface) {
	  for (let key in object) !object[key] && delete object[key];
	}



	/**
	 * Generate url with query parameters from a given list of object.
	 * 
	 * key with  empty value is not part of the resulting url query param
	 *
	 * @param {string} url
	 * @param {ObjectInterface} urlParams
	 * @return {string} result
	 */
	function generateUrl(url:string, urlParams:ObjectInterface) {
	  const newUrl = new URL(url);
	  
	  DeleteKeyWithEmptyValue(urlParams);
	  
	  Object.keys(urlParams).forEach((key) => {
		if (newUrl.searchParams.has(key)) {
		  newUrl.searchParams.set(key, urlParams[key]);
		} else {
		  newUrl.searchParams.append(key, urlParams[key]);
		}
	  });
	  return newUrl.toString();
	}

	
	const urlParams = {
	  width: 360,
	  height: 300,
	  locale: "en",
	  toolbar_bg: "",
	  interval: "3h",
	  pair: "BTC_USD",
	};
	
	
	generateUrl("https://testurl.bitfinx.com", urlParams);
