import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import dailyReducer from "./dailyReducer"
import workReducer from "./workReducer"

const reducers = combineReducers({
    dailyReducer,
    workReducer
})


function configureStore(){
    return createStore(reducers,applyMiddleware(thunk))
}

export default configureStore