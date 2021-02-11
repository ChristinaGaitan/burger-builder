import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngridients/BurgerIngredient'

interface Ingrediente {
  [key: string]: number
}

interface Props {
  ingredients: Ingrediente
}

const burger = (props: Props) => {
  let transformedIngredients: any

  transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])]
      .map((_, index) => {
        return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />;
      })
    })
    .reduce((arr, element) => {
      return arr.concat(element)
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Pleas start adding ingridients!</p>
  }

  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
