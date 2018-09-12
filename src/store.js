import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//import tasks, { setTasksAction } from './state/tasks'
//import auth, { initAuthStateListening } from './state/auth'
import targets from './state'
const reducer = combineReducers({
    target: targets
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)


// store.dispatch(initAuthStateListening())