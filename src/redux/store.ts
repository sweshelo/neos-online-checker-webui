import { applyMiddleware, createStore, compose, StoreEnhancer } from "redux"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"
import persistState from "redux-localstorage"

import rootReducer from "./reducer"
import rootSaga from "./saga"

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const localstorageEnhancer = compose(persistState())
  const enhancers = [
    middlewareEnhancer,
    localstorageEnhancer,
  ] as StoreEnhancer[]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, composedEnhancers)

  sagaMiddleware.run(rootSaga)
  return store
}
