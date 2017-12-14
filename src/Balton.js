import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Header, Card, StatusItem, HoverButton, TableItemSubmit, TableItem, Table, TableItemState, TableItemStateSignal, TableItemStateVar, TableItemSignal, TableHeader, SchedulerItem} from './components'
import * as Lang from './localization/lang-pl' 
import {pushAnalog, pushInteger, pushDigital} from "./pco"
import * as Action from "./actions"
import {Panel, Form} from 'react-bootstrap'
import * as Const from './constants'

const ANALOG = "ANALOG"
const DIGITAL = "DIGITAL"
const INTEGER = "INTEGER"

class Balton extends Component {   
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
    <Header name={'Balton Strefa I'} alarm={data.digitals.values ? data.digitals.get(15) : '0'}  cool={data.digitals.values ? data.digitals.get(3) : '0'} heat={data.digitals.values ? data.digitals.get(5) : '0'}/>
    <Table header={false}>
        <TableItemStateVar name={Lang.ONOFF_STATE} 
         names={[Lang.OFF_LONG,Lang.ON_LONG]}
         options={["0.0","0.1"]}
         write={true}
         index="1"
         main={data.analogs.values ? data.analogs.get(3) : '0'}
         mod={(value) => value*10}
         onSubmit={this.updateValue}
         value={data.analogs.values ? data.analogs.get(1) : '0'}/>
         
        <TableItemSubmit name={Lang.ALARM_RESET} 
        index="17"
        button={Lang.RESET}
        type={DIGITAL}
        onSubmit={this.updateValue}
        value="1"/>
    <TableHeader header={Lang.READOUTS} />
    <TableItemSignal 
        name={Lang.ALLOW_WORK} 
        value={data.digitals.values ? data.digitals.get(1) : Lang.ZERO} />
    <TableItem name={Lang.ROOM} value={data.analogs.values ? data.analogs.get(5) : '0'} measure="C" />
    <TableItem name={Lang.PRESSURE} value={data.analogs.values ? data.analogs.get(21) : '0'} measure="Pa"/>
    <TableHeader header={Lang.SETPOINTS} />
         <TableItemState name={Lang.ROOM}
         write={true} 
         value={data.analogs.values ? data.analogs.get(7) : Lang.ZERO}
         index="7"
         limit="50"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

    <TableHeader header={Lang.ALARMS} />
        <TableItemSignal name={Lang.VRF_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(9) : '0'}/>
        <TableItemSignal name={Lang.HUMIDIFIER_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(11) : '0'}/>    
    </Table>


    <Header name={'Balton Strefa II'} alarm={data.digitals.values ? data.digitals.get(16) : '0'}  cool={data.digitals.values ? data.digitals.get(4) : '0'} heat={data.digitals.values ? data.digitals.get(6) : '0'}/>
    <Table header={false}>
        <TableItemStateVar name={Lang.ONOFF_STATE} 
         names={[Lang.OFF_LONG,Lang.ON_LONG]}
         options={["0.0","0.1"]}
         write={true}
         index="2"
         main={data.analogs.values ? data.analogs.get(4) : '0'}
         mod={(value) => value*10}
         onSubmit={this.updateValue}
         value={data.analogs.values ? data.analogs.get(2) : '0'}/>
         
        <TableItemSubmit name={Lang.ALARM_RESET} 
        index="18"
        button={Lang.RESET}
        type={DIGITAL}
        onSubmit={this.updateValue}
        value="1"/>
    <TableHeader header={Lang.READOUTS} />
    <TableItemSignal 
        name={Lang.ALLOW_WORK} 
        value={data.digitals.values ? data.digitals.get(2) : Lang.ZERO} />
    <TableItem name={Lang.ROOM} value={data.analogs.values ? data.analogs.get(6) : '0'} measure="C" />
    <TableItem name={Lang.PRESSURE} value={data.analogs.values ? data.analogs.get(22) : '0'} measure="Pa"/>
    <TableItem name={Lang.HUMIDITY} value={data.analogs.values ? data.analogs.get(14) : '0'} measure=""/>
    <TableItem name={Lang.HUMIDITY_SETPOINT} value={data.analogs.values ? data.analogs.get(18) : '0'} measure="%"/>
    <TableHeader header={Lang.SETPOINTS} />
         <TableItemState name={Lang.ROOM}
         write={true} 
         value={data.analogs.values ? data.analogs.get(8) : Lang.ZERO}
         index="8"
         limit="50"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

