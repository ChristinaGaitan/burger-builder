import React from 'react'
import classes from './Button.module.css'

interface Props {
  children: any
  clicked: () => void
  buttonType: string
}

const Button = (props: Props) => (
  <button
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
  </button>
);

export default Button;
