import React from 'react'
import classes from './NavigationItem.module.css'

interface Props {
  children: any
  link: string
  active?: boolean
}

const NavigationItem = (props: Props) => (
  <li className={classes.NavigationItem}>
    <a
      href={props.link}
      className={props.active ? classes.active : ''}
    >
      {props.children}
    </a>
  </li>
);

export default NavigationItem
