import {connect} from 'react-redux'
import React, {Component} from 'react'
import {SimpleHeader, Card, StatusItem, HoverButton, TableItemSubmit, TableItem, Table, TableItemState, TableItemStateVar, TableItemSignal, TableHeader, SchedulerItem} from './components'
import * as Lang from './localization/lang-pl' 
import {pushAnalog, pushInteger, pushDigital} from "./pco"
import * as Action from "./actions"
import {Panel, Form} from 'react-bootstrap'
import * as Const from './constants'

const ANALOG = "ANALOG"
const DIGITAL = "DIGITAL"
const INTEGER = "INTEGER"

class Centrala extends Component {   
constructor(props) {
super(props)
this.handleScheduleChange = this.handleScheduleChange.bind(this)
this.updateValue = this.updateValue.bind(this)
this.getAlarmDescription = this.getAlarmDescription.bind(this)
this.state = {open:true}
}
componentWillUpdate(nextProps){   
console.log(`Updating container`)     
}

componentWillMount() {
}
componentDidMount() {           
}

getAlarmDescription(slave) {
let {data} = this.props, names = [Lang.AL_BOARD,Lang.AL_FIRE,Lang.AL_W_INLET_COOL,
    Lang.AL_W_OUTLET_COOL,Lang.AL_W_INLET_HEAT,Lang.AL_W_OUTLET_HEAT,Lang.AL_COMPRESSOR]  
if(!data.digitals.get) return ""
return Const.SLAVE_ALARM[slave].map((id,idx) =>  data.digitals.get(id) > 0 ? names[idx] : null)
.filter((id, idx, arr) => arr[idx] != null )[0] || ""
}
handleScheduleChange(d) {
let {data, dispatch} = this.props 
dispatch((dispatch) => {   
if(Object.keys(data[d.type]).length) {   
data[d.type].set(d.index,d.value)
dispatch({type:Action.OP_VALUE_CHANGE,data: data})
}})}

updateValue(type,index,value) {
let {dispatch} = this.props   
//console.log(`Setting ${value}`) 
dispatch((dispatch) => {
switch(type) {
case ANALOG:
pushAnalog(index,value,(res,err) => {   
 if(err) { console.log(err); dispatch({type:Action.VALUE_CHANGE_FAILED}); return}
 dispatch({type: Action.VALUE_CHANGE_SUCCESS})
 console.log(`Set value ${res.val} for ${res.type} on index ${res.index}`)  
}); break
case DIGITAL:
pushDigital(index,value,(res,err) => {
 if(err) { console.log(err); dispatch({type:Action.VALUE_CHANGE_FAILED}); return}
 dispatch({type: Action.VALUE_CHANGE_SUCCESS})
 console.log(`Set value ${res.val} for ${res.type} on index ${res.index}`)     
}); break
case INTEGER:
pushInteger(index,value,(res,err) => {
 if(err) { console.log(err); dispatch({type:Action.VALUE_CHANGE_FAILED}); return}
 dispatch({type: Action.VALUE_CHANGE_SUCCESS})  
 console.log(`Set value ${res.val} for ${res.type} on index ${res.index}`)   
}); break
}    
})}

render() {
let {data} = this.props
let {open} = this.state

return (  
<Card>
    <SimpleHeader name={'Balton Centrala Wentylacyjna'} alarm={data.digitals.values ? data.digitals.get(30) : '0'}/>
    <Table header={false}>
        <TableItemSignal name={Lang.ONOFF_STATE} value={data.digitals.values ? data.digitals.get(34) : '0'}/>    
        <TableItemSubmit name={Lang.ALARM_RESET} 
        index="31"
        button={Lang.RESET}
        type={DIGITAL}
        onSubmit={this.updateValue}
        value="1"/>
    <TableHeader header={Lang.READOUTS} />
    <TableItem name={Lang.OUTLET} value={data.analogs.values ? data.analogs.get(3) : '0'} measure="C" />
    <TableItem name={Lang.INLET} value={data.analogs.values ? data.analogs.get(2) : '0'} measure="C"/>
    <TableItem name={Lang.OUTSIDE} value={data.analogs.values ? data.analogs.get(4) : '0'} measure="C"/>
    <TableItem name={Lang.EXCHANGE} value={data.analogs.values ? data.analogs.get(5) : '0'} measure="C"/>
    <TableItem name={Lang.ELECTRIC_HEATER} value={data.analogs.values ? data.analogs.get(39) : '0'} measure="%"/>
    <TableItem name={Lang.INLET_INVERTER} value={data.analogs.values ? data.analogs.get(44) : '0'} measure="%"/>
    <TableItem name={Lang.OUTLET_INVERTER} value={data.analogs.values ? data.analogs.get(45) : '0'} measure="%"/>
    <TableHeader header={Lang.SETPOINTS} />
         <TableItemState name={Lang.ROOM}
         write={true} 
         value={data.analogs.values ? data.analogs.get(16) : Lang.ZERO}
         index="16"
         limit="50"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

         <TableItemState name={Lang.INLET_INVERTER_SETPOINT}
         write={true} 
         value={data.analogs.values ? data.analogs.get(33) : Lang.ZERO}
         index="33"
         limit="100"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

         <TableItemState name={Lang.OUTLET_INVERTER_SETPOINT}
         write={true} 
         value={data.analogs.values ? data.analogs.get(34) : Lang.ZERO}
         index="34"
         limit="100"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

        <TableHeader header={Lang.ALARMS} />
        <TableItemSignal name={Lang.AL_MAIN} type="ALARM" value={data.digitals.values ? data.digitals.get(30) : '0'}/>
        <TableItemSignal name={Lang.AL_FIRE} type="ALARM" value={data.digitals.values ? data.digitals.get(22) : '0'}/>
        <TableItemSignal name={Lang.AL_FROST} type="ALARM" value={data.digitals.values ? data.digitals.get(23) : '0'}/>
        <TableItemSignal name={Lang.AL_PHASE_CONTROL} type="ALARM" value={data.digitals.values ? data.digitals.get(25) : '0'}/> 
        <TableItemSignal name={Lang.AL_HEATER_PUMP} type="ALARM" value={data.digitals.values ? data.digitals.get(53) : '0'}/> 
        <TableItemSignal name={Lang.AL_COOLER_PUMP} type="ALARM" value={data.digitals.values ? data.digitals.get(57) : '0'}/> 
        <TableItemSignal name={Lang.AL_HEATER} type="ALARM" value={data.digitals.values ? data.digitals.get(77) : '0'}/>  
        <TableItemSignal name={Lang.AL_THERMOSTAT} type="ALARM" value={data.digitals.values ? data.digitals.get(76) : '0'}/> 
        <TableItemSignal name={Lang.AL_ROTOR} type="ALARM" value={data.digitals.values ? data.digitals.get(89) : '0'}/> 
        <TableItemSignal name={Lang.AL_FREONE} type="ALARM" value={data.digitals.values ? data.digitals.get(86) : '0'}/>  
        <TableItemSignal name={Lang.HUMIDIFIER_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(93) : '0'}/>    
        <TableItemSignal name={Lang.AL_INLET_INVERTER} type="ALARM" value={data.digitals.values ? data.digitals.get(9) : '0'}/>    
        <TableItemSignal name={Lang.AL_OUTLET_INVERTER} type="ALARM" value={data.digitals.values ? data.digitals.get(10) : '0'}/>  
        <TableItemSignal name={Lang.AL_INLET_PRES_1} type="ALARM" value={data.digitals.values ? data.digitals.get(4) : '0'}/>    
        <TableItemSignal name={Lang.AL_INLET_PRES_2} type="ALARM" value={data.digitals.values ? data.digitals.get(5) : '0'}/>    
        <TableItemSignal name={Lang.AL_INLET_PRES_3} type="ALARM" value={data.digitals.values ? data.digitals.get(6) : '0'}/>    
        <TableItemSignal name={Lang.AL_OUTLET_PRES_1} type="ALARM" value={data.digitals.values ? data.digitals.get(7) : '0'}/>    
        <TableItemSignal name={Lang.AL_OUTLET_PRES_2} type="ALARM" value={data.digitals.values ? data.digitals.get(8) : '0'}/>    
    </Table>
</Card>
)    
}
}

Centrala.propTypes = {
lang: React.PropTypes.string.isRequired     
}
Centrala.defaultProps = {
lang:"pl"    
}

function mapStateToProps(state){
return {data:state}    
}

function mapDispatchToProps(dispatch){
return {dispatch: dispatch}    
}
export default connect(mapStateToProps,mapDispatchToProps)(Centrala)