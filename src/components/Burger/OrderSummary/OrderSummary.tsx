import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

interface Ingrediente {
  [key: string]: number
}

interface Props {
  price: number
  ingredients: Ingrediente
  purchaseCancel: () => void
  purchaseContinue: () => void
}

const OrderSummary = (props: Props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((ingredientKey) => {
  return (
    <li key={ingredientKey}>
      <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
    </li>)
  })

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        { ingredientsSummary }
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button buttonType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
      <Button buttonType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
  )
}

export default OrderSummary
