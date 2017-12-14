import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
//import Container from './Container'
import Balton from './Balton'
import Centrala from './Centrala'
import thunk from 'redux-thunk'
import reducer from './reducers'
import * as Action from './actions.js'
import {getAnalogs, getDigitals} from './pco'

const store = createStore(reducer,applyMiddleware(thunk))

const TIMEOUT = 30000

function getQuery() {
let query = window.location.search
let sliced = query.slice(1).split('=') || []
let format = {}
sliced.forEach((item,index) => { if(index % 2 == false) Object.assign(format,{[sliced[index]]:sliced[index+1] })})    
return format
}

function setState(){
store.dispatch(function(dispatch){
getAnalogs((res,err) => {  
if (err) {console.log(err);  dispatch({type:Action.FETCH_FAILED})}
else dispatch({type:Action.FETCH_SUCCESS_ANALOG,data: res})
})
getDigitals((res,err) => {  
if (err) {console.log(err);  dispatch({type:Action.FETCH_FAILED})}
else dispatch({type:Action.FETCH_SUCCESS_DIGITAL,data: res})
})
})}
//setState()
setInterval(setState,TIMEOUT)


ReactDOM.render((
<Provider store = {store}>
    <Balton />
</Provider>    
),document.getElementById('app'))