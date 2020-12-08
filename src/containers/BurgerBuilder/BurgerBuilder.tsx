import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

interface Ingrediente {
  [key: string]: number
}

interface IngredienteDisabled {
  [key: string]: boolean
}

interface State {
  ingredients: Ingrediente,
  totalPrice: number
  purchaseable: boolean
  purchasing: boolean
  loading: boolean
}

const INGREDIENT_PRICES: Ingrediente = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false
  } as State

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Christina Gaitan',
        address: {
          street: 'Teststreet 1',
          zipCode: '12345',
          country: 'Germany'
        },
        emai: 'test@test.com'
      },
      delivery: 'fastest'
    }

    axios.post('/orders.json', order)
    .then(response =>
      this.setState({
        loading: false,
        purchasing: false
      })
    )
    .catch(error =>
      this.setState({
        loading: false,
        purchasing: false
      })
    )
  }

  updatePurchaseState = () => {
    const ingredients = { ...this.state.ingredients }

    const sum = Object.keys(ingredients).map(ingredientKey => {
      return ingredients[ingredientKey]
    }).reduce((sum, el) => { return sum + el; }, 0)

    this.setState({purchaseable: sum > 0})
  }

  addIngrediantHandler = (type: keyof State) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    }, () => {
      this.updatePurchaseState()
    })
  }

  removeIngrediantHandler = (type: keyof State) => {
    const oldCount = this.state.ingredients[type];

    if(oldCount <= 0) { return; }

    const updatedCount = oldCount - 1;

    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    }, () => {
      this.updatePurchaseState()
    })
  }

  render() {
    const disabledInfo: IngredienteDisabled = {}

    for (let key in this.state.ingredients) {
      disabledInfo[key] = this.state.ingredients[key] <= 0
    }

    let orderSummary = <OrderSummary
                        price={this.state.totalPrice}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}
                        />
    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          { orderSummary }
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngrediantHandler}
          ingredientRemoved={this.removeIngrediantHandler}
          disabled={disabledInfo}
          purchasable={!this.state.purchaseable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler} />
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
