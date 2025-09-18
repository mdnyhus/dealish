export const POSTAL_CODE_REGEX = /^\w\d\w\s?\d\w\d$/i;

export const POSTAL_CODE_QUERY_PARAM = 'postalCode';

export function validPostalCode(code: string) {
  return POSTAL_CODE_REGEX.test(code);
}

// Format postal code for URL: uppercase + no space
export function formatPostalCodeForUrl(code: string) {
  if (!validPostalCode(code)) {
    return code;
  }
  return code.toUpperCase().replace(/\s+/g, '');
}

// Format postal code for title: uppercase + space
export function formatPostalCodeForTitle(code: string) {
  if (!validPostalCode(code)) {
    return code;
  }
  const urlStr = formatPostalCodeForUrl(code);
  return `${urlStr.substring(0, 3)} ${urlStr.substring(3)}`;
}
