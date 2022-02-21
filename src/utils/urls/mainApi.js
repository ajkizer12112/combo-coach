export const mainRoot = "http://localhost:8001/api/v1"

export const genQueryString = (queryObj) => {
    if (queryObj.length === 0) return ""
    const keys = Object.keys(queryObj);
    const queryArr = keys.map(key => `${key}=${queryObj[key]}`);
    let queryString = "?" + queryArr.join("&")
    return queryString
}