
export const ANALOGS = 'analogs'
export const INTEGERS = 'integers'
export const DIGITALS = 'digitals'
export const ALL = 'ALL'
const ANALOG = 'A'
const DIGITAL = 'D'
const INTEGER = 'I'

export const VALUE = 'V'
export const INDEX = 'I'

export let WRITE_OFFSET = 0 // bylo -1
export let READ_OFFSET = -1 // bylo -2

export function getVariables(func,what = ALL,url='./../config/xml.cgi',vars='A|1|100|D|1|100') {
     new window.Promise((resolve,reject) => {
        let xhr = new window.XMLHttpRequest();
        xhr.open('GET', `${url}?N|${vars}`, true);
        xhr.onreadystatechange = function() { 
        if (xhr.readyState == xhr.DONE && xhr.status == 200)
            resolve(xhr.responseXML)        
        }
        xhr.onerror = function(err) {
        reject(err)    
        }
        xhr.send(null);
     }).then(response => {
       let xml = response;
       console.log(response)
       
       let analogs = xml.querySelectorAll('ANALOG O')
       let digitals = xml.querySelectorAll('DIGITAL O')
       let integers = xml.querySelectorAll('INTEGER O')
        console.log(analogs)
       return {analogs, integers,digitals}
     }).then(res =>{
        switch(what) {
        case ALL: func({values:res,get:_getFuncAll(res),set:_setFuncAll(res)},null);break
        case INTEGERS: func({values:res[INTEGERS],get:_getFunc(res[INTEGERS]),set:_setFunc(res[INTEGERS])},null); break
        case ANALOGS: func({values:res[ANALOGS],get:_getFunc(res[ANALOGS]),set:_setFunc(res[ANALOGS])},null); break
        case DIGITALS: func({values:res[DIGITALS],get:_getFunc(res[DIGITALS]),set:_setFunc(res[DIGITALS])},null); break;
        default: func({values:res,get:_getFuncAll(res),set:_setFuncAll(res)},null); break    
        }
     }).catch( err => {func(what,err)}
            
    )
    
  }

  function _get(func,type) {
  return getVariables(func,type)  
  }

export function getIntegers(func) {
 return _get(func,INTEGERS)   
}
export function getDigitals(func) {
 return _get(func,DIGITALS)   
}
export function getAnalogs(func) {
 return _get(func,ANALOGS)   
}

function pushValue(func,type, index, val, url='./../config/query.cgi') {
return new window.Promise((resolve,reject) =>{
let xhr = new window.XMLHttpRequest()
xhr.open('GET',`${url}?var|${type}|${+index+WRITE_OFFSET}|${val}`) 
xhr.onreadystatechange = (err) => {
if(xhr.readyState == xhr.DONE && xhr.status == 200)    
resolve({val, type, index,offset:WRITE_OFFSET})    
}  
xhr.onerror = (e) => {
reject(e);    
}
xhr.send(null)
})
.then(res => func(res,null))
.catch(res => func({val ,type, index},res))    
}

function _push (func, type, index, val) {
pushValue(func, type, index, val)    
}

export function pushInteger(index, val, func) {
_push(func,INTEGER,index,val)    
}

export function pushDigital(index, val, func) {
_push(func,DIGITAL,index,val)    
}

export function pushAnalog(index, val, func) {
_push(func,ANALOG,index,val)    
}

function _getFunc(values) {
let types = [INDEX,VALUE]    
return (index) => {
    if(index > values.length-1) return null
        return values[index+READ_OFFSET].attributes[types.indexOf(VALUE)].nodeValue }   
}
function _getFuncAll(values) {
let types = [ANALOG,INTEGER,DIGITAL]
let subtypes = [INDEX,VALUE]  
return (what,index) => {
    if(types.indexOf(what) < 0 || index > values[types.indexOf(what)].length-1 ) return null
    return values[types.indexOf(what)][index+READ_OFFSET].attributes[subtypes.indexOf(VALUE)].nodeValue
}
}

function _setFunc(values) {
let types = [INDEX,VALUE]    
return (index, value) => {
    if(index > values.length-1) return false
        values[index+READ_OFFSET].attributes[types.indexOf(VALUE)].nodeValue = value
        return {value:values[index+READ_OFFSET].attributes[types.indexOf(VALUE)],index: values[index+READ_OFFSET].attributes[types.indexOf(INDEX)]}   
}}
function _setFuncAll(values) {
let types = [ANALOG,INTEGER,DIGITAL]
let subtypes = [INDEX,VALUE]  
return (what,index, value) => {
    if(types.indexOf(what) < 0 || index > values[types.indexOf(what)].length-1 ) return false
    values[types.indexOf(what)][index+READ_OFFSET].attributes[subtypes.indexOf(VALUE)].nodeValue = value    
    return true
}
}