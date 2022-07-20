import {getCardTemplate, getDataFromLocalStorage, saveToLocalStorage} from './utils'
import { BUSKET_KEY, PRODUCTS_KEY } from './constants'

const init = () => {
  const notification = document.querySelector('#notification')
  const myProducts = document.querySelector('#my-products')
  const clearBusketBtn = document.querySelector('#clear-busket')

  let cardsToRender = []
  const myBusket = getDataFromLocalStorage(BUSKET_KEY)

  if (myBusket) {
    notification?.classList?.add('fill')
    clearBusketBtn.style.display = 'block'

    clearBusketBtn.addEventListener('click', () => {
      saveToLocalStorage(BUSKET_KEY, null)
      notification?.classList?.remove('fill')
      clearBusketBtn.style.display = 'none'
      myProducts.innerHTML = `<div class="empty-list">Ваша корзина пуста</div>`
    })

    const products = getDataFromLocalStorage(PRODUCTS_KEY)

    myBusket.forEach(el => cardsToRender.push(products.find(product => product.id === Number(el))))

    let cards = ''
    cardsToRender.forEach(card => cards += getCardTemplate(card, true))
    myProducts.innerHTML = cards
  } else {
    myProducts.innerHTML = `<div class="empty-list">Ваша корзина пуста</div>`
  }
}

window.addEventListener('load', init)
