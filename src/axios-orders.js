import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-lcgt.firebaseio.com/'
})

export default instance;
