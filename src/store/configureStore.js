import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'
import diskSagas from '../sagas/diskSagas'

const sagaMiddleware = createSagaMiddleware()

export default () => {
  // 启用调试工具
  const enhancers = []
  const devToolsExtension = window.devToolsExtension
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
  // 创建 store
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(sagaMiddleware),
      ...enhancers
    )
  )
  sagaMiddleware.run(diskSagas)
  return store
}
