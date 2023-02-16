const parseQueryString = (queryStr: string | null | undefined) => {
  if (typeof queryStr !== 'string') {
    return {};
  }

  const parts = queryStr.split('&');
  return parts.reduce((params: { [key: string]: any }, part: string) => {
    const keyValuePair = part.split('=');
    if (keyValuePair.length === 0) {
      return params;
    }

    const key = (keyValuePair[0] || '').trim();
    let value: string | boolean;

    if (keyValuePair.length === 1) {
      value = true;
    } else {
      value = (keyValuePair[1] || '').trim();
      const lowerCaseValue = value.toLowerCase();
      if (lowerCaseValue === 'false') {
        value = false;
      } else if (lowerCaseValue === 'true') {
        value = true;
      }
    }

    params[key] = value;
    return params;
  }, {});
}

export default parseQueryString;
