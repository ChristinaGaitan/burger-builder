import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
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

class OrderSummary extends Component<Props> {
  // componentDidUpdate() {
  //   console.log('========== Order Summery will update')
  // }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map((ingredientKey) => {
      return (
        <li key={ingredientKey}>
          <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
        </li>)
    })

    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          { ingredientsSummary }
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button buttonType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
        <Button buttonType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary
