import { BASE_URL } from '../static/constants'

export const getProducts = (product, limit = 20, delay = 1000) => {
  const data = fetch(`${BASE_URL}/${product}?_limit=${limit}`)
    .then(data => data.json())

  return new Promise((res) => {
    setTimeout(() => {
      res(data)
    }, delay)
  })
}