         <TableItemState name={Lang.HUMIDITY}
         write={true} 
         value={data.analogs.values ? data.analogs.get(16) : Lang.ZERO}
         index="16"
         limit="100"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

         <TableItemStateSignal 
         led={true} 
         name={Lang.COOL_SETPOINT} 
         value={data.analogs.values ? data.analogs.get(10) : '0'} 
         enabled={data.digitals.values ? data.digitals.get(4) : '0'} 
         measure="%"/>
         <TableItemStateSignal 
         led={true} 
         name={Lang.HEAT_SETPOINT} 
         value={data.analogs.values ? data.analogs.get(12) : '0'} 
         enabled={data.digitals.values ? data.digitals.get(6) : '0'} 
         measure="%"/>
    <TableHeader header={Lang.ALARMS} />     
        <TableItemSignal name={Lang.VRF_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(10) : '0'}/>
        <TableItemSignal name={Lang.HUMIDIFIER_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(12) : '0'}/>    
    </Table>


    <Header name={'Balton Strefa III'} alarm={data.digitals.values ? data.digitals.get(29) : '0'}  cool={data.digitals.values ? data.digitals.get(31) : '0'} heat={data.digitals.values ? data.digitals.get(32) : '0'}/>
    <Table header={false}>
        <TableItemStateVar name={Lang.ONOFF_STATE} 
         names={[Lang.OFF_LONG,Lang.ON_LONG]}
         options={["0.0","0.1"]}
         write={true}
         index="55"
         main={data.analogs.values ? data.analogs.get(57) : '0'}
         mod={(value) => value*10}
         onSubmit={this.updateValue}
         value={data.analogs.values ? data.analogs.get(2) : '0'}/>
         
        <TableItemSubmit name={Lang.ALARM_RESET} 
        index="18"
        button={Lang.RESET}
        type={DIGITAL}
        onSubmit={this.updateValue}
        value="1"/>
    <TableHeader header={Lang.READOUTS} />
    <TableItemSignal 
        name={Lang.ALLOW_WORK} 
        value={data.digitals.values ? data.digitals.get(23) : Lang.ZERO} />
    <TableItem name={Lang.ROOM} value={data.analogs.values ? data.analogs.get(70) : '0'} measure="C" />
    <TableItem name={Lang.PRESSURE} value={data.analogs.values ? data.analogs.get(78) : '0'} measure="Pa"/>
    <TableItem name={Lang.HUMIDITY_SETPOINT} value={data.analogs.values ? data.analogs.get(76) : '0'} measure="%"/>
    <TableHeader header={Lang.SETPOINTS} />
         <TableItemState name={Lang.ROOM}
         write={true} 
         value={data.analogs.values ? data.analogs.get(71) : Lang.ZERO}
         index="71"
         limit="50"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

         <TableItemState name={Lang.HUMIDITY}
         write={true} 
         value={data.analogs.values ? data.analogs.get(74) : Lang.ZERO}
         index="74"
         limit="100"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

         <TableItemStateSignal 
         led={true} 
         name={Lang.COOL_SETPOINT} 
         value={data.analogs.values ? data.analogs.get(72) : '0'} 
         enabled={data.digitals.values ? data.digitals.get(31) : '0'} 
         measure="%"/>
         <TableItemStateSignal 
         led={true} 
         name={Lang.HEAT_SETPOINT} 
         value={data.analogs.values ? data.analogs.get(73) : '0'} 
         enabled={data.digitals.values ? data.digitals.get(32) : '0'} 
         measure="%"/>
    <TableHeader header={Lang.ALARMS} />     
        <TableItemSignal name={Lang.VRF_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(27) : '0'}/>
        <TableItemSignal name={Lang.HUMIDIFIER_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(28) : '0'}/>    
    </Table>

</Card>
)    
}
}

Balton.propTypes = {
lang: React.PropTypes.string.isRequired     
}
Balton.defaultProps = {
lang:"pl"    
}

function mapStateToProps(state){
return {data:state}    
}

function mapDispatchToProps(dispatch){
return {dispatch: dispatch}    
}
export default connect(mapStateToProps,mapDispatchToProps)(Balton)