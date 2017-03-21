import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'
import RouterDemo from './router/routerDemo'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './style/index.scss'

injectTapEventPlugin({
  shouldRejectClick: () => {
    return true
  }
})

const store = configureStore()

ReactDOM.render(
  <Provider store={store} >
    <div>
      <RouterDemo />
    </div>
  </Provider>,
  document.getElementById('root')
);
