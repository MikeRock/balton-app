import React, {PropTypes} from 'react'
import css from './styles.css'
import {Form, InputGroup, FormControl,FormGroup, Button} from 'react-bootstrap'
import * as Lang from './../../localization/lang-pl'
import styleable from 'react-styleable'

function SchedulerItem ({name,key, style, index, hourStart, hourStop, minuteStart, minuteStop, onChange, onSubmit, mod, unmod}) {
const ANALOG = "analogs", DIGITALS="digitals", INTEGERS="integers"
let hourRefStart, minuteRefStart, hourRefStop, minuteRefStop 
let visible = false
function  getValidationState(target) {
return (!isNaN(target) && /(\d+(\.\d+)?)/.test(target))  ? "success" : "error" }

function handleSubmit(e){
e.preventDefault()    
if([minuteStart,hourStart,minuteStop,hourStop].some(item => getValidationState(item) === "error")) return false
onSubmit("ANALOG",index.hour.start,hourRefStart.value)
onSubmit("ANALOG",index.minute.start,minuteRefStart.value)
onSubmit("ANALOG",index.hour.stop,hourRefStop.value)
onSubmit("ANALOG",index.minute.stop,minuteRefStop.value)                
}

function handleChange(e){       
onChange({value:mod(hourRefStart.value),index: index.hour.start,type:ANALOG})
onChange({value:mod(minuteRefStart.value), index: index.minute.start,type:ANALOG})
onChange({value:mod(hourRefStop.value),index: index.hour.stop,type:ANALOG})
onChange({value:mod(minuteRefStop.value), index: index.minute.stop,type:ANALOG})  
}

    return (
<tr style={style} className="scheduleItem" onClick={(e) => {e.preventDefault(); !visible}}>
<td>{name}</td>
<td>
<Form inline>
<span style={{marginRight:"10px", marginLeft:"10px" }}>{Lang.START}</span> 
<FormGroup controlId="formBasicText1" 
           validationState={getValidationState(hourStart)}>
    <InputGroup>  
      <InputGroup.Addon>H</InputGroup.Addon>  
           <FormControl type="text"
               inputRef={(ref) => {hourRefStart=ref}}
               value={unmod(hourStart)}
               placeholder={Lang.PLACEHOLDER_HOUR}
               onChange={handleChange}>
      </FormControl>
    </InputGroup>
    <FormControl.Feedback />
 </FormGroup>
 <span style={{marginRight: "6px"}}></span>     
<FormGroup controlId="formBasicText2"
           validationState={getValidationState(minuteStart)}>
    <InputGroup>
     <InputGroup.Addon>M</InputGroup.Addon>
           <FormControl   type="text"
               inputRef={(ref) => {minuteRefStart=ref}}
               value={unmod(minuteStart)}
               placeholder={Lang.PLACEHOLDER_MINUTE}
               onChange={handleChange}>
      </FormControl>   
    </InputGroup>
    <FormControl.Feedback />
</FormGroup>
</Form>
<div style={{marginTop:"10px"}}></div>
<Form inline>
<span style={{marginRight:"10px",marginLeft:"10px" }}>{Lang.STOP}</span> 
<FormGroup controlId="formBasicText1" 
           validationState={getValidationState(hourStop)}>
    <InputGroup>  
      <InputGroup.Addon>H</InputGroup.Addon>  
           <FormControl type="text"
               inputRef={(ref) => {hourRefStop=ref}}
               value={unmod(hourStop)}
               placeholder={Lang.PLACEHOLDER_HOUR}
               onChange={handleChange}>
      </FormControl>
    </InputGroup>
    <FormControl.Feedback />
 </FormGroup>
<span style={{marginRight: "6px"}}></span>           
<FormGroup controlId="formBasicText2"
           validationState={getValidationState(minuteStop)}>
    <InputGroup>
     <InputGroup.Addon>M</InputGroup.Addon>
           <FormControl   type="text"
               inputRef={(ref) => {minuteRefStop=ref}}
               value={unmod(minuteStop)}
               placeholder={Lang.PLACEHOLDER_MINUTE}
               onChange={handleChange}>
      </FormControl>   
    </InputGroup>
    <FormControl.Feedback />
</FormGroup> 
<Button style={{marginLeft:"10px"}} disabled={[hourStart, minuteStart, hourStop, minuteStop].some(item => getValidationState(item) === "error" )} onClick={handleSubmit}>{Lang.SET}</Button>    
</Form>
</td>
</tr>    
)    }

SchedulerItem.propTypes = {
hourStart: PropTypes.string.isRequired,
minuteStart: PropTypes.string.isRequired,
hourStop: PropTypes.string.isRequired,
minuteStop: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
onSubmit: PropTypes.func.isRequired,
mod: PropTypes.func,
unmod: PropTypes.func,
name: PropTypes.string,
key: PropTypes.string.isRequired,
index: PropTypes.shape({hour:PropTypes.shape({start:PropTypes.any,stop:PropTypes.any}),
                        minute:PropTypes.shape({start:PropTypes.any,stop:PropTypes.any})}).isRequired    
}

SchedulerItem.defaultProps = {
mod: (val) => val,
unmod: (val) => val   
}

export default styleable(css)(SchedulerItem)
