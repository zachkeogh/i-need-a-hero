import React from "react"
import App from './components/app';
import ReactDOM from 'react-dom'

export default () => {
  ReactDOM.hydrate(<App />, document.getElementById('app'))
}