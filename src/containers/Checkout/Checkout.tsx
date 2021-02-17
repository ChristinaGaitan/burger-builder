import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

interface Ingrediente {
  [key: string]: number
}

interface Props extends RouteComponentProps {

}

interface State {
  ingredients: Ingrediente
}

class Checkout extends Component<Props, State> {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  } as State

  componentDidMount() {
    const paramsString = this.props.history.location.search
    const searchParams = new URLSearchParams(paramsString);

    const ingredients: Ingrediente = {}
    for(let param of searchParams.entries()) {
      ingredients[param[0]] = parseInt(param[1])
    }

    this.setState({ingredients: ingredients})
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    )
  }
}

export default Checkout;
