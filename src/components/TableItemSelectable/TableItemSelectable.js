import React, {PropTypes} from 'react'
import css from './styles.css'
import styleable from 'react-styleable'
import {FormControl} from 'react-bootstrap'

function TableItemSelectable ({ options, names, value, index, name, onChange }) {

    function handleSelect(e) {
    e.preventDefault()    
    onChange(type, index, e.target.value)    
    }
    return (<tr>
    <td>{name}</td>
    <td> <FormControl value={value} componentClass="select" placeholder="" onChange={handleSelect}>
       {options.map((option, idx) => {
       return (<option value={option}>{names[idx]}</option>)     
       })}
      </FormControl>
    </td>
</tr>)
}

TableItemSelectable.propTypes = {
onChange: PropTypes.func.isRequired,    
names: PropTypes.arrayOf(PropTypes.string).isRequired,
options: PropTypes.arrayOf(PropTypes.string).isRequired,
name: PropTypes.string.isRequired,
value: PropTypes.string.isRequired,
index: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
type: PropTypes.string.isRequired    
}

TableItemSelectable.defaultProps = {
type: "ANALOG"    
}
export default styleable(css)(TableItemSelectable)