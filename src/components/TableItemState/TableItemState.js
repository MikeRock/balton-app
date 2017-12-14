import React, {Component, PropTypes} from 'react'
import css from './styles.css'
import styleable from 'react-styleable'
import {Button, Form, FormGroup, FormControl} from 'react-bootstrap'
import * as Lang from './../../localization/lang-pl'

class TableItemState extends Component {
     constructor(props) {
     super(props)
     this.editRef
     this.handleClick = this.handleClick.bind(this)
     this.getValidationState = this.getValidationState.bind(this)
     this.handleChange = this.handleChange.bind(this)
     this.handleClickChange = this.handleClickChange.bind(this)
     this.state = {edit:false, value:this.props.value}    
     }

    handleClick(e) {
    e.preventDefault() 
    this.setState({edit: !this.state.edit}) 
    }

    handleChange(e) {
    let {type, index, onSubmit, mod} = this.props  
    let  {value} = this.state  
    e.preventDefault()
    if(this.getValidationState() === "error" ) return false
    onSubmit(type,index,mod(value))    
    }
    handleClickChange(e) {
    let {type, index, onSubmit, mod, options} = this.props  
    e.preventDefault()
    if(this.getValidationState() === "error" ) return false
    onSubmit(type,index,mod(options[0]))        
    }
    getValidationState() {
    let {value} = this.state
    let {limit} = this.props
    return /\d+(\.\d+)?/.test( value ) && !isNaN(value) && ( Number(value) < Number(limit)) ? 'success' : 'error' 
    }
    render() {
    let {write, name, names, options, value, unmod} = this.props   
    let selected = names.filter((item,index) => options[index] == unmod(value))[0]
    return (
    <tr>
    <td>{name}</td>
    <td> 
    <Form inline> 
    <Button style={{marginRight:"10px"}} disabled={!write} bsStyle={!this.state.edit ? "default" : "primary"} onClick={this.handleClick}>{selected ? selected : unmod(value)}</Button>
    {this.state.edit ? 
    <span>
    {options.length ? ( options.length == 1 ? <span><Button style={{marginLeft:"10px"}} onClick={this.handleClickChange}>{names[0]}</Button></span> : 
    <span>  
     <FormGroup controlId="formBasicSelect" 
           validationState={this.getValidationState()}>          
    <FormControl componentClass="select"
               defaultValue ={this.state.value} 
               value= {this.state.value}  
               inputRef={(ref) => {this.editRef=ref}}
               onChange={(e) =>{ e.preventDefault(); this.setState({value: e.target.value}) }}>
      {options.map((option, index) => <option value={option}>{names[index]}</option>)}
               </FormControl>           
       {' '}
    </FormGroup>
    <Button style={{marginLeft:"10px"}} onClick={this.handleChange}>{Lang.SET}</Button>
    </span>) : 
 <span>  
     <FormGroup controlId="formBasicText" 
           validationState={this.getValidationState()}>          
    <FormControl type="text"
               defaultValue ={this.state.value} 
               value= {this.state.value}  
               inputRef={(ref) => {this.editRef=ref}}
               placeholder={Lang.PLACEHOLDER_HOUR}
               onChange={(e) =>{ e.preventDefault(); this.setState({value:e.target.value}) }}>
      </FormControl>
      <FormControl.Feedback />
       {' '}
    </FormGroup>
    <Button style={{marginLeft:"10px"}} disabled={this.getValidationState() === "error"} onClick={this.handleChange}>{Lang.SET}</Button>
    </span>} 
    </span>: ""}
    </Form>
    </td>
    </tr>    
    )}

}

TableItemState.propTypes = {   
names: PropTypes.arrayOf(PropTypes.string).isRequired,
options: PropTypes.arrayOf(PropTypes.string).isRequired,
name: PropTypes.string.isRequired,
value: PropTypes.string.isRequired,
write: PropTypes.bool,
onSubmit: PropTypes.func,
index: PropTypes.string,
type: PropTypes.string, 
limit: PropTypes.string,
mod: PropTypes.func,
unmod: PropTypes.func
}

TableItemState.defaultProps = {
write: false,
onSubmit: ()=>false,
index: "0",
type: "ANALOG",
names:[],
options:[],
limit:"1000", 
mod:  (val) => val,
unmod:  (val) => val
}
export default styleable(css)(TableItemState)