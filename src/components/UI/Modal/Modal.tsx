import React from 'react'
import classes from './Modal.module.css'

interface Props {
  children: any
}

const Modal = (props: Props) => (
  <div className={classes.Modal}>
    {props.children}
  </div>
)

export default Modal;
