import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Header, Card, StatusItem, HoverButton, TableItemSubmit, TableItem, Table, TableItemState, TableItemStateVar, TableItemSignal, TableHeader, SchedulerItem} from './components'
import * as Lang from './localization/lang-pl' 
import {pushAnalog, pushInteger, pushDigital} from "./pco"
import * as Action from "./actions"
import {Panel, Form} from 'react-bootstrap'
import * as Const from './constants'

const ANALOG = "ANALOG"
const DIGITAL = "DIGITAL"
const INTEGER = "INTEGER"

class Container extends Component {   
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
    <Header name={Lang.HEAT_PUMP} alarm={data.digitals.values ? data.digitals.get(95) : '0'}  cool={data.digitals.values ? data.digitals.get(84) : '0'} heat={data.digitals.values ? data.digitals.get(88) : '0'}/>
    <Table>
        <TableItemStateVar name={Lang.ONOFF} 
         names={[Lang.OFF,Lang.ON]}
         options={["0.0","0.1"]}
         write={true}
         index="181"
         main={data.analogs.values ? data.analogs.get(106) : '0'}
         mod={(value) => value*10}
         onSubmit={this.updateValue}
         value={data.analogs.values ? data.analogs.get(181) : '0'}/>
        <TableItemSubmit name={Lang.ALARM_RESET} 
        index="77"
        button={Lang.RESET}
        type={DIGITAL}
        onSubmit={this.updateValue}
        value="1"/>
    <TableItemSignal name={Lang.ALLOW_WORK} value={data.digitals.values ? data.digitals.get(17) : '0'}/>
    <StatusItem value={data.analogs.values ? data.analogs.get(106) : '0'} />
    <TableHeader header={Lang.SETPOINTS} />
        <TableItemState name={Lang.HAND_OR_SCHED} 
        names={[Lang.HAND,Lang.CLOCK]} 
        options={["0","1"]} 
        value={data.digitals.values ? data.digitals.get(32) : Lang.NONE} />

         <TableItemState name={Lang.SETPOINT}
         write={true} 
         value={data.analogs.values ? data.analogs.get(2) : Lang.ZERO}
         index="2"
         limit="50"
         mod={(value) => +value*10 }
         onSubmit={this.updateValue} />

        <TableItem name={Lang.ROOM} value={data.analogs.values ? data.analogs.get(136) : '0'} measure="C" />
        <TableItem name={Lang.INLET} value={data.analogs.values ? data.analogs.get(121) : '0'} measure="C"/>
        <TableItem name={Lang.WATER_INLET} value={data.analogs.values ? data.analogs.get(151) : '0'} measure="C"/>
        <TableItem name={Lang.WATER_OUTLET} value={data.analogs.values ? data.analogs.get(166) : '0'} measure="C"/>
        <tr>
            <td>{Lang.SLAVES}</td>
            <td>
            <Form inline>
            {
            Const.SLAVES.map((i,idx) => (<HoverButton name={`Slave ${idx+1}`} values={{
            [Lang.ALARM]: data.digitals.values ? (data.digitals.get(Const.ALARMS[idx]) > 0 ? <span>{Const.BELL_ICON}{this.getAlarmDescription(idx)}</span> : 'OK') : Lang.NONE,     
            [Lang.MODE]: data.digitals.values ? (data.digitals.get(Const.HEAT[idx]) > 1 ? Const.HEAT_ICON : data.digitals.get(Const.HEAT[idx]) > 1 ? Const.COOL_ICON : <span>{`${Lang.WORKING_IN}${Lang.DEADZONE}`}</span>) : Lang.NONE , 
            [Lang.WORK]: data.digitals.values ? (data.digitals.get(Const.WORKING[idx]) > 0 ? Const.FAN_ICON_ON : Const.FAN_ICON_OFF ) : Lang.NONE, 
            [Lang.ROOM]: data.analogs.values ? data.analogs.get(Const.ROOM[idx]) : "0.0", 
            [Lang.INLET]: data.analogs.values ? data.analogs.get(Const.INLET[idx]) : "0.0" ,
            [Lang.WATER_INLET]: data.analogs.values ? data.analogs.get(Const.W_INLET[idx]) : "0.0" ,
            [Lang.WATER_OUTLET]: data.analogs.values ? data.analogs.get(Const.W_OUTLET[idx]) : "0.0" 
             }} />) )
             .filter((btn,idx) => data.digitals.values ? data.digitals.get(Const.SLAVES[idx]) > 0 : false )           
            }
            </Form>   
            </td>
        </tr>
        <TableItemSignal name={Lang.COMP_STATE} value={data.digitals.values ? data.digitals.get(83) : '0'}/>
        <TableItemSignal name={Lang.VENT_STATE} value={data.digitals.values ? data.digitals.get(85) : '0'}/>
        <TableItemSignal name={Lang.PUMP_STATE} value={data.digitals.values ? data.digitals.get(86) : '0'}/>
        
