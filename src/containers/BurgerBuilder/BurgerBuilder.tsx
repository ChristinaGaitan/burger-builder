import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
    purchasing: false
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
    alert('You continue!')
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

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
            />
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

export default BurgerBuilder
