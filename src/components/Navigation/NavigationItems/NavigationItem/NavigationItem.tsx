import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.module.css'

interface Props {
  children: any
  link: string
  active?: boolean
  exact?: boolean
}

const NavigationItem = (props: Props) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem
