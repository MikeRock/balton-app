import * as Action from './../actions'
export default function (store={analogs:{},integers:{},digitals:{},change:'NONE'},action) {
switch (action.type)
{
case Action.FETCH_FAILED:
console.log('Data failed') 
return Object.assign({},store) 
case Action.FETCH_SUCCESS: {
console.log('Data fetched')    
return Object.assign({},store,{analogs: action.data}) }
case Action.FETCH_SUCCESS_ANALOG: {
console.log('Data fetched')    
return Object.assign({},store,{analogs: action.data}) }
case Action.FETCH_SUCCESS_DIGITAL: {
console.log('Data fetched')    
return Object.assign({},store,{digitals: action.data}) }
case Action.FETCH_SUCCESS_INTEGER: {
console.log('Data fetched')    
return Object.assign({},store,{integers: action.data}) }
case Action.VALUE_CHANGE_FAILED:
return Object.assign({},store,{change:'FAILED'})
case Action.VALUE_CHANGE_SUCCESS:
return Object.assign({},store,{change:'SUCCESS'})
case Action.OP_VALUE_CHANGE:{
return Object.assign({},action.data)
}
default: 
return store  
}    
}