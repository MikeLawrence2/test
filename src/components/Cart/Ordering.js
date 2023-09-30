import { Fragment, useContext, useState } from 'react'
import CartContext from '../../store/cart-context'

const Ordering = () => {
  const [enteredAdress, setEnteredAdress] = useState('')
  const [hasError, setHasError] = useState(null)
  // const [touched, setTouched] = useState('')
  // const [disabled, setDisabled] = useState(true)

  const cartCtx = useContext(CartContext)

  const onChangeAdress = (event) => {
    setEnteredAdress(event.target.value)
    if (event.target.value.trim() !== '') {
      setHasError(false)
    }
  }
  const onBlur = () => {
    // setTouched(true)
    if (enteredAdress.trim() === '') {
      setHasError(true)
    }
  }
  // if (enteredAdress.trim() !== '') {
  //   setDisabled(false)
  // }
  const onSubmit = (event) => {
    event.preventDefault()

    cartCtx.addAdress(enteredAdress)

    fetch('https://erg35tews-default-rtdb.firebaseio.com/cart.json', {
      method: 'POST',
      body: JSON.stringify({
        adress: cartCtx.adress,
        totalAmount: cartCtx.totalAmount,
        items: cartCtx.items,
        // itemAmount: cartCtx.items.amount,
      }),
    })
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <label htmlFor='adress'>Enter your adress</label>
        <input
          id='adress'
          onChange={onChangeAdress}
          value={enteredAdress}
          onBlur={onBlur}
        />
        {hasError && <p>Enter valid adress</p>}
        <button>Order</button>
      </form>
    </Fragment>
  )
}
//disabled={disabled}
export default Ordering
