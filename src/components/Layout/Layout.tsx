import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

interface State {
  showSideDrawer: boolean
}

interface Props {
  children: any
}

class Layout extends Component<Props, State> {
  state = {
    showSideDrawer: true
  } as State

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false})
  }

  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
