import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png' // Returns an string with route to burger logo
import classes from './Logo.module.css'

interface Props {

}

const Logo = (props: Props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo}></img>
  </div>
)

export default Logo;
