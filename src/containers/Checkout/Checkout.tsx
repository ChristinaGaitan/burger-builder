import React, { Component } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

interface Ingrediente {
  [key: string]: number
}

interface Props extends RouteComponentProps {

}

interface State {
  ingredients: Ingrediente
  totalPrice: number
}

class Checkout extends Component<Props, State> {
  state = {
    ingredients: {},
    totalPrice: 0
  } as State

  componentWillMount() {
    const paramsString = this.props.history.location.search
    const searchParams = new URLSearchParams(paramsString);

    const ingredients: Ingrediente = {}
    let price = 0
    for(let param of searchParams.entries()) {
      if(param[0] === 'totalPrice') {
        price = parseFloat(param[1])
      } else {
        ingredients[param[0]] = parseInt(param[1])
      }
    }

    this.setState({ingredients: ingredients, totalPrice: price})
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
        <Route path={this.props.match.path + '/contact-data'}
          render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)} />
      </div>
    )
  }
}

export default Checkout;
