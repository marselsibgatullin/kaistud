export const setIntoUrl = (urlParams: URLSearchParams, obj: any, key: any) => {
  if (Array.isArray(obj[key])) {
    obj[key].forEach((val: any) => {
      urlParams.append(`${key}[]`, String(val))
    })
  }
  else if (obj[key] || obj[key] === 0 || obj[key] === false) {
    urlParams.append(key, String(obj[key]))
  }
}