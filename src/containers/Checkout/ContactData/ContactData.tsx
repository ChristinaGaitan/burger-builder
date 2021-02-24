import React, { Component, MouseEvent } from 'react'
import Button from '../.../../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import { RouteComponentProps } from 'react-router-dom'

interface Ingrediente {
  [key: string]: number
}

interface Props extends RouteComponentProps{
  ingredients: Ingrediente,
  totalPrice: number
}

class ContactData extends Component<Props> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    ingredients: {},
    totalPrice: 0,
    loading: false
  }

  orderHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    this.setState({loading: true})

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
    .then(response =>{
      this.setState({
        loading: false
      })

      this.props.history.push('/')
    })
    .catch(error =>
      this.setState({
        loading: false
      })
    )
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type='text' name='name' placeholder='Your name' />
        <input className={classes.Input} type='email' name='email' placeholder='Your email' />
        <input className={classes.Input} type='text' name='street' placeholder='Street' />
        <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
        <Button buttonType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    )

    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        { form }
      </div>
    )
  }
}

export default ContactData
