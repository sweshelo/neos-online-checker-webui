import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "./reducer"
import rootSaga from "./saga"

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, composedEnhancers)

  sagaMiddleware.run(rootSaga)
  return store
}
