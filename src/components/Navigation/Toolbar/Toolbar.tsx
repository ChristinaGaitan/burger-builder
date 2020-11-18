import React from 'react'
import classes from './Toolbar.module.css'

interface Props {

}

const Toolbar = (props: Props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <div>LOGO</div>
    <nav>
      ...
    </nav>
  </header>
)

export default Toolbar;
