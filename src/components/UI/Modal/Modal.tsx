import React, { Component } from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

interface Props {
  show: boolean
  children: any
  modalClosed: () => void
}

interface State {

}
class Modal extends Component <Props, State> {
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  // componentDidUpdate() {
  //   console.log('========== Modal will update')
  // }

  render() {
    return(
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
        }}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}
export default Modal;
