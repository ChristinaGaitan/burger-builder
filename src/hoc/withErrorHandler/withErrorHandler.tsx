import React, { Component, ComponentType } from 'react'
import { AxiosInstance } from 'axios';
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'

interface Message {
  message: string
}

interface State {
  error: null | Message
}

const withErrorHandler = <Props extends object>(WrappedComponent: ComponentType<Props>, axios: AxiosInstance) => {
  return class extends Component<Props, State> {
    state = {
      error: null
    } as State

    // TODO: Avoid using componentWillMount, I need to find a way of setting state
    // before component renders for the first time
    componentWillMount = () => {
      axios.interceptors.request.use(request => {
        this.setState({error: null})
        return request
      })

      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        this.setState({ error: error })
      })
    }

    errorConfirmHandler = () => {
      this.setState({error: null})
    }

    render () {
      return (
        <Aux>
          <Modal show={!!this.state.error} modalClosed={this.errorConfirmHandler} >
            { this.state.error ? this.state.error?.message : null  }
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler
