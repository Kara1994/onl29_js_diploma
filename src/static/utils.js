export const logError = (error) =>
  console.log(`Oops, Error ============> ${error.message}`)

export const getDataFromLocalStorage = (id) => {
  try {
    return JSON.parse(localStorage.getItem(id))
  } catch (e) {
    logError(e)
    return null
  }
}

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    logError(e)
  }
}

export const getCardTemplate = ({ id, name, address }, isBusket = false) => (
  `<div class="products-card" data-id="${id}">
     <div class="products-card__photo">
         <img src="https://images.wbstatic.net/c246x328/new/22900000/22903474-1.jpg" alt="ad">
     </div>
     <div class="products-card__title">${name}</div>
     <div class="products-card__art">
         ${address?.zipcode}
         <span>${address?.suite}</span>
     </div>
     ${isBusket
        ? ''
        : `<div class="products-card__btn-to-busket" data-busket-id="${id}">B корзину</div>`
     }
  </div>`
)
