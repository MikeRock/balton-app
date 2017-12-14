import React, {PropTypes} from 'react'
import styleable from 'react-styleable'
import css from './styles.css'
import * as Lang from './../../localization/lang-pl'

function StatusItem ({value}) {

function getState(){
switch(value) {
case "0.1": return Lang.ST_UNIT_ON
case "0.2": return Lang.ST_UNIT_OFF_BY_ALARM
case "0.3": return Lang.ST_UNIT_OFF_BY_DC
case "0.4": return Lang.ST_UNIT_OFF_BY_BMS
case "0.5": return Lang.ST_UNIT_OFF_BY_SCHED
case "0.6": return Lang.ST_UNIT_OFF_BY_BIN
case "0.7": return Lang.ST_UNIT_OFF_BY_DS
default:return Lang.NONE

}    
}    
return (
<tr><td>{Lang.STATE}</td> <td><b>{getState()}</b></td></tr>    
)    
}

StatusItem.propTypes = {
value: PropTypes.string.isRequired    
}

export default styleable(css)(StatusItem)