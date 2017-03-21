import { combineReducers } from 'redux'
import { reducer as ReduxFormReducer } from 'redux-form'
import diskReduer from './diskReducer'

const rootReducer = combineReducers({
  server: combineReducers({
    disk: diskReduer
  }),
  client: {},
  form: ReduxFormReducer
})

export default rootReducer
