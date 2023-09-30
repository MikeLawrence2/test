import React from 'react'

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  adress: '',
  addItem: (item) => {},
  removeItem: (id) => {},
  addAdress: () => {},
})

export default CartContext
