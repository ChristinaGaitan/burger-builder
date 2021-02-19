import React, { Component, MouseEvent } from 'react'
import Button from '../.../../../../components/UI/Button/Button'
import classes from './ContactData.module.css'

interface Ingrediente {
  [key: string]: number
}

interface Props {
  ingredients: Ingrediente
}

class ContactData extends Component<Props> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  orderHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('========= ingredients', this.props.ingredients)
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={classes.Input} type='text' name='name' placeholder='Your name' />
          <input className={classes.Input} type='email' name='email' placeholder='Your email' />
          <input className={classes.Input} type='text' name='street' placeholder='Street' />
          <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
          <Button buttonType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactData
