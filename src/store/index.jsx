import { createStore, combineReducers,applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import * as userData from './user/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
    combineReducers({...userData}),
    applyMiddleware(...middleware),
    composeWithDevTools()
)

// 每次 state 更新时，打印日志
store.subscribe(() =>
  console.log(store.getState())
)

export default store