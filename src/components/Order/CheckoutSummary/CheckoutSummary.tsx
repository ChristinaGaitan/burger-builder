import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

interface Ingrediente {
  [key: string]: number
}

interface Props {
  ingredients: Ingrediente
  checkoutCancelled: () => void
  checkoutContinued: () => void
}

const CheckoutSummary = (props: Props) => {
  return(
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.checkoutCancelled} buttonType='Danger'>CANCEL</Button>
      <Button clicked={props.checkoutContinued} buttonType='Success'>CONTINUE</Button>
    </div>
  )
}

export default CheckoutSummary;