        <TableItemSignal name={Lang.CLOCK_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(94) : '0'}/>
        <TableItemSignal name={Lang.COMP_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(93) : '0'}/>
        <TableItemSignal name={Lang.FIRE_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(82) : '0'}/>
        <TableItemSignal name={Lang.BOARD_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(80) : '0'}/>
        <TableItemSignal name={Lang.W_INLET_COOL_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(89) : '0'}/>
        <TableItemSignal name={Lang.W_INLET_HEAT_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(91) : '0'}/>
        <TableItemSignal name={Lang.W_OUTLET_COOL_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(90) : '0'}/>
        <TableItemSignal name={Lang.W_OUTLET_HEAT_OK} type="ALARM" value={data.digitals.values ? data.digitals.get(92) : '0'}/>
    <TableHeader header={Lang.SCHEDULE} onClick={(e) => {/*this.setState({open: !open})*/}}/>    
        <SchedulerItem name={Lang.MONDAY} key= {Lang.MONDAY} 
                       hourStart= {data.analogs.values ? data.analogs.get(78) : '0'}
                       minuteStart= {data.analogs.values ? data.analogs.get(92) : '0'}
                       hourStop= {data.analogs.values ? data.analogs.get(85) : '0'}
                       minuteStop= {data.analogs.values ? data.analogs.get(99) : '0'}
                       index={{hour:{start:78,stop:85},minute:{start:92,stop:99}}}
                       mod={(value) => isNaN(value) ? value : +value / 10 }
                       unmod={(value) => isNaN(value) ? value : +value*10 }
                       onChange = {this.handleScheduleChange} 
                       onSubmit={this.updateValue}
                       style={{display: open ? "table-row" : "none", transition:"display 0.5s ease-out" }}
                       />
        <SchedulerItem name={Lang.TUESDAY} key= {Lang.TUESDAY} 
                       hourStart= {data.analogs.values ? data.analogs.get(79) : '0'}
                       minuteStart= {data.analogs.values ? data.analogs.get(93) : '0'}
                       hourStop= {data.analogs.values ? data.analogs.get(86) : '0'}
                       minuteStop= {data.analogs.values ? data.analogs.get(100) : '0'}
                       index={{hour:{start:79,stop:86},minute:{start:93,stop:100}}}
                       mod={(value) => isNaN(value) ? value : +value / 10 }
                       unmod={(value) => isNaN(value) ? value : +value*10 }
                       onChange = {this.handleScheduleChange} 
                       onSubmit={this.updateValue}
                       style={{display: open ? "table-row" : "none", transition:"display 0.5s ease-out" }}
                       />
        <SchedulerItem name={Lang.WETNESDAY} key= {Lang.WETNESDAY} 
                       hourStart= {data.analogs.values ? data.analogs.get(80) : '0'}
                       minuteStart= {data.analogs.values ? data.analogs.get(94) : '0'}
                       hourStop= {data.analogs.values ? data.analogs.get(87) : '0'}
                       minuteStop= {data.analogs.values ? data.analogs.get(101) : '0'}
                       index={{hour:{start:80,stop:87},minute:{start:94,stop:101}}}
                       mod={(value) => isNaN(value) ? value : +value / 10 }
                       unmod={(value) => isNaN(value) ? value : +value*10 }
                       onChange = {this.handleScheduleChange} 
                       onSubmit={this.updateValue}
                       style={{display: open ? "table-row" : "none", transition:"display 0.5s ease-out" }}
                       />
        <SchedulerItem name={Lang.THURSDAY} key= {Lang.THURSDAY} 
                       hourStart= {data.analogs.values ? data.analogs.get(81) : '0'}
                       minuteStart= {data.analogs.values ? data.analogs.get(95) : '0'}
                       hourStop= {data.analogs.values ? data.analogs.get(88) : '0'}
                       minuteStop= {data.analogs.values ? data.analogs.get(102) : '0'}
                       index={{hour:{start:81,stop:88},minute:{start:95,stop:102}}}
                       mod={(value) => isNaN(value) ? value : +value / 10 }
                       unmod={(value) => isNaN(value) ? value : +value*10 }
                       onChange = {this.handleScheduleChange} 
                       onSubmit={this.updateValue}
                       style={{display: open ? "table-row" : "none", transition:"display 0.5s ease-out" }}
                       />
        <SchedulerItem name={Lang.FRIDAY} key= {Lang.FRIDAY} 
                       hourStart= {data.analogs.values ? data.analogs.get(82) : '0'}
                       minuteStart= {data.analogs.values ? data.analogs.get(96) : '0'}
                       hourStop= {data.analogs.values ? data.analogs.get(89) : '0'}
                       minuteStop= {data.analogs.values ? data.analogs.get(103) : '0'}
                       index={{hour:{start:82,stop:89},minute:{start:96,stop:103}}}
                       mod={(value) => isNaN(value) ? value : +value / 10 }
                       unmod={(value) => isNaN(value) ? value : +value*10 }
                       onChange = {this.handleScheduleChange} 
                       onSubmit={this.updateValue}
                       style={{display: open ? "table-row" : "none", transition:"display 0.5s ease-out" }}
                       />
        <SchedulerItem name={Lang.SATURDAY} key= {Lang.SATURDAY} 
                       hourStart= {data.analogs.values ? data.analogs.get(83) : '0'}
                       minuteStart= {data.analogs.values ? data.analogs.get(97) : '0'}
                       hourStop= {data.analogs.values ? data.analogs.get(90) : '0'}
                       minuteStop= {data.analogs.values ? data.analogs.get(104) : '0'}
                       index={{hour:{start:83,stop:90},minute:{start:97,stop:104}}}
                       mod={(value) => isNaN(value) ? value : +value / 10 }
                       unmod={(value) => isNaN(value) ? value : +value*10 }
                       onChange = {this.handleScheduleChange} 
                       onSubmit={this.updateValue}
                       style={{display: open ? "table-row" : "none", transition:"display 0.5s ease-out" }}
                       />
        <SchedulerItem name={Lang.SUNDAY} key= {Lang.SUNDAY} 
                       hourStart= {data.analogs.values ? data.analogs.get(84) : '0'}
                       minuteStart= {data.analogs.values ? data.analogs.get(98) : '0'}
                       hourStop= {data.analogs.values ? data.analogs.get(91) : '0'}
                       minuteStop= {data.analogs.values ? data.analogs.get(105) : '0'}
                       index={{hour:{start:84,stop:91},minute:{start:98,stop:105}}}
                       mod={(value) => isNaN(value) ? value : +value / 10 }
                       unmod={(value) => isNaN(value) ? value : +value*10 }
                       onChange = {this.handleScheduleChange} 
                       onSubmit={this.updateValue}
                       style={{display: open ? "table-row" : "none", transition:"display 0.5s ease-out" }}
                       />                                                                                                                                                                                                                            
    <TableHeader header={Lang.SERVICE} />
        <TableItem name={Lang.HISTERESIS} value={data.analogs.values ? data.analogs.get(229) : '0'} measure="C" />
        <TableItem name={Lang.MAX_T_INLET_COOL} value={data.analogs.values ? data.analogs.get(18) : '0'} measure="C" />
        <TableItem name={Lang.MAX_T_OUTLET_COOL} value={data.analogs.values ? data.analogs.get(48) : '0'} measure="C" />
        <TableItem name={Lang.MIN_T_INLET_HEAT} value={data.analogs.values ? data.analogs.get(33) : '0'} measure="C" />
        <TableItem name={Lang.MIN_T_OUTLET_HEAT} value={data.analogs.values ? data.analogs.get(63) : '0'} measure="C" />
    </Table>
</Card>
)    
}
}

Container.propTypes = {
lang: React.PropTypes.string.isRequired     
}
Container.defaultProps = {
lang:"pl"    
}

function mapStateToProps(state){
return {data:state}    
}

function mapDispatchToProps(dispatch){
return {dispatch: dispatch}    
}
export default connect(mapStateToProps,mapDispatchToProps)(Container)