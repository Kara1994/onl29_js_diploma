import { getProducts } from '../api'
import {
  getCardTemplate,
  getDataFromLocalStorage,
  logError,
  saveToLocalStorage,
} from './utils'
import { BUSKET_KEY, PRODUCTS_KEY } from './constants'

const init = () => {
  const notification = document.querySelector('#notification')
  const loader = document.querySelector('#loader')
  const products = document.querySelector('#main-products')
  const productsCards = document.querySelector('#main-products-cards')
  const banner = document.querySelector('#close-ya-banner')

  if (getDataFromLocalStorage(BUSKET_KEY)) notification?.classList?.add('fill')

  const closeYaBanner = () => {
    const element = document.querySelector('#ya-banner')
    if (element) element.style.display = 'none'
  }

  const addProductToBusket = (event) => {
    const basketId = event.target.dataset.busketId

    if (basketId) {
      notification?.classList?.add('fill')
      const busket = getDataFromLocalStorage(BUSKET_KEY) || []
      saveToLocalStorage(BUSKET_KEY, [...busket, basketId])
    }
  }

  banner.addEventListener('click', closeYaBanner)

  const dataFromLocalStorage = getDataFromLocalStorage(PRODUCTS_KEY)

  if (!dataFromLocalStorage) {
    loader.style.display = 'block'

    getProducts('users')
      .then((data) => {
        loader.style.display = 'none'

        if (Array.isArray(data)) {
          saveToLocalStorage(PRODUCTS_KEY, data)

          let cards = ''
          data.forEach(card => cards += getCardTemplate(card))
          productsCards.innerHTML = cards
          products.style.display = 'block'
        }
      })
      .catch((error) => {
        loader.style.display = 'none'
        logError(error)
      })
  } else {
    let cards = ''
    dataFromLocalStorage.forEach(card => cards += getCardTemplate(card))
    productsCards.innerHTML = cards
    products.style.display = 'block'
  }

  productsCards.addEventListener('click', addProductToBusket)
}

window.addEventListener('load', init)
