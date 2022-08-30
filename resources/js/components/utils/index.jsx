/**
 * 指定した型定義のキーとその値をセットにし、URLSearchParamsのappendを行う
 * @param { [keyof T, string][] } pairs - タプルの配列
 * @returns { URLSearchParams }
 */
export const createURLSearchParams = (pairs) => {
  const params = new URLSearchParams()
  pairs.map((pair) => params.append(pair[0].toString(), pair[1]))
  return params
}