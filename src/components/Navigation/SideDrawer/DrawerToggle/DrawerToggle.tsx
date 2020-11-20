import React from 'react'
import classes from './DrawerToggle.module.css'

interface Props {
  clicked: () => void
}

const DrawerToggle = (props: Props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default DrawerToggle
