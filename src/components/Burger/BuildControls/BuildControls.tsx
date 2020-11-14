import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

interface Props {
  price: number
  ingredientAdded: Function
  ingredientRemoved: Function
  ordered: () => void
  purchasable: boolean
  disabled: {
    [key: string]: boolean
  }
}

const BuildControls = (props: Props) => (
  <div className={classes.BuildControls}>
    <p>Current price: <strong>{props.price.toFixed(2)}</strong> </p>
    {
      controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]} />
      ))
    }

    <button
      disabled={props.purchasable}
      className={classes.OrderButton}
      onClick={props.ordered}>ORDER NOW</button>
  </div>
)

export default BuildControls;
