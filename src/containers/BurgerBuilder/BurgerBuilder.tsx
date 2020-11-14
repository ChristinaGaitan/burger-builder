import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

interface Ingredientes {
  [key: string]: number
}

interface IngredientesDisabled {
  [key: string]: boolean
}

interface State {
  ingredients: Ingredientes,
  totalPrice: number
}

const INGREDIENT_PRICES: Ingredientes = {
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
    totalPrice: 4
  } as State

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
    })
  }

  render() {
    const disabledInfo: IngredientesDisabled = {}

    for (let key in this.state.ingredients) {
      disabledInfo[key] = this.state.ingredients[key] <= 0
    }

    return (
      <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngrediantHandler}
            ingredientRemoved={this.removeIngrediantHandler}
            disabled={disabledInfo} />
      </Aux>
    )
  }
}

export default BurgerBuilder